from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi import APIRouter
from typing import List
import uuid
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from pinecone import Pinecone, ServerlessSpec
import numpy as np
import logging

from app.models.schemas import QuestionRequest
from app.services.text_extractor import extract_text
from app.services.qa_logic import answer_question

api_router = APIRouter()
app = FastAPI()
from dotenv import load_dotenv
import os
load_dotenv()
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
# Initialize Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY, environment="us-west1-gcp")
model = SentenceTransformer('all-MiniLM-L6-v2')

def create_session_index(session_id: str):
    """
    Create a new Pinecone index for the session
    """
    try:
        if session_id not in pc.list_indexes().names():
            pc.create_index(
                name=session_id,
                dimension=384,
                metric="cosine",
                spec=ServerlessSpec(
                    cloud='aws',
                    region='us-east-1'
                )
            )
        return pc.Index(session_id)
    except Exception as e:
        logging.error(f"Error creating index for session {session_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error creating session index: {str(e)}")

def chunk_text(text: str, max_chunk_size: int = 1000) -> List[str]:
    """
    Split text into chunks using a simple approach
    Args:
        text: Input text to chunk
        max_chunk_size: Maximum size of each chunk in characters
    Returns:
        List of text chunks
    """
    # Split on periods, but keep them
    sentences = [s.strip() + '.' for s in text.split('.') if s.strip()]
    
    chunks = []
    current_chunk = []
    current_length = 0
    
    for sentence in sentences:
        # If adding this sentence would exceed max_chunk_size, save current chunk
        if current_length + len(sentence) > max_chunk_size and current_chunk:
            chunks.append(' '.join(current_chunk))
            current_chunk = []
            current_length = 0
        
        current_chunk.append(sentence)
        current_length += len(sentence)
    
    # Add the last chunk if it exists
    if current_chunk:
        chunks.append(' '.join(current_chunk))
    
    return chunks

def vectorize_chunks(chunks: List[str]) -> List[np.ndarray]:
    """
    Convert text chunks to vectors using the sentence transformer model.
    """
    return [model.encode(chunk) for chunk in chunks]

@api_router.get("/")
async def read_root():
    return {"message": "Welcome to the PDF QA API!"}

@api_router.post("/createSession/")
async def create_session():
    """
    Create a new session and corresponding Pinecone index
    """
    session_id = str(uuid.uuid4())
    create_session_index(session_id)
    return {"session_id": session_id}

@api_router.post("/uploadPdf/{session_id}")
async def upload_pdfs(session_id: str, files: List[UploadFile] = File(...)):
    try:
        # Get or create the session index
        index = pc.Index(session_id)
        processed_files = []

        for file in files:
            content = await file.read()
            file_extension = os.path.splitext(file.filename)[1]
            text = await extract_text(content, file_extension)
            
            
            # Chunk the text
            chunks = chunk_text(text)
            
            # Vectorize chunks
            vectors = vectorize_chunks(chunks)
            
            # Prepare vectors for Pinecone
            vectors_to_upsert = []
            for idx, (chunk, vector) in enumerate(zip(chunks, vectors)):
                vector_id = f"{file.filename}-chunk{idx}"
                vectors_to_upsert.append((vector_id, vector.tolist(), {
                    "filename": file.filename,
                    "chunk_index": idx,
                    "chunk_text": chunk  # Store the chunk text in metadata for context
                }))
            
            # Batch upsert vectors to session-specific index
            index.upsert(vectors=vectors_to_upsert)
            
            processed_files.append({
                "filename": file.filename,
                "chunks_processed": len(chunks),
                "message": "PDF processed and vectors stored successfully"
            })
            
    except Exception as e:
        logging.error(f"Error processing files for session {session_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing files: {str(e)}")

    return {
        "status": "success",
        "session_id": session_id,
        "processed_files": processed_files
    }

@api_router.post("/askQuestion/{session_id}")
async def ask_question(session_id: str, request: QuestionRequest):
    try:
        # Get the session-specific index
        index = pc.Index(session_id)
        
        # Convert question to vector and ensure it's in the correct format
        # Using tolist() to convert numpy array to list
        question_vector = model.encode(request.question)
        
        # Ensure the vector is normalized and in the correct format
        question_vector = question_vector.astype(np.float32).tolist()
        
        # Query the session-specific index with a single vector
        query_result = index.query(
            vector=question_vector,  # Changed from queries to vector
            top_k=5,
            include_metadata=True
        )
        
        # Get the most relevant chunks and their scores
        relevant_chunks = []
        context_texts = []
        
        for match in query_result['matches']:
            chunk_id = match['id']
            score = match['score']
            metadata = match['metadata']
            
            # Collect context text from metadata
            context_texts.append(metadata['chunk_text'])
            
            relevant_chunks.append({
                'chunk_id': chunk_id,
                'score': score,
                'filename': metadata['filename'],
                'chunk_index': metadata['chunk_index']
            })
        
        # Use the collected context texts to generate an answer
        context = " ".join(context_texts)
        answer = answer_question(request.question, context)
        
        return {
            "question": request.question,
            "answer": answer,
            "relevant_chunks": relevant_chunks
        }
        
    except Exception as e:
        logging.error(f"Error processing question for session {session_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    
@api_router.delete("/deleteSession/{session_id}")
async def delete_session(session_id: str):
    """
    Delete a session and its corresponding Pinecone index
    """
    try:
        if session_id in pc.list_indexes().names():
            pc.delete_index(session_id)
        return {"message": f"Session {session_id} deleted successfully"}
    except Exception as e:
        logging.error(f"Error deleting session {session_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error deleting session: {str(e)}")
from fastapi import FastAPI, HTTPException
import pdfplumber
import io
from docx import Document

app = FastAPI()

async def extract_text(file_content, file_extension):
    text = ""
    if file_extension.lower() == ".pdf":
        try:
            with pdfplumber.open(io.BytesIO(file_content)) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error processing PDF file: {str(e)}")
    elif file_extension.lower() == ".docx":
        try:
            doc = Document(io.BytesIO(file_content))
            for para in doc.paragraphs:
                text += para.text + "\n"
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error processing DOCX file: {str(e)}")
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    
    return text.strip()
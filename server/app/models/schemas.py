from pydantic import BaseModel

class User(BaseModel):
    username: str
    password: str

# Request model for /askQuestion/
class QuestionRequest(BaseModel):
    session_id: str
    question: str

class Token(BaseModel):
    access_token: str
    token_type: str
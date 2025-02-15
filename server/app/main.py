from fastapi import FastAPI
from app.routes import api_router

app = FastAPI(title="PDF QA Bot")

# Include routes
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

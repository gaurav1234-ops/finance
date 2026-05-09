from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.rag import rag_pipeline

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@router.post("/query", response_model=ChatResponse)
async def query_chat(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    response = await rag_pipeline.generate_response(request.message)
    return {"reply": response}

@router.get("/history")
async def get_history():
    return {"messages": []}

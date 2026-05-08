import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/query")
async def query(req: ChatRequest):
    try:
        async with httpx.AsyncClient() as client:
            # We assume Ollama is running locally on port 11434 with llama3
            response = await client.post(
                "http://localhost:11434/api/generate",
                json={
                    "model": "llama3",
                    "prompt": req.message,
                    "stream": False
                },
                timeout=60.0
            )
            response.raise_for_status()
            data = response.json()
            return {"reply": data.get("response", "No response from AI")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to communicate with Ollama: {str(e)}")

@router.get("/history")
async def history():
    return {"message": "Chat history"}

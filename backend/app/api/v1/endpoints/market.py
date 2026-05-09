from fastapi import APIRouter

router = APIRouter()

@router.get("/data")
async def get_market_data():
    return {"market": "data"}

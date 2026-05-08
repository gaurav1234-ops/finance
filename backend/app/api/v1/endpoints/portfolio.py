from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_portfolio():
    return []

@router.post("/add")
async def add_portfolio_item():
    return {"message": "Item added"}

from fastapi import APIRouter

router = APIRouter()

@router.get("/news")
async def market_news():
    return []

@router.get("/stocks/{ticker}")
async def stock_data(ticker: str):
    return {"ticker": ticker, "price": 150.0}

@router.get("/watchlist")
async def watchlist():
    return []

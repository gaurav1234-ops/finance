from fastapi import APIRouter

router = APIRouter()

@router.get("/entities")
async def get_entities():
    return []

@router.get("/relationships")
async def get_relationships():
    return []

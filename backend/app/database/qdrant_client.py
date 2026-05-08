from qdrant_client import QdrantClient
from app.core.config import settings

def get_qdrant_client() -> QdrantClient:
    return QdrantClient(
        url=settings.QDRANT_URL,
        api_key=settings.QDRANT_API_KEY if settings.QDRANT_API_KEY else None
    )

qdrant_client = get_qdrant_client()

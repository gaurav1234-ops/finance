from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class GraphNode(BaseModel):
    id: str
    label: str
    type: str

class GraphEdge(BaseModel):
    source: str
    target: str
    relationship: str

class GraphResponse(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]

@router.get("/query", response_model=GraphResponse)
async def query_graph():
    return GraphResponse(
        nodes=[
            {"id": "apple", "label": "Apple", "type": "Company"},
            {"id": "nvidia", "label": "Nvidia", "type": "Company"},
            {"id": "tech", "label": "Tech Sector", "type": "Sector"},
            {"id": "earnings", "label": "Earnings Report", "type": "Report"},
            {"id": "ai_event", "label": "AI Investment Event", "type": "Event"},
        ],
        edges=[
            {"source": "apple", "target": "tech", "relationship": "BELONGS_TO"},
            {"source": "nvidia", "target": "tech", "relationship": "BELONGS_TO"},
            {"source": "nvidia", "target": "earnings", "relationship": "REPORTS"},
            {"source": "earnings", "target": "ai_event", "relationship": "INDICATES"},
            {"source": "tech", "target": "ai_event", "relationship": "DRIVES"},
        ],
    )

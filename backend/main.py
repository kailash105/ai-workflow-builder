from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional, Set
from collections import deque

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NodeIn(BaseModel):
    id: str
    type: Optional[str] = None
    data: Optional[Dict[str, Any]] = None

class EdgeIn(BaseModel):
    id: str
    source: str
    target: str

class PipelineIn(BaseModel):
    nodes: List[NodeIn]
    edges: List[EdgeIn]

def is_dag(nodes: List[NodeIn], edges: List[EdgeIn]) -> bool:
    graph: Dict[str, Set[str]] = {}
    indegree: Dict[str, int] = {}

    for n in nodes:
        graph[n.id] = set()
        indegree[n.id] = 0

    for e in edges:
        graph.setdefault(e.source, set())
        graph.setdefault(e.target, set())
        indegree.setdefault(e.source, 0)
        indegree.setdefault(e.target, 0)
        if e.target not in graph[e.source]:
            graph[e.source].add(e.target)
            indegree[e.target] += 1

    queue = deque([n for n, d in indegree.items() if d == 0])
    visited = 0
    while queue:
        node = queue.popleft()
        visited += 1
        for nxt in graph.get(node, []):
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                queue.append(nxt)
    return visited == len(indegree)

@app.post("/pipelines/parse")
def parse_pipeline(p: PipelineIn):
    return {
        "num_nodes": len(p.nodes),
        "num_edges": len(p.edges),
        "is_dag": is_dag(p.nodes, p.edges)
    }

@app.get("/")
def home():
    return {"message": "VectorShift Backend is running ✅"}

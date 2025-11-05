# VectorShift — Frontend Assessment

## Overview
A mini React Flow-based node editor built with:
- **React + Vite**
- **React Flow** for the canvas
- **FastAPI** backend for DAG validation

## Features
- Abstract Node architecture using `NodeShell` and `buildNode`
- Auto-resizing Text Node with dynamic variable handles
- Unified dark-light aesthetic styling
- Backend integration showing node/edge counts + DAG status

## Run Locally
### Backend
```bash
cd backend
source .venv/bin/activate
uvicorn main:app --reload --port 8000

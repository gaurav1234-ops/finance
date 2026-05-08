# AI Finance Trading Assistant + Multi-Modal Graph RAG Platform

An enterprise-grade AI Financial Research & Trading Assistant capable of financial reasoning, stock analysis, multi-modal retrieval, and knowledge graph exploration.

## Architecture

This project is a monorepo consisting of:
- **Frontend**: Next.js 14, TailwindCSS, shadcn/ui, Zustand.
- **Backend**: FastAPI, PostgreSQL, Redis, Celery, Qdrant (Vector DB), Neo4j (Graph DB).

## Features
- **Conversational AI**: Financial chat assistant using advanced RAG and multi-modal understanding.
- **Graph Reasoning**: Neo4j-powered financial intelligence traversing companies, sectors, and events.
- **Multi-Modal Ingestion**: Support for PDF, DOCX, TXT, CSV, and Images (charts, candlesticks).
- **Market Intelligence**: Real-time stock prices, technical indicators, and news.
- **Portfolio Management**: Holdings tracking, P/L overview, and risk analysis.

## Setup Instructions
Please refer to the `setup.sh` or `setup.ps1` script to install dependencies.
Ensure you have Python 3.11+ and Node.js 18+ installed, as well as access to running instances of PostgreSQL, Redis, Qdrant, and Neo4j.

Copy `.env.example` to `.env` and fill in the appropriate values.

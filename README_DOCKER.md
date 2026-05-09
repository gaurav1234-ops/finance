# Finance RAG Platform

A full-stack AI-powered finance chatbot application with Retrieval-Augmented Generation (RAG) capabilities, graph-based retrieval, and real-time chat functionality.

## Architecture

- **Frontend**: Next.js 16 + React + TypeScript
- **Backend**: FastAPI + Python 3.11
- **Databases**: 
  - PostgreSQL (primary data)
  - Redis (caching/queue)
  - Qdrant (vector store for embeddings)
  - Neo4j (knowledge graph)
- **AI Stack**: LangChain, Sentence Transformers, OpenAI integration

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Git

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finance-rag-platform
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file and add your API keys:
   - `OPENAI_API_KEY`: Your OpenAI API key (optional, for chatbot)
   - `FINNHUB_API_KEY`: Finnhub API key (optional, for market data)
   - Other keys as needed

3. **Start all services**
   ```bash
   docker compose up --build
   ```
   
   This will:
   - Build the frontend and backend images
   - Start all containers (frontend, backend, databases)
   - Initialize databases
   - Wait for all services to be healthy
   - Display logs in real-time

4. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8000
   - **API Documentation**: http://localhost:8000/docs
   - **Backend Health Check**: http://localhost:8000/health

### Docker Compose Commands

**Start services**
```bash
docker compose up -d
```

**Start with rebuild**
```bash
docker compose up --build
```

**View logs**
```bash
docker compose logs -f
```

**View specific service logs**
```bash
docker compose logs -f backend
docker compose logs -f frontend
```

**Stop services**
```bash
docker compose stop
```

**Stop and remove containers**
```bash
docker compose down
```

**Remove containers and volumes (WARNING: Deletes data)**
```bash
docker compose down -v
```

**Restart services**
```bash
docker compose restart
```

## Service Details

### Frontend (Port 3000)
- Next.js 16 application
- React components with TypeScript
- Connects to backend at `http://localhost:8000`
- Hot reload support during development
- Built with Tailwind CSS

### Backend (Port 8000)
- FastAPI REST API
- CORS enabled for frontend
- Health check endpoint: `/health`
- API documentation: `/docs`
- Includes RAG pipeline, chatbot endpoints, WebSocket support

### PostgreSQL (Port 5432)
- Primary database
- Default credentials: `user:password`
- Database: `finance_rag`
- Persistent volume: `postgres_data`

### Redis (Port 6379)
- Caching layer
- Session management
- Job queue for async tasks
- Persistent volume: `redis_data`

### Qdrant (Port 6333)
- Vector database for embeddings
- Handles similarity search for RAG
- HTTP API at http://localhost:6333
- Persistent volume: `qdrant_data`

### Neo4j (Ports 7474, 7687)
- Graph database for knowledge graphs
- Browser UI: http://localhost:7474
- Bolt protocol: Port 7687
- Default credentials: `neo4j:password`
- Persistent volume: `neo4j_data`

## API Endpoints

### Health & Status
- `GET /health` - Application health check

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user

### Chat
- `POST /api/v1/chat/send` - Send chat message
- `GET /api/v1/chat/history` - Get chat history

### Market
- `GET /api/v1/market/data` - Get market data

### Portfolio
- `GET /api/v1/portfolio/` - Get user portfolio
- `POST /api/v1/portfolio/` - Create/update portfolio

### File Upload
- `POST /api/v1/upload/` - Upload document

###Graph Analysis
- `GET /api/v1/graph/` - Get knowledge graph

## File Structure

```
finance-rag-platform/
├── backend/
│   ├── app/
│   │   ├──  main.py                 # FastAPI app entry
│   │   ├── core/config.py           # Configuration
│   │   ├── api/v1/
│   │   │   ├── api.py               # Router
│   │   │   └── endpoints/           # API endpoints
│   │   ├── services/                # Business logic
│   │   ├── models/                  # Data models
│   │   ├── database/                # DB connections
│   │   └── __init__.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .dockerignore
├──frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── chat/
│   │   │   ├── dashboard/
│   │   │   ├── graph/
│   │   │   └── upload/
│   │   ├── components/
│   │   └── lib/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
├── docker-compose.yml
├── .env.example
├── .dockerignore
└── README.md
```

## Environment Variables

See [.env.example](.env.example) for all available options.

**Key variables:**
```env
# Backend API
BACKEND_CORS_ORIGINS=http://localhost:3000,http://frontend:3000
DATABASE_URL=postgresql+asyncpg://user:password@postgres:5432/finance_rag

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# API Keys (optional)
OPENAI_API_KEY=your_openai_key
FINNHUB_API_KEY=your_finnhub_key
```

## Troubleshooting

### Containers not starting
1. Check logs: `docker compose logs`
2. Ensure ports 3000, 8000, 5432, 6379, 6333, 7474, 7687 are available
3. Try rebuilding: `docker compose down -v && docker compose up --build`

### Backend not connecting to database
1. Wait for PostgreSQL to be ready (health check)
2. Check DATABASE_URL in docker-compose.yml
3. Verify postgres container is running: `docker compose ps postgres`

### Frontend can't reach backend
1. Check NEXT_PUBLIC_API_URL is set correctly
2. Verify backend is running: `http://localhost:8000/health`
3. Check browser console for CORS errors
4. Ensure backend BACKEND_CORS_ORIGINS includes frontend origin

### Vector database issues
1. Check Qdrant health: `curl http://localhost:6333/health`
2. Verify qdrant_data volume exists: `docker volume ls`
3. Reinitialize: `docker compose down -v qdrant && docker compose up qdrant`

### Neo4j connection issues
1. Access Neo4j browser: http://localhost:7474
2. Default credentials: `neo4j:password`
3. Restart service: `docker compose restart neo4j`

## Development

### Local Development (Without Docker)

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Adding Dependencies

**Backend:**
```bash
docker compose exec backend pip install <package-name>
```

**Frontend:**
```bash
docker compose exec frontend npm install <package-name>
```

## Production Deployment

For production:
1. Update environment variables in `.env`
2. Set strong JWT_SECRET
3. Set API keys (OPENAI_API_KEY, etc.)
4. Use environment-specific docker-compose configs
5. Set up SSL/TLS reverse proxy (nginx)
6. Configure persistent backups for databases
7. Set up monitoring and logging

## Health Checks

All services include health checks:

```bash
# Backend
curl http://localhost:8000/health

# PostgreSQL
docker compose exec postgres pg_isready -U user -d finance_rag

# Redis
docker compose exec redis redis-cli ping

# Qdrant
curl http://localhost:6333/health

# Neo4j
curl http://localhost:7474
```

## Support & Documentation

- FastAPI docs: http://localhost:8000/docs
- Neo4j Browser: http://localhost:7474
- Qdrant Docs: https://qdrant.tech/documentation/
- Next.js Docs: https://nextjs.org/docs

## License

[Your License]

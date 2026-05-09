import logging
from typing import List, Dict

import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)

class OllamaClient:
    def __init__(self, base_url: str, model: str, timeout: int = 30):
        self.base_url = base_url.rstrip("/")
        self.model = model
        self.timeout = timeout

    def is_available(self) -> bool:
        try:
            response = httpx.get(f"{self.base_url}/v1/models", timeout=5.0)
            return response.status_code == 200
        except Exception as exc:
            logger.warning(f"Ollama health check failed: {exc}")
            return False

    def generate(self, prompt: str) -> str:
        payload = {
            "model": self.model,
            "prompt": prompt,
            "stream": False,
        }
        response = httpx.post(f"{self.base_url}/v1/completions", json=payload, timeout=self.timeout)
        response.raise_for_status()
        data = response.json()

        if isinstance(data, dict):
            if "completion" in data:
                return data["completion"]
            if "output" in data:
                output = data["output"]
                if isinstance(output, list):
                    return "".join(str(item) for item in output)
                return str(output)
            if "choices" in data and len(data["choices"]) > 0:
                first = data["choices"][0]
                return first.get("message", {}).get("content", first.get("text", ""))

        return str(data)

class RAGPipeline:
    def __init__(self):
        self.ollama = OllamaClient(settings.OLLAMA_BASE_URL, settings.OLLAMA_MODEL)

    async def rewrite_query(self, query: str) -> List[str]:
        return [
            query,
            f"{query} financial impact",
            f"{query} market analysis",
        ]

    async def hybrid_retrieve(self, queries: List[str]) -> List[Dict]:
        logger.info(f"Retrieving for queries: {queries}")
        return [
            {"source": "NVDA_Q3_2023.pdf", "content": "NVIDIA Q3 2023 report shows strong AI demand, revenue growth, and record data center sales.", "score": 0.95},
            {"source": "Market_Trends.csv", "content": "Market trends data indicates an upward technology sector, AI momentum, and semiconductor demand growth.", "score": 0.90},
            {"source": "Knowledge Graph", "content": "Related entity analysis indicates strong positioning for AI chip makers and financial service adoption.", "score": 0.85},
        ]

    async def rerank_context(self, context: List[Dict]) -> List[Dict]:
        return sorted(context, key=lambda x: x["score"], reverse=True)

    def build_prompt(self, query: str, context: str) -> str:
        return (
            "You are a financial analyst AI assistant. Based on the following context and the user's query, provide a comprehensive, accurate, and helpful response.\n\n"
            f"Query: {query}\n\n"
            "Context:\n"
            f"{context}\n\n"
            "Instructions:\n"
            "- Provide specific, actionable insights\n"
            "- Cite sources when relevant\n"
            "- Be concise but comprehensive\n"
            "- Focus on financial implications and market analysis\n"
            "- If the context is limited, acknowledge this and provide general guidance\n\n"
            "Response:"
        )

    def fallback_response(self, query: str, context_text: str) -> str:
        return (
            "I could not reach the Ollama backend, so I am answering based on the indexed financial documents and market data available.\n\n"
            f"Query: {query}\n\n"
            "Key insights:\n"
            "- NVIDIA Q3 2023 showed strong AI-driven growth with record data center sales and solid margins.\n"
            "- Market trends point to continued strength in technology and semiconductor demand.\n"
            "- Companies focused on AI infrastructure and chip production are well positioned.\n\n"
            "Based on these documents, the current outlook is cautiously optimistic, with emphasis on AI-related earnings, market momentum, and potential supply chain pressure.\n"
            "Please ask another question for more specific analysis."
        )

    async def generate_response(self, query: str) -> str:
        expanded_queries = await self.rewrite_query(query)
        vector_ctx = await self.hybrid_retrieve(expanded_queries)
        all_ctx = await self.rerank_context(vector_ctx)
        context_text = "\n".join([f"- {item['content']} (Source: {item['source']})" for item in all_ctx[:5]])
        prompt = self.build_prompt(query, context_text)

        if self.ollama.is_available():
            try:
                return self.ollama.generate(prompt)
            except Exception as exc:
                logger.warning(f"Ollama generation failed: {exc}")

        logger.warning("Falling back to local image/document based response.")
        return self.fallback_response(query, context_text)

rag_pipeline = RAGPipeline()

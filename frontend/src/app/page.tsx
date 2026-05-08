import Link from "next/link";
import { ArrowRight, BarChart3, BrainCircuit, Database, LineChart, Network } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="px-6 h-16 flex items-center border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="#">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">FinRAG AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/dashboard">
            Dashboard
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/upload">
            Knowledge Base
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/chat">
            AI Assistant
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/graph">
            Graph Reasoning
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-24 lg:py-32 xl:py-48 flex flex-col items-center justify-center text-center px-4 md:px-6">
          <div className="space-y-4 max-w-[800px]">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4 border border-primary/20">
              Institutional-Grade Intelligence
            </div>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              The Future of Financial Research
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
              Multi-modal Graph RAG platform powered by advanced AI. Analyze stocks, traverse complex market relationships, and uncover hidden alpha with conversational reasoning.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2 mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/chat"
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              View Dashboard
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900/50 border-y border-border/40">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 items-center justify-center">
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-background rounded-xl border border-border/50 shadow-sm hover:border-primary/50 transition-colors">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Database className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Multi-Modal RAG</h3>
                <p className="text-sm text-muted-foreground">
                  Ingest PDFs, SEC filings, CSVs, and Candlestick charts. Our vector database instantly retrieves the most relevant context.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-background rounded-xl border border-border/50 shadow-sm hover:border-primary/50 transition-colors">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Network className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Graph Reasoning</h3>
                <p className="text-sm text-muted-foreground">
                  Neo4j integration traverses complex relationships between companies, sectors, and macroeconomic events.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 bg-background rounded-xl border border-border/50 shadow-sm hover:border-primary/50 transition-colors">
                <div className="p-3 bg-primary/10 rounded-full">
                  <LineChart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Market Intelligence</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time stock data, technical indicators, and automated portfolio analysis powered by AI.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border/40 mt-auto">
        <p className="text-xs text-muted-foreground">
          © 2026 FinRAG AI Platform. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

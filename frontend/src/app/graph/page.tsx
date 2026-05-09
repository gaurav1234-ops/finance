"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Network, Filter, Loader2 } from "lucide-react";

type GraphNode = {
  id: string;
  label: string;
  type: string;
};

type GraphEdge = {
  source: string;
  target: string;
  relationship: string;
};

type GraphPayload = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

const nodePositions: Record<string, { x: number; y: number }> = {
  apple: { x: 220, y: 120 },
  nvidia: { x: 460, y: 120 },
  tech: { x: 340, y: 240 },
  earnings: { x: 220, y: 360 },
  ai_event: { x: 460, y: 360 },
};

export default function GraphPage() {
  const [graph, setGraph] = useState<GraphPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runGraphQuery = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/graph/query");
      if (!res.ok) {
        throw new Error("Graph query failed");
      }
      const data: GraphPayload = await res.json();
      setGraph(data);
    } catch (err) {
      setError("Unable to load graph data. Please try again.");
      setGraph(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="px-6 h-14 flex items-center border-b border-border/40 bg-background/95 sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2 mr-6 text-muted-foreground hover:text-primary transition-colors" href="/">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <Network className="h-5 w-5 text-primary" />
          <span className="font-bold tracking-tight">Graph Reasoning</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Controls Sidebar */}
        <aside className="w-64 border-r border-border/40 bg-muted/20 flex flex-col hidden md:flex p-4">
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Graph Controls</h3>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs font-medium mb-2 block">Entity Types</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded border-gray-300" /> Companies</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded border-gray-300" /> Sectors</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded border-gray-300" /> Events</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded border-gray-300" /> Reports</label>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium mb-2 block">Relationships</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded border-gray-300" /> INVESTS_IN</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded border-gray-300" /> COMPETES_WITH</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded border-gray-300" /> BELONGS_TO</label>
              </div>
            </div>
            
            <div>
              <button
                onClick={runGraphQuery}
                disabled={loading}
                className="w-full bg-primary/10 text-primary border border-primary/20 rounded-md py-2 text-sm font-medium hover:bg-primary/20 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </span>
                ) : (
                  "Run AI Graph Query"
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* Graph Area */}
        <div className="flex-1 relative bg-slate-950 flex items-center justify-center p-4">
          {error ? (
            <div className="rounded-2xl bg-red-900/80 border border-red-700 p-6 text-center text-sm text-red-100 max-w-xl">
              {error}
            </div>
          ) : graph ? (
            <div className="relative w-full h-full rounded-3xl border border-slate-800 bg-slate-950 p-4 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 720 520" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
                  </marker>
                </defs>
                {graph.edges.map((edge) => {
                  const start = nodePositions[edge.source] ?? { x: 360, y: 260 };
                  const end = nodePositions[edge.target] ?? { x: 360, y: 260 };
                  return (
                    <g key={`${edge.source}-${edge.target}`}>
                      <line
                        x1={start.x}
                        y1={start.y}
                        x2={end.x}
                        y2={end.y}
                        stroke="#60a5fa"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                        opacity="0.8"
                      />
                      <text x={(start.x + end.x) / 2} y={(start.y + end.y) / 2 - 10} fill="#94a3b8" fontSize="13" textAnchor="middle">
                        {edge.relationship}
                      </text>
                    </g>
                  );
                })}
                {graph.nodes.map((node) => {
                  const pos = nodePositions[node.id] ?? { x: 360, y: 260 };
                  return (
                    <g key={node.id}>
                      <circle cx={pos.x} cy={pos.y} r="46" fill="#0f172a" stroke="#2563eb" strokeWidth="3" />
                      <text x={pos.x} y={pos.y} fill="#f8fafc" fontSize="14" fontWeight="700" textAnchor="middle" dominantBaseline="middle">
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          ) : (
            <div className="text-center">
              <Network className="h-16 w-16 text-primary/30 mx-auto mb-4 animate-pulse" />
              <p className="text-lg font-medium text-slate-300">Neo4j Graph Visualization</p>
              <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                Interactive D3.js/Cytoscape canvas will render the knowledge graph showing relationships between Apple, Nvidia, the Tech Sector, and macroeconomic events.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

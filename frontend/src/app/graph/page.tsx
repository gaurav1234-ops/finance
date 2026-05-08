import Link from "next/link";
import { ArrowLeft, Network, Filter } from "lucide-react";

export default function GraphPage() {
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
              <button className="w-full bg-primary/10 text-primary border border-primary/20 rounded-md py-2 text-sm font-medium hover:bg-primary/20 transition-colors">
                Run AI Graph Query
              </button>
            </div>
          </div>
        </aside>

        {/* Graph Area */}
        <div className="flex-1 relative bg-slate-950 flex items-center justify-center">
          {/* Placeholder for D3 / Cytoscape Graph */}
          <div className="text-center">
            <Network className="h-16 w-16 text-primary/30 mx-auto mb-4 animate-pulse" />
            <p className="text-lg font-medium text-slate-300">Neo4j Graph Visualization</p>
            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
              Interactive D3.js/Cytoscape canvas will render the knowledge graph showing relationships between Apple, Nvidia, the Tech Sector, and macroeconomic events.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

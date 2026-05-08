import Link from "next/link";
import { ArrowLeft, LayoutDashboard, TrendingUp, PieChart, Activity } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="px-6 h-14 flex items-center border-b border-border/40 bg-background/95 sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2 mr-6 text-muted-foreground hover:text-primary transition-colors" href="/">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-5 w-5 text-primary" />
          <span className="font-bold tracking-tight">Dashboard</span>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Market Overview</h1>
            <p className="text-muted-foreground">Welcome back. Here is your portfolio and market summary.</p>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex flex-row items-center justify-between pb-2 space-y-0">
                <h3 className="tracking-tight text-sm font-medium">Total Balance</h3>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">$124,563.20</div>
              <p className="text-xs text-muted-foreground mt-1">+2.5% from last month</p>
            </div>
            
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex flex-row items-center justify-between pb-2 space-y-0">
                <h3 className="tracking-tight text-sm font-medium">Today's P/L</h3>
                <Activity className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-bold text-emerald-500">+$1,240.50</div>
              <p className="text-xs text-muted-foreground mt-1">Driven by Tech Sector</p>
            </div>
            
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex flex-row items-center justify-between pb-2 space-y-0">
                <h3 className="tracking-tight text-sm font-medium">Asset Allocation</h3>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold">5 Equities</div>
              <p className="text-xs text-muted-foreground mt-1">AAPL, MSFT, NVDA, TSLA, AMZN</p>
            </div>
            
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex flex-row items-center justify-between pb-2 space-y-0">
                <h3 className="tracking-tight text-sm font-medium">AI Insights</h3>
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              </div>
              <div className="text-2xl font-bold">3 New Alerts</div>
              <p className="text-xs text-muted-foreground mt-1">Check AI Assistant</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Chart Placeholder */}
            <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow-sm">
              <div className="p-6 pb-2">
                <h3 className="font-semibold leading-none tracking-tight">Portfolio Performance</h3>
                <p className="text-sm text-muted-foreground mt-1.5">Last 6 months</p>
              </div>
              <div className="p-6 pt-0 h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Chart Component Placeholder (Recharts)</p>
              </div>
            </div>

            {/* Watchlist */}
            <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow-sm">
              <div className="p-6 pb-2">
                <h3 className="font-semibold leading-none tracking-tight">Watchlist</h3>
                <p className="text-sm text-muted-foreground mt-1.5">Real-time market data</p>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-4">
                  {['AAPL', 'MSFT', 'NVDA', 'TSLA', 'AMZN'].map((ticker) => (
                    <div key={ticker} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs">{ticker[0]}</div>
                        <div>
                          <p className="text-sm font-medium leading-none">{ticker}</p>
                          <p className="text-xs text-muted-foreground mt-1">Tech</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">$150.00</p>
                        <p className="text-xs text-emerald-500 mt-1">+1.2%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

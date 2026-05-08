"use client";

import Link from "next/link";
import { ArrowLeft, BrainCircuit, Search, Upload, X, File as FileIcon, User } from "lucide-react";
import { useRef, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  fileName?: string;
};

export default function ChatPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !selectedFile) return;

    const currentMessage = inputValue;
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: currentMessage,
      fileName: selectedFile?.name,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setSelectedFile(null);

    try {
      const res = await fetch("http://localhost:8000/api/v1/chat/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentMessage }),
      });

      if (!res.ok) {
        throw new Error("Backend API error");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Error: Could not connect to the local Ollama instance. Please make sure Ollama is running (`ollama serve`) and the `llama3` model is pulled (`ollama pull llama3`).",
        },
      ]);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="px-6 h-14 flex items-center border-b border-border/40 bg-background/95 sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2 mr-6 text-muted-foreground hover:text-primary transition-colors" href="/">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          <span className="font-bold tracking-tight">AI Assistant</span>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border/40 bg-muted/20 flex flex-col hidden md:flex">
          <div className="p-4 border-b border-border/40">
            <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md text-sm font-medium transition-colors">
              <span>New Chat</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2 px-2 uppercase tracking-wider">Today</h4>
              <div className="space-y-1">
                <button className="w-full text-left px-2 py-1.5 text-sm rounded-md bg-accent text-accent-foreground hover:bg-accent/80 truncate">
                  Nvidia Earnings Analysis
                </button>
                <button className="w-full text-left px-2 py-1.5 text-sm rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground truncate">
                  AAPL Q3 Report Summary
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2 px-2 uppercase tracking-wider">Previous 7 Days</h4>
              <div className="space-y-1">
                <button className="w-full text-left px-2 py-1.5 text-sm rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground truncate">
                  Tech Sector Heatmap
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative">
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-3xl mx-auto space-y-8 pb-20">
              
              {/* Messages Area */}
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-6">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <BrainCircuit className="h-12 w-12 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">How can I help you today?</h2>
                    <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                      I can analyze financial reports, query real-time stock data, and reason across global market relationships.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mt-8">
                    <div onClick={() => setInputValue("Analyze NVDA Q3 Earnings")} className="p-4 rounded-xl border border-border/50 bg-card text-left hover:bg-accent cursor-pointer transition-colors">
                      <p className="text-sm font-medium">Analyze NVDA Q3 Earnings</p>
                      <p className="text-xs text-muted-foreground mt-1">Based on recent SEC filings</p>
                    </div>
                    <div onClick={() => setInputValue("Compare AAPL vs MSFT")} className="p-4 rounded-xl border border-border/50 bg-card text-left hover:bg-accent cursor-pointer transition-colors">
                      <p className="text-sm font-medium">Compare AAPL vs MSFT</p>
                      <p className="text-xs text-muted-foreground mt-1">Focus on profit margins</p>
                    </div>
                    <div onClick={() => setInputValue("Show Tech Sector Graph")} className="p-4 rounded-xl border border-border/50 bg-card text-left hover:bg-accent cursor-pointer transition-colors">
                      <p className="text-sm font-medium">Tech Sector Graph</p>
                      <p className="text-xs text-muted-foreground mt-1">Show AI supply chain relations</p>
                    </div>
                    <div onClick={() => setInputValue("Evaluate My Portfolio Risk")} className="p-4 rounded-xl border border-border/50 bg-card text-left hover:bg-accent cursor-pointer transition-colors">
                      <p className="text-sm font-medium">My Portfolio Risk</p>
                      <p className="text-xs text-muted-foreground mt-1">Evaluate current exposure</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : ""}`}>
                      {msg.role === "assistant" && (
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <BrainCircuit className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div className={`flex flex-col gap-2 max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                        <div className={`p-4 rounded-2xl ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"}`}>
                          {msg.fileName && (
                            <div className="flex items-center gap-2 mb-2 p-2 bg-background/20 rounded-md text-xs font-medium">
                              <FileIcon className="h-3.5 w-3.5" />
                              <span className="truncate">{msg.fileName}</span>
                            </div>
                          )}
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                      {msg.role === "user" && (
                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                          <User className="h-5 w-5 text-secondary-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Input Area */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
            <div className="max-w-3xl mx-auto relative flex flex-col gap-2">
              
              {/* Selected File Badge */}
              {selectedFile && (
                <div className="flex items-center gap-2 self-start bg-muted px-3 py-1.5 rounded-full text-xs font-medium text-foreground shadow-sm">
                  <FileIcon className="h-3.5 w-3.5 text-primary" />
                  <span className="truncate max-w-[200px]">{selectedFile.name}</span>
                  <button onClick={handleRemoveFile} className="text-muted-foreground hover:text-foreground">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              <div className="flex items-center bg-card border border-border rounded-2xl shadow-sm focus-within:ring-1 focus-within:ring-primary overflow-hidden">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Upload className="h-5 w-5" />
                </button>
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <input 
                  className="flex-1 bg-transparent py-4 outline-none placeholder:text-muted-foreground text-sm" 
                  placeholder="Ask anything about finance, stocks, or upload reports..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button 
                  onClick={handleSendMessage}
                  className="p-2 mr-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  disabled={!inputValue.trim() && !selectedFile}
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center mt-1">
                <p className="text-[10px] text-muted-foreground">AI can make mistakes. Always verify important financial information.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

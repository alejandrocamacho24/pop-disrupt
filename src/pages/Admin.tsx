import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

interface RankingRow {
  id: string;
  rankings: { flavor_id: string; flavor_name: string; rank: number; comment: string }[];
  created_at: string;
}

interface SuggestionRow {
  id: string;
  name: string | null;
  suggestion: string;
  created_at: string;
}

const Admin = () => {
  const [rankings, setRankings] = useState<RankingRow[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"rankings" | "suggestions">("rankings");

  const fetchData = async () => {
    setLoading(true);
    const [rankRes, sugRes] = await Promise.all([
      supabase.from("flavor_rankings").select("*").order("created_at", { ascending: false }),
      supabase.from("flavor_suggestions").select("*").order("created_at", { ascending: false }),
    ]);
    if (rankRes.data) setRankings(rankRes.data as unknown as RankingRow[]);
    if (sugRes.data) setSuggestions(sugRes.data as unknown as SuggestionRow[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="font-display text-3xl md:text-4xl">Admin Dashboard</h1>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-secondary rounded-lg p-1 w-fit">
          <button
            onClick={() => setTab("rankings")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === "rankings" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Rankings ({rankings.length})
          </button>
          <button
            onClick={() => setTab("suggestions")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === "suggestions" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Suggestions ({suggestions.length})
          </button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : tab === "rankings" ? (
          <div className="space-y-4">
            {rankings.length === 0 ? (
              <p className="text-muted-foreground">No ranking submissions yet.</p>
            ) : (
              rankings.map((r) => (
                <div key={r.id} className="bg-card border border-border rounded-lg p-4 md:p-6">
                  <p className="text-xs text-muted-foreground mb-3">{formatDate(r.created_at)}</p>
                  <div className="space-y-1.5">
                    {r.rankings
                      .sort((a, b) => a.rank - b.rank)
                      .map((item) => (
                        <div key={item.flavor_id} className="flex items-start gap-3">
                          <span className="w-6 text-right font-display text-primary shrink-0">
                            {item.rank}.
                          </span>
                          <div>
                            <span className="font-medium">{item.flavor_name}</span>
                            {item.comment && (
                              <p className="text-sm text-muted-foreground italic mt-0.5">
                                "{item.comment}"
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {suggestions.length === 0 ? (
              <p className="text-muted-foreground">No flavor suggestions yet.</p>
            ) : (
              suggestions.map((s) => (
                <div key={s.id} className="bg-card border border-border rounded-lg p-4 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{s.suggestion}</p>
                      {s.name && (
                        <p className="text-sm text-muted-foreground mt-1">— {s.name}</p>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground shrink-0">
                      {formatDate(s.created_at)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

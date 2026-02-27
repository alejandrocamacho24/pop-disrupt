import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { ArrowLeft, RefreshCw, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";

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
  const [preRankings, setPreRankings] = useState<RankingRow[]>([]);
  const [postRankings, setPostRankings] = useState<RankingRow[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"pre" | "post" | "suggestions">("pre");
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [preRes, postRes, sugRes] = await Promise.all([
      supabase.from("pre_flavor_rankings" as any).select("*").order("created_at", { ascending: false }),
      supabase.from("post_flavor_rankings" as any).select("*").order("created_at", { ascending: false }),
      supabase.from("flavor_suggestions").select("*").order("created_at", { ascending: false }),
    ]);
    if (preRes.data) setPreRankings(preRes.data as unknown as RankingRow[]);
    if (postRes.data) setPostRankings(postRes.data as unknown as RankingRow[]);
    if (sugRes.data) setSuggestions(sugRes.data as unknown as SuggestionRow[]);
    setLoading(false);
  };

  useEffect(() => {
    if (session) fetchData();
  }, [session]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });


  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const ALLOWED_EMAILS = ["acamacho2494@gmail.com"];
  const isAllowed = session && ALLOWED_EMAILS.includes(session.user.email ?? "");

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="font-display text-3xl md:text-4xl text-foreground">Admin Access</h1>
          <p className="text-muted-foreground">Sign in with Google to access the dashboard.</p>
          <button
            onClick={async () => {
              await lovable.auth.signInWithOAuth("google", {
                redirect_uri: window.location.origin + "/admin",
              });
            }}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold text-sm tracking-wider hover:bg-primary/90 transition-colors"
          >
            Sign in with Google
          </button>
          <div>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAllowed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="font-display text-3xl md:text-4xl text-foreground">Access Denied</h1>
          <p className="text-muted-foreground">
            {session.user.email} is not authorized to access this dashboard.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => supabase.auth.signOut()}
              className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold text-sm tracking-wider hover:bg-secondary/80 transition-colors"
            >
              Sign out
            </button>
            <Link to="/" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm tracking-wider hover:bg-primary/90 transition-colors">
              Back to site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const renderRankings = (items: RankingRow[]) => (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-muted-foreground">No ranking submissions yet.</p>
      ) : (
        items.map((r) => (
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
  );

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
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground hidden md:block">{session.user.email}</span>
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={() => supabase.auth.signOut()}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-secondary rounded-lg p-1 w-fit">
          <button
            onClick={() => setTab("pre")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === "pre" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Pre Ranking ({preRankings.length})
          </button>
          <button
            onClick={() => setTab("post")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === "post" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Post Ranking ({postRankings.length})
          </button>
          <button
            onClick={() => setTab("suggestions")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === "suggestions" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Pitch a Flavor ({suggestions.length})
          </button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : tab === "pre" ? (
          renderRankings(preRankings)
        ) : tab === "post" ? (
          renderRankings(postRankings)
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

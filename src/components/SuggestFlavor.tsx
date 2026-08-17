import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Send } from "lucide-react";
import movieMoodHero from "@/assets/movie-mood-hero.webp";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const SuggestFlavor = () => {
  const [suggestion, setSuggestion] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setRotation((r) => r + 1440 + Math.floor(Math.random() * 360));
    setTimeout(() => {
      setSpinning(false);
      navigate("/moviepick");
    }, 2200);
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    setSubmitting(true);
    const { error } = await supabase
      .from("flavor_suggestions")
      .insert({ name: name.trim() || null, suggestion: suggestion.trim() });
    setSubmitting(false);
    if (error) {
      toast.error("Failed to submit suggestion. Please try again.");
    } else {
      toast.success("Flavor suggestion submitted! 🍿", {
        description: `"${suggestion}" — we'll consider it!`,
      });
      setSuggestion("");
      setName("");
    }
  };

  return (
    <section id="suggest" className="px-4 md:px-12 lg:px-20 py-16">
      <div className="mb-12 flex flex-col items-center">
        <button
          type="button"
          onClick={handleSpin}
          aria-label="Movie Pick Mood"
          className="group relative flex flex-col items-center gap-3 focus:outline-none"
        >
          <span className="relative block">
            {/* pointer */}
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[16px] border-l-transparent border-r-transparent border-t-primary" />
            <span
              className="block w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-primary shadow-2xl transition-transform duration-[2000ms] ease-[cubic-bezier(0.17,0.67,0.15,1)]"
              style={{
                transform: `rotate(${rotation}deg)`,
                background:
                  "conic-gradient(hsl(var(--primary)) 0deg 45deg, hsl(var(--card)) 45deg 90deg, hsl(var(--primary)) 90deg 135deg, hsl(var(--card)) 135deg 180deg, hsl(var(--primary)) 180deg 225deg, hsl(var(--card)) 225deg 270deg, hsl(var(--primary)) 270deg 315deg, hsl(var(--card)) 315deg 360deg)",
              }}
            />
            <span className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-0.5 px-3 text-center">
              <img
                src={movieMoodHero}
                alt="Popcorn character sipping hot chocolate"
                className={`w-8 md:w-10 h-auto object-contain drop-shadow-lg ${
                  spinning ? "animate-pulse" : "group-hover:scale-110 transition-transform"
                }`}
              />
              <span className="font-display text-sm md:text-base tracking-wider text-foreground leading-none">
                {spinning ? "SPINNING..." : "MOVIE PICK MOOD"}
              </span>
            </span>
          </span>
        </button>
      </div>

      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-2 flex items-center gap-3">
        <Sparkles className="text-primary" size={36} />
        Pitch a Flavor
      </h2>
      <p className="text-muted-foreground mb-10 text-sm tracking-wide">
        WHAT FLAVOR SHOULD WE DROP NEXT? YOU TELL US.
      </p>


      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <textarea
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          placeholder="Describe your dream popcorn flavor..."
          className="w-full bg-card border border-border rounded-lg px-4 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          rows={4}
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm tracking-wider hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Send size={16} />
          {submitting ? "SUBMITTING..." : "SUBMIT YOUR FLAVOR"}
        </button>
      </form>

      <div className="mt-12 flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={handleSpin}
          aria-label="Movie Pick Mood"
          className="group relative flex flex-col items-center gap-3 focus:outline-none"
        >
          <span className="relative block">
            {/* pointer */}
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[16px] border-l-transparent border-r-transparent border-t-primary" />
            <span
              className="block w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-primary shadow-2xl transition-transform duration-[2000ms] ease-[cubic-bezier(0.17,0.67,0.15,1)]"
              style={{
                transform: `rotate(${rotation}deg)`,
                background:
                  "conic-gradient(hsl(var(--primary)) 0deg 45deg, hsl(var(--card)) 45deg 90deg, hsl(var(--primary)) 90deg 135deg, hsl(var(--card)) 135deg 180deg, hsl(var(--primary)) 180deg 225deg, hsl(var(--card)) 225deg 270deg, hsl(var(--primary)) 270deg 315deg, hsl(var(--card)) 315deg 360deg)",
              }}
            />
            <span className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-0.5 px-3 text-center">
              <img
                src={movieMoodHero}
                alt="Popcorn character sipping hot chocolate"
                className={`w-8 md:w-10 h-auto object-contain drop-shadow-lg ${
                  spinning ? "animate-pulse" : "group-hover:scale-110 transition-transform"
                }`}
              />
              <span className="font-display text-sm md:text-base tracking-wider text-foreground leading-none">
                {spinning ? "SPINNING..." : "MOVIE PICK MOOD"}
              </span>
            </span>
          </span>
        </button>
        <a
          href="https://www.amazon.com/dp/B0GTB3LW96"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#FF9900] text-black px-12 py-5 rounded-xl font-display text-2xl md:text-3xl tracking-wider hover:bg-[#e68a00] transition-colors text-center"
        >
          🛒 SHOP ON AMAZON
        </a>
      </div>
    </section>
  );
};

export default SuggestFlavor;

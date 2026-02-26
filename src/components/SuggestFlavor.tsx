import { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { toast } from "sonner";

const SuggestFlavor = () => {
  const [suggestion, setSuggestion] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    toast.success("Flavor suggestion submitted! 🍿", {
      description: `"${suggestion}" — we'll consider it!`,
    });
    setSuggestion("");
    setName("");
  };

  return (
    <section id="suggest" className="px-4 md:px-12 lg:px-20 py-16">
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
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <textarea
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          placeholder="Describe your dream popcorn flavor..."
          className="w-full bg-card border border-border rounded-lg px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          rows={4}
          required
        />
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm tracking-wider hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <Send size={16} />
          SUBMIT YOUR FLAVOR
        </button>
      </form>

      <div className="mt-12 flex justify-center">
        <a
          href="https://www.amazon.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-primary-foreground px-12 py-5 rounded-xl font-display text-2xl md:text-3xl tracking-wider hover:bg-primary/90 transition-colors text-center"
        >
          🛒 SHOP ON AMAZON
        </a>
      </div>
    </section>
  );
};

export default SuggestFlavor;

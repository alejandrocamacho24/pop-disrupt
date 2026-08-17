import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Film, Popcorn } from "lucide-react";
import { flavors } from "@/data/flavors";
import { moviePicks } from "@/data/moviePicks";
import Footer from "@/components/Footer";
import pdLogo from "@/assets/pd_logo.png";

const MoviePick = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const result = selected ? moviePicks[selected] : null;
  const flavor = flavors.find((f) => f.id === selected);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative px-4 md:px-12 lg:px-20 pt-10 pb-6">
        <img
          src={pdLogo}
          alt="Pop Disrupt"
          className="absolute top-4 right-4 md:top-6 md:right-8 w-16 md:w-20 h-auto z-20 mix-blend-screen"
          style={{ clipPath: "inset(0 0 0 20%)" }}
        />
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Pop Disrupt
        </Link>

        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mt-6 flex items-center gap-3 flex-wrap">
          <Film className="text-primary shrink-0" size={40} />
          Tonight's Flavor Picks the Movie
        </h1>
        <p className="text-muted-foreground mt-3 text-sm md:text-base tracking-wide max-w-2xl">
          PICK YOUR POPCORN. WE'LL PICK THE MOVIE. NO SCROLLING FOR 40 MINUTES.
        </p>
      </section>

      <section className="px-4 md:px-12 lg:px-20 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {flavors.map((f) => {
            const isActive = selected === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelected(f.id)}
                aria-pressed={isActive}
                className={`group rounded-xl border p-3 text-left transition-all ${
                  isActive
                    ? "border-primary bg-primary/10 ring-1 ring-primary"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="aspect-square w-full flex items-center justify-center overflow-hidden">
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-full h-full object-contain mix-blend-screen transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 block font-semibold text-base text-foreground leading-tight">
                  {f.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-4 md:px-12 lg:px-20 pb-16 min-h-[40vh]">
        {!result && (
          <p className="text-muted-foreground text-center py-10 flex items-center justify-center gap-2 text-base">
            <Popcorn className="text-primary" size={20} />
            Choose a flavor above to get tonight's lineup.
          </p>
        )}

        {result && flavor && (
          <div className="animate-fade-in-up">
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              {flavor.name} <span className="text-primary">·</span> {result.vibe}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {result.picks.map((p) => (
                <article
                  key={p.title}
                  className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-display text-2xl text-foreground tracking-wide">{p.title}</h3>
                  <p className="text-xs text-muted-foreground tracking-widest mt-1 uppercase">
                    {p.year} · {p.genre}
                  </p>
                  <p className="text-sm text-foreground/80 mt-3">{p.why}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.amazon.com/dp/B0GTB3LW96"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF9900] text-black px-8 py-4 rounded-xl font-display text-xl md:text-2xl tracking-wider hover:bg-[#e68a00] transition-colors text-center"
              >
                🛒 GET THE SEASONING
              </a>
              <Link
                to="/ranking"
                className="border border-muted-foreground/30 text-foreground px-8 py-4 rounded-xl font-display text-xl md:text-2xl tracking-wider hover:bg-secondary transition-colors text-center"
              >
                RANK THE DROP
              </Link>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default MoviePick;

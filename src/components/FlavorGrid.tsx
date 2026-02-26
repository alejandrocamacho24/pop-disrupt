import { useState } from "react";
import { flavors, type Flavor } from "@/data/flavors";
import FlavorModal from "./FlavorModal";

const FlavorGrid = () => {
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | null>(null);

  return (
    <section id="flavors" className="px-4 md:px-12 lg:px-20 py-16">
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-2">
        Trending Now
      </h2>
      <p className="text-muted-foreground mb-10 text-sm tracking-wide">8 FLAVORS. ZERO CHILL.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {flavors.map((flavor, i) => (
          <button
            key={flavor.id}
            onClick={() => setSelectedFlavor(flavor)}
            className="group relative aspect-video rounded-md overflow-hidden card-hover focus:outline-none focus:ring-2 focus:ring-primary"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <img
              src={flavor.image}
              alt={flavor.name}
              className="w-full h-full object-contain"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <div className="text-left">
                <p className="font-display text-lg text-foreground leading-tight">{flavor.name}</p>
                <div className="flex gap-1.5 mt-1">
                  {flavor.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-sm bg-primary/20 text-primary font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedFlavor && (
        <FlavorModal flavor={selectedFlavor} onClose={() => setSelectedFlavor(null)} />
      )}
    </section>
  );
};

export default FlavorGrid;

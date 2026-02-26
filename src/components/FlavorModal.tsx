import { type Flavor } from "@/data/flavors";
import { X } from "lucide-react";

interface FlavorModalProps {
  flavor: Flavor;
  onClose: () => void;
}

const FlavorModal = ({ flavor, onClose }: FlavorModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-2xl bg-card rounded-lg overflow-hidden border border-border animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-background transition-colors"
        >
          <X size={16} />
        </button>

        <div className="aspect-video w-full">
          <img src={flavor.image} alt={flavor.name} className="w-full h-full object-contain" />
        </div>

        <div className="p-6">
          <h3 className="font-display text-3xl text-foreground mb-1">{flavor.name}</h3>
          <div className="flex gap-2 mb-4">
            {flavor.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-sm bg-primary/20 text-primary font-medium">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">{flavor.description}</p>
          <a
            href="https://www.amazon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-primary text-primary-foreground px-8 py-3 rounded-sm font-semibold text-sm tracking-wider hover:bg-primary/90 transition-colors"
          >
            GET IT ON AMAZON
          </a>
        </div>
      </div>
    </div>
  );
};

export default FlavorModal;

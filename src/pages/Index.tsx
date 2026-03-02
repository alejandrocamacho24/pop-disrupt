import { Instagram } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import FlavorGrid from "@/components/FlavorGrid";
import FlavorRanking from "@/components/FlavorRanking";
import SuggestFlavor from "@/components/SuggestFlavor";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <HeroSection />
      <FlavorGrid />
      <FlavorRanking subtitle="WHICH ONE ARE YOU MOST EXCITED TO TRY?" />
      <SuggestFlavor />
      <div className="flex items-center justify-between px-4 md:px-12 lg:px-20 py-6">
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
          🇺🇸 Made in the USA
        </span>
        <a
          href="https://www.instagram.com/popdisrupt"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg hover:opacity-90 transition-opacity text-sm font-medium"
        >
          <Instagram size={20} />
          @popdisrupt
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default Index;

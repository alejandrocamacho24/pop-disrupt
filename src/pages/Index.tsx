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
      <Footer />
      <a
        href="https://www.instagram.com/popdisrupt"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg hover:opacity-90 transition-opacity text-sm font-medium"
      >
        <Instagram size={20} />
        @popdisrupt
      </a>
    </div>
  );
};

export default Index;

import HeroSection from "@/components/HeroSection";
import FlavorGrid from "@/components/FlavorGrid";
import FlavorRanking from "@/components/FlavorRanking";
import SuggestFlavor from "@/components/SuggestFlavor";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FlavorGrid />
      <FlavorRanking subtitle="WHICH ONE ARE YOU MOST EXCITED TO TRY?" />
      <SuggestFlavor />
      <Footer />
    </div>
  );
};

export default Index;

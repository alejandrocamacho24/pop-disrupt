import HeroSection from "@/components/HeroSection";
import FlavorGrid from "@/components/FlavorGrid";
import SuggestFlavor from "@/components/SuggestFlavor";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FlavorGrid />
      <SuggestFlavor />
      <Footer />
    </div>
  );
};

export default Index;

import FlavorRanking from "@/components/FlavorRanking";
import SuggestFlavor from "@/components/SuggestFlavor";

const Ranking = () => {
  return (
    <div className="min-h-screen bg-background">
      <FlavorRanking />
      <SuggestFlavor />
    </div>
  );
};

export default Ranking;

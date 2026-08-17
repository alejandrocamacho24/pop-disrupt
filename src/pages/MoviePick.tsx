const MoviePick = () => {
  return (
    <div className="fixed inset-0 bg-background">
      <iframe
        src="/tonights-flavor.html"
        title="Tonight's Flavor Picks the Movie"
        className="w-full h-full border-0"
      />
    </div>
  );
};

export default MoviePick;

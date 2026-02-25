import pdLogo from "@/assets/pd_logo.png";
import pdTitle from "@/assets/Pop_Disrupt_title.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Logo top-right */}
      <img
        src={pdLogo}
        alt="Pop Disrupt Logo"
        className="absolute top-4 right-4 md:top-6 md:right-8 w-16 md:w-20 h-auto z-20 drop-shadow-2xl mix-blend-lighten"
      />

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 animate-fade-in-up px-4">
        <img
          src={pdTitle}
          alt="Pop Disrupt"
          className="w-[90vw] md:w-[70vw] lg:w-[700px] h-auto drop-shadow-2xl mix-blend-lighten"
        />
        <p className="text-muted-foreground text-center max-w-lg text-base md:text-lg font-light tracking-wide mt-2">
          Flavors that don't exist yet. Until now.
        </p>
        <div className="flex gap-3 mt-4">
          <a
            href="#flavors"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-sm font-semibold text-sm tracking-wider hover:bg-primary/90 transition-colors"
          >
            EXPLORE FLAVORS
          </a>
          <a
            href="#rank"
            className="border border-muted-foreground/30 text-foreground px-8 py-3 rounded-sm font-semibold text-sm tracking-wider hover:bg-secondary transition-colors"
          >
            RANK THEM
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;

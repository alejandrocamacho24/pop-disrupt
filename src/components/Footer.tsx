import { Instagram } from "lucide-react";
import pdLogo from "@/assets/pd_logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border px-4 md:px-12 lg:px-20 py-12 mt-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={pdLogo} alt="Pop Disrupt" className="w-8 h-auto" />
          <span className="font-display text-xl text-foreground tracking-wider">POP DISRUPT</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://www.amazon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Shop on Amazon
          </a>
          <a href="#flavors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Flavors
          </a>
          <a href="#rank" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Rank
          </a>
        </div>
        <a
          href="https://www.instagram.com/popdisrupt"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Instagram size={20} />
          Follow us @popdisrupt
        </a>
        <p className="text-xs text-muted-foreground">
          © 2025 Pop Disrupt. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

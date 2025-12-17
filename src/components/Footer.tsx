import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Daniel Dias Agostinho. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          Built with <Heart className="w-4 h-4 text-primary" /> using React
        </p>
      </div>
    </footer>
  );
};

export default Footer;
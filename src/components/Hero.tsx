import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <p className="text-primary font-mono text-sm md:text-base mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Hello, I'm
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Daniel Agostinho
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Master's Student in Computer Science at FCT Nova. Passionate about learning valuable skills
          and growing as a developer. Currently working as a Junior Developer.
        </p>

        <div className="flex flex-wrap gap-4 justify-center opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center justify-center w-48 px-6 py-3 border border-border bg-card rounded-lg font-medium hover:bg-secondary transition-colors"
            >
              Download CV
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center w-48 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </a>

            <a
              href="#experience"
              className="inline-flex items-center justify-center w-48 px-6 py-3 border border-border bg-card rounded-lg font-medium hover:bg-secondary transition-colors"
            >
              View Experience
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors opacity-0 animate-fade-in"
        style={{ animationDelay: '1.2s' }}
      >
        <ArrowDown className="w-6 h-6 animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
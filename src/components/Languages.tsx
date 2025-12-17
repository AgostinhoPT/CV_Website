import { Globe } from "lucide-react";

const languages = [
  { name: "Portuguese", level: "Native", flag: "🇵🇹", percentage: 100 },
  { name: "English", level: "Professional", flag: "🇬🇧", percentage: 85 },
];

const Languages = () => {
  return (
    <section id="languages" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Languages</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="p-6 bg-card rounded-2xl card-shadow border border-border hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{lang.flag}</span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{lang.name}</h3>
                  <p className="text-sm text-muted-foreground">{lang.level}</p>
                </div>
              </div>

              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500 group-hover:opacity-80"
                  style={{ width: `${lang.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Languages;
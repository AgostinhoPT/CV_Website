import { Code2, Brain } from "lucide-react";

const hardSkills = [
  { name: "Java", level: 90 },
  { name: "C", level: 80 },
  { name: "Python", level: 85 },
  { name: "OCaml", level: 70 },
  { name: "HTML + CSS + JS", level: 90 },
  { name: "React", level: 85 },
  { name: "Git + Github", level: 88 },
];

const softSkills = [
  { name: "Critical Thinking", icon: "🧠" },
  { name: "Pressure Control", icon: "💪" },
  { name: "Versatility", icon: "🔄" },
  { name: "Teamwork", icon: "🤝" },
  { name: "Focus", icon: "🎯" },
  { name: "Dedication", icon: "⭐" },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Hard Skills */}
          <div className="bg-card p-8 rounded-2xl card-shadow border border-border">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Hard Skills</h3>
            </div>

            <div className="space-y-6">
              {hardSkills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm text-foreground">{skill.name}</span>
                    <span className="text-xs text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-card p-8 rounded-2xl card-shadow border border-border">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Soft Skills</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors group"
                >
                  <span className="text-2xl mb-2 block">{skill.icon}</span>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
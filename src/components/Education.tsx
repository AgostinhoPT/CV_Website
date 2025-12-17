import { GraduationCap, CheckCircle2 } from "lucide-react";

const education = [
  {
    degree: "Master's in Computer Science",
    institution: "FCT Nova",
    status: "In Progress",
    completed: false,
  },
  {
    degree: "Bachelor's in Computer Science",
    institution: "FCT Nova",
    status: "Completed",
    completed: true,
  },
];

const Education = () => {
  return (
    <section id="education" className="py-24 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Education</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className={`p-8 bg-card rounded-2xl card-shadow border border-border relative overflow-hidden ${
                !edu.completed ? "ring-2 ring-primary/20" : ""
              }`}
            >
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />

              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  {edu.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  ) : (
                    <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      In Progress
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">{edu.degree}</h3>
                <p className="text-primary font-medium mb-2">{edu.institution}</p>
                <p className="text-sm text-muted-foreground">{edu.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
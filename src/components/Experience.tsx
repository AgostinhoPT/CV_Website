import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Junior Developer",
    company: "Consultoria Innova",
    location: "Caparica",
    period: "2025 - Present",
    description:
      "At the end of my first semester of my 3rd year at university, I joined Innova as a junior developer. Since then, I have had the opportunity to work on many projects as a front-end and integration developer.",
    current: true,
  },
  {
    title: "Internship",
    company: "Legau",
    location: "Caparica",
    period: "2025",
    description:
      "As part of the ADC course at university in the projects track, I joined Legau which allowed me to experience a real work environment and learn new technologies while refining some learned during the course in an agile environment.",
    current: false,
  },
  {
    title: "Waiter",
    company: "Pizzaria Vieira",
    location: "Portugal",
    period: "2021 - 2024",
    description:
      "During my time working at Pizzaria Vieira, I learned to work in a team and deal with pressure situations with focus, calm, and dedication. I also learned to interact with people of different nationalities and was able to train new employees over the years.",
    current: false,
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Experience</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full md:-translate-x-1/2 z-10 ring-4 ring-background" />

                {/* Content */}
                <div className={`pl-8 md:pl-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                  <div
                    className={`p-6 bg-card rounded-2xl card-shadow border border-border ${
                      exp.current ? "ring-2 ring-primary/20" : ""
                    }`}
                  >
                    {exp.current && (
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                        Current
                      </span>
                    )}
                    <h3 className="text-xl font-semibold text-foreground mb-2">{exp.title}</h3>
                    <p className="text-primary font-medium mb-4">{exp.company}</p>

                    <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 ${index % 2 === 0 ? "" : "md:justify-end"}`}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
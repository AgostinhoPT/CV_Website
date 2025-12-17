import { ExternalLink, Github, Folder } from "lucide-react";

const projects = [
  {
    title: "This CV Website",
    description: "A personal CV website built to showcase my skills, projects, and contact information. Initial build done with lovable and improved and customized over time manually by me.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/AgostinhoPT/CV_Website",
    liveUrl: null,
  },
  {
    title: "Bigodify Youtube",
    description: "Browser Extension that adds my cat bigodes to every youtube thumbnail. Created as a fun project to practice on a fork of an existing open-source extension.",
    technologies: ["JavaScript", "HTML", "Batch Scripting", "Chrome Extensions API"],
    githubUrl: "https://github.com/AgostinhoPT/Bigodify-Youtube",
    liveUrl: null,
  },
  {
    title: "Implementing Data Privacy",
    description: "This project involves implementing and subsequently attacking various data privacy protections, including simple de-identification, k-anonymity, and Laplace differential privacy middleware, to evaluate their effectiveness.",
    technologies: ["Java", "Python", "SQL", "Privacy Algorithms"],
    githubUrl: "https://github.com/AgostinhoPT/PrivSis_Project1",
    liveUrl: null,
  },
  {
    title: "Tor - The Safer Path",
    description: "This project focuses on implementing and simulating a new Tor path selection algorithm that uses a probabilistic weighting mechanism to avoid nodes within the same country, aiming to enhance security against country-level adversaries without compromising network usability.",
    technologies: ["Java", "Python", "Tor Protocol"],
    githubUrl: "https://github.com/AgostinhoPT/PrivSis_Project2",
    liveUrl: null,
  },
  {
    title: "Mouse Wiggler",
    description: "A simple application that prevents the computer from going to sleep by simulating small mouse movements at regular intervals. Useful for keeping the system awake during long tasks.",
    technologies: ["C", "Batch Scripting", "Shell Scripting"],
    githubUrl: "https://github.com/AgostinhoPT/Wiggler",
    liveUrl: null,
  },
  {
    title: "MyLinkedIn",
    description: "A LinkedIn clone website built for Systems Process Modeling that adds existing features and new features, like an AI assistant as a proof of concept and practice of several types of software achitectural modeling.",
    technologies: ["Typescript", "HTML", "CSS", "System Design"],
    githubUrl: "https://github.com/navez03/MyLinkedIn",
    liveUrl: null,
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-2xl card-shadow border border-border hover:border-primary/50 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Folder className="w-6 h-6 text-primary" />
                </div>
                <div className="flex gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="View on GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="View live demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

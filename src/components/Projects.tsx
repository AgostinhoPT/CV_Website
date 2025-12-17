import { ExternalLink, Github, Folder } from "lucide-react";

const projects = [
  {
    title: "Project Name 1",
    description: "A brief description of what this project does and the technologies used.",
    technologies: ["React", "TypeScript", "Tailwind"],
    githubUrl: "https://github.com/yourusername/project1",
    liveUrl: null,
  },
  {
    title: "Project Name 2",
    description: "Another project description highlighting key features and your role.",
    technologies: ["Python", "FastAPI", "PostgreSQL"],
    githubUrl: "https://github.com/yourusername/project2",
    liveUrl: "https://project2-demo.com",
  },
  {
    title: "Project Name 3",
    description: "Description of a third meaningful project you've worked on.",
    technologies: ["Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/yourusername/project3",
    liveUrl: null,
  },
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

import { MapPin, GraduationCap, Briefcase } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am currently a Master's student in Computer Science at FCT Nova. 
              My ambition is to learn valuable skills to progress in my career as a programmer 
              and software developer.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With a strong foundation in both theoretical knowledge and practical experience, 
              I thrive in agile environments where I can continuously learn and contribute to 
              meaningful projects.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="p-6 bg-card rounded-xl card-shadow border border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Location</h3>
                  <p className="text-muted-foreground">Alcanena, Santarém, Portugal</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-card rounded-xl card-shadow border border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Education</h3>
                  <p className="text-muted-foreground">Bachelor's in Computer Science, FCT Nova</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-card rounded-xl card-shadow border border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Current Role</h3>
                  <p className="text-muted-foreground">Junior Developer at Innova Consulting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
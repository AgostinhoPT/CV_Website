import { Dumbbell, Bike, Music, Gamepad2, Wrench } from "lucide-react";

const hobbies = [
  {
    name: "Exercise",
    icon: Dumbbell,
    description: "Staying active and maintaining a healthy lifestyle through regular workouts",
  },
  {
    name: "Motorcycle Riding",
    icon: Bike,
    description: "Exploring roads and enjoying the freedom of two wheels",
  },
  {
    name: "Playing Saxophone",
    icon: Music,
    description: "Expressing creativity through music and learning new pieces",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    description: "Immersing in virtual worlds and enjoying interactive storytelling",
  },
  {
    name: "Tinkering",
    icon: Wrench,
    description: "Building PCs, customizing hardware, and maintaining my motorcycle",
  },
];

const Hobbies = () => {
  return (
    <section id="hobbies" className="py-24 px-4 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Hobbies</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Flex container with wrap and center alignment */}
        <div className="flex flex-wrap justify-center gap-6">
          {hobbies.map((hobby) => (
            <div
              key={hobby.name}
              // md:w-[30%] ensures 3 items fit on one row (30% * 3 + gaps < 100%)
              // w-full handles mobile view
              className="w-full md:w-[30%] p-6 bg-card rounded-2xl card-shadow border border-border hover:border-primary/30 hover:-translate-y-1 transition-all group"
            >
              <div className="p-4 bg-primary/10 rounded-xl w-fit mb-6 group-hover:bg-primary/20 transition-colors">
                <hobby.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{hobby.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{hobby.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
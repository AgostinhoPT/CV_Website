import { Phone, Mail, Linkedin, MapPin } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "(+351) 912 559 675",
    href: "tel:+351912559675",
  },
  {
    icon: Mail,
    label: "Email",
    value: "danielagostinho2004@gmail.com",
    href: "mailto:danielagostinho2004@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "daniel-dias-agostinho",
    href: "https://linkedin.com/in/daniel-dias-agostinho",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Serra de Santo António, Alcanena",
    href: null,
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat.
            Feel free to reach out! (Especially if you are a recruiter 😉)
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {contactInfo.map((info) => {
            const content = (
              <div className="p-6 bg-card rounded-2xl card-shadow border border-border hover:border-primary/30 transition-all group flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {info.value}
                  </p>
                </div>
              </div>
            );

            if (info.href) {
              return (
                <a key={info.label} href={info.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              );
            }

            return <div key={info.label}>{content}</div>;
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
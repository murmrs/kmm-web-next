import { MapPin, Menu, Shield } from "lucide-react";

const kmmBenefits = [
  {
    icon: Menu,
    title: "Menu-First Approach",
    description: "We focus on what matters most - the food you'll actually eat",
  },
  {
    icon: Shield,
    title: "Dietary Safety",
    description: "Advanced filtering ensures your dietary needs are met",
  },
  {
    icon: MapPin,
    title: "Local Discovery",
    description: "Meet your customers where they are",
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Makes Us Different
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We focus on bringing everyone to the table—chefs, owners, servers,
            and guests—to create a solution that supports what truly matters:
            creating, serving, and enjoying food.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {kmmBenefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { MapPin, Zap } from "lucide-react";
import Link from "next/link";

const PricingNotes = [
  {
    title: "One Location",
    description: "$1000 per year",
  },
  {
    title: "Additional Locations",
    description: "$300 each per year",
  },
  {
    title: "Menu Options",
    description: "Up to 5 per location",
  },
  {
    title: "Fixed Pricing",
    description: "Your price is fixed for 5 years",
  },
];

export default function PricingSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            No hidden fees, no surprises. Just straightforward pricing that
            grows with your business.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Pricing Header */}
            <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-8 text-center">
              <h3 className="text-3xl font-bold mb-2">Restaurant Pricing</h3>
              <p className="text-lg">Everything included, no surprises</p>
            </div>

            {/* Pricing Cards */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PricingNotes.map((note, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {note.title}
                      </h4>
                      <p className="text-2xl font-bold text-primary">
                        {note.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to Transform Your Restaurant's Digital Presence?
                  </h4>
                  <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Join the restaurants already using Know My Menu to increase
                    their visibility and attract more customers.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/list-your-restaurant" passHref>
                      <Button
                        size="lg"
                        className="text-lg px-8 py-4 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Zap className="w-5 h-5 mr-2" />
                        Start Now
                      </Button>
                    </Link>
                    <Link href="/restaurants" passHref>
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-lg px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        <MapPin className="w-5 h-5 mr-2" />
                        See Examples
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Check, X } from "lucide-react";

const features = [
  {
    name: "Menu Discovery",
    kmm: true,
    competitor: false,
    description:
      "Make your restaurant searchable for patrons hunting for the right meal",
  },
  {
    name: "Real-time Menu Updates",
    kmm: true,
    competitor: false,
    description:
      "Update your menu instantly so customers always see the latest offerings and prices",
  },
  {
    name: "Menu Item Photos",
    kmm: true,
    competitor: false,
    description:
      "Showcase actual photos of your dishes to entice and inform diners",
  },
  {
    name: "Detailed Descriptions",
    kmm: true,
    competitor: false,
    description:
      "Provide space for rich, detailed menu item descriptions to help guests choose",
  },
  {
    name: "Website Integration",
    kmm: true,
    competitor: false,
    description: "Easily embed your digital menu into your existing website",
  },
  {
    name: "Dietary Filtering",
    kmm: true,
    competitor: false,
    description:
      "Allow guests to filter menu items by dietary preferences such as vegan, gluten-free, and more",
  },
  {
    name: "Allergen Filtering",
    kmm: true,
    competitor: false,
    description:
      "Enable customers to filter out menu items containing specific allergens",
  },
  {
    name: "Custom Diet Options",
    kmm: true,
    competitor: false,
    description:
      "Create and manage custom dietary options to suit your clientele",
  },
  {
    name: "Menu Analysis",
    kmm: true,
    competitor: false,
    description:
      "Analyze your menu to identify trends, best-sellers, and opportunities for improvement",
  },
  {
    name: "Compliance Reporting",
    kmm: true,
    competitor: false,
    description:
      "Generate reports to help ensure your menu meets regulatory and dietary compliance",
  },
  {
    name: "Search & Showcase Sourcing",
    kmm: true,
    competitor: false,
    description:
      "Highlight and source menu items for special searches and promotions",
  },
  {
    name: "Reduce Risk of Exposure",
    kmm: true,
    competitor: false,
    description:
      "Minimize allergen and dietary risk for guests with clear, filterable information",
  },
  {
    name: "Increase Table Turns",
    kmm: true,
    competitor: false,
    description:
      "Speed up ordering and decision-making to help increase table turnover",
  },
];

export default function FeatureComparison() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose Know My Menu?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're not just another restaurant app. We're the only platform that
            puts your dining preferences first.
          </p>
        </div>

        {/* Improved Comparison Table: Features and Checks Aligned in Rows */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1">
            {/* Table Header */}
            <div className="grid grid-cols-2 bg-gray-50">
              <div className="p-6 flex items-center">
                <h3 className="font-semibold text-lg text-gray-700">
                  Features
                </h3>
              </div>
              <div className="p-6 flex flex-col items-center relative bg-primary text-white">
                <h3 className="font-bold text-xl text-center">
                  ✓ Know My Menu
                </h3>
              </div>
            </div>
            {/* Table Body */}
            <div>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 border-t border-gray-100"
                >
                  {/* Feature Name & Description */}
                  <div className="p-6 flex items-center min-h-[60px]">
                    <div>
                      <div className="font-medium text-gray-900">
                        {feature.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                  {/* KMM Check/X */}
                  <div className="p-6 flex items-center justify-center min-h-[60px] bg-primary/90">
                    {feature.kmm ? (
                      <Check className="w-6 h-6 text-green-300" />
                    ) : (
                      <X className="w-6 h-6 text-red-300" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

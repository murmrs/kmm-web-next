"use client";
import QuoteCarousel from "@/components/quote-carousel";
import Heading from "@/components/typography/heading";
import { Button } from "@/components/ui/button";
import { Faqs } from "@/components/ui/faqs";
import { Check, MapPin, Menu, Shield, X, Zap } from "lucide-react";
import Link from "next/link";

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

const FAQ_SECTIONS = [
  {
    title: "What you get",
    faqs: [
      {
        question: "Personalized Support",
        answer:
          "Susan, our founder, will personally dedicate 6 hours to creating your menus and answering any questions you may have.",
      },
      {
        question: "Onboarding Process",
        answer: "You’ll have 2 weeks to complete the onboarding process.",
      },
      {
        question: "Free Platform Access",
        answer: "Enjoy 1 month of free access to the platform.",
      },
      {
        question: "Referral Bonus",
        answer:
          "Recommend another restaurant that signs up, and you'll get 1 month free.",
      },
    ],
  },
  {
    title: "What we need from you",
    faqs: [
      {
        question: "Enthusiasm and Insight",
        answer:
          "Your input is invaluable. Help us tailor this tool to better serve your diners and attract new ones.",
      },
      {
        question: "Feedback",
        answer:
          "As an early adopter, you'll play a key role in shaping the future of Know My Menu.",
      },
      {
        question: "Social Media Engagement",
        answer:
          "Post 3 times per quarter on social media, highlighting how Know My Menu is benefiting your business.",
      },
      {
        question: "Link Integration",
        answer:
          "Connect your menu to your website, Yelp, Google, and more—anywhere your diners need to see it.",
      },
    ],
  },
];

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

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b to-white via-white from-(--muted) to-60% -my-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/90 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Everything You Need.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Stop paying for features you don't use. Get the complete
              restaurant discovery experience with Know My Menu.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 ">
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
                <p className=" text-lg">Everything included, no surprises</p>
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
                      Join the restaurants already using Know My Menu to
                      increase their visibility and attract more customers.
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
                    {/* <p className="text-sm text-muted-foreground mt-4">
                      ✓ 1 month free access • ✓ Personal onboarding support • ✓
                      No setup fees
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Know My Menu?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're not just another restaurant app. We're the only platform
              that puts your dining preferences first.
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

      {/* Benefits Section */}
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

      {/* Social Proof */}
      <QuoteCarousel />

      {/* CTA Section */}
      {/* <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to improve your restaurant's visibility?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join other restaurants who've are empowering their patrons to find
              and choose the right restaurant, at the right time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/list-your-restaurant" passHref>
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-4"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Onboard your restaurant
                </Button>
              </Link>
              <Link href="/restaurants" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  // className="dark"
                  // className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Browse Restaurants
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {FAQ_SECTIONS.map((section) => (
        <section
          className="container mx-auto px-4 py-12 lg:py-20"
          key={section.title}
        >
          <div className="flex flex-col md:grid md:grid-cols-[400px_1fr] md:gap-24 items-start">
            <Heading className="text-3xl sm:text-4xl md:text-5xl mb-8 md:mb-0 md:sticky md:top-24">
              {section.title}
            </Heading>
            <div className="flex-1">
              <Faqs faqs={section.faqs} openAll={true} />
            </div>
          </div>
        </section>
      ))}
      {/* FAQ Section */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Is Know My Menu really free?
                </h3>
                <p className="text-muted-foreground">
                  Yes! We believe everyone should have access to great
                  restaurant discovery tools. Our platform is completely free to
                  use with no hidden costs.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">
                  How do you make money?
                </h3>
                <p className="text-muted-foreground">
                  We partner with restaurants to help them reach more customers.
                  This allows us to keep the platform free for users while
                  supporting local businesses.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Are the menu items always up to date?
                </h3>
                <p className="text-muted-foreground">
                  We work directly with restaurants to ensure menu information
                  is current. However, we always recommend calling ahead for the
                  most recent updates.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Can I add my restaurant to the platform?
                </h3>
                <p className="text-muted-foreground">
                  Absolutely! We love supporting local restaurants. Contact us
                  to learn how to get your restaurant listed on Know My Menu.
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Is Know My Menu really free?
                </h3>
                <p className="text-muted-foreground">
                  Yes! We believe everyone should have access to great
                  restaurant discovery tools. Our platform is completely free to
                  use with no hidden costs.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">
                  How do you make money?
                </h3>
                <p className="text-muted-foreground">
                  We partner with restaurants to help them reach more customers.
                  This allows us to keep the platform free for users while
                  supporting local businesses.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Are the menu items always up to date?
                </h3>
                <p className="text-muted-foreground">
                  We work directly with restaurants to ensure menu information
                  is current. However, we always recommend calling ahead for the
                  most recent updates.
                </p>
              </div>
              <div className="pb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Can I add my restaurant to the platform?
                </h3>
                <p className="text-muted-foreground">
                  Absolutely! We love supporting local restaurants. Contact us
                  to learn how to get your restaurant listed on Know My Menu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

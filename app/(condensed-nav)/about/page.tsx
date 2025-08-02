import { PageHero } from "@/components/page-hero";
import Heading from "@/components/typography/heading";
import Paragraph from "@/components/typography/paragraph";
import { Faqs } from "@/components/ui/faqs";
import { CtaBlock } from "@/components/cta-block";
import { Heart, Users, Shield, Sparkles, Utensils, Eye } from "lucide-react";
import { Metadata } from "next";

const benefits = [
  {
    icon: Heart,
    title: "Dine with Confidence",
    description:
      "Go out to eat without explaining your dietary needs to everyone at the table",
  },
  {
    icon: Shield,
    title: "Safe Dining for All",
    description:
      "Help your child with food allergies dine safely, without stress or embarrassment",
  },
  {
    icon: Users,
    title: "Private Choices",
    description:
      "Keep your food choices private during business or social meals",
  },
  {
    icon: Sparkles,
    title: "Your Preferences First",
    description:
      "Put your preferences and needs first, in a simple and discreet way",
  },
];

const platformFeatures = [
  {
    icon: Eye,
    title: "Visual Rich Experience",
    description:
      "High-quality photos transform basic menus into enticing visual experiences",
  },
  {
    icon: Utensils,
    title: "Detailed Ingredients",
    description: "Comprehensive ingredient information for every menu item",
  },
  {
    icon: Shield,
    title: "Smart Filtering",
    description:
      "Filter by allergens, dietary restrictions, or lifestyle preferences",
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
        answer: "You'll have 2 weeks to complete the onboarding process.",
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

export const metadata: Metadata = {
  title: "About",
  description:
    "Driven by a passion for using technology as a tool to improve everyday life, founder Susan Abbott created Know My Menu to solve a common, frustrating problem: truly knowing what's in your food.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero heading="About Know My Menu" description="" />

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Heading size="h2" className="text-4xl md:text-5xl font-bold mb-6">
              Our Mission
            </Heading>
            <Paragraph className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Driven by a passion for using technology as a tool to improve
              everyday life, founder Susan Abbott created Know My Menu to solve
              a common, frustrating problem: truly knowing what's in your food.
            </Paragraph>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Heading
                size="h3"
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Transforming the Dining Experience
              </Heading>
              <Paragraph className="text-lg mb-6">
                Our platform transforms a basic menu into a visually rich
                experience with high-quality photos and detailed ingredient
                information. Diners can easily filter by allergens, dietary
                restrictions, or lifestyle preferences, making it easier than
                ever to choose a meal with confidence.
              </Paragraph>
              <Paragraph className="text-lg">
                Know My Menu empowers chefs, restaurateurs, and guests to focus
                on what really matters: creating, serving, and enjoying great
                food.
              </Paragraph>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {platformFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Heading size="h2" className="text-4xl md:text-5xl font-bold mb-6">
              It's About
            </Heading>
            <Paragraph className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you're drawn to the beautiful photos, clear ingredient
              info, or personalized filters, Know My Menu is here to keep you in
              the know.
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Callout Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="w-full flex justify-center">
            <div className="flex flex-col md:flex-row items-stretch w-full max-w-5xl rounded-xl bg-primary/10 gap-0 shadow-md overflow-hidden">
              <div className="w-full md:w-[480px] flex-shrink-0 flex items-stretch">
                <div className="relative w-full aspect-video flex-1">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/ECTTxit2_9c?si=17x929jHf_wFuEXa"
                    title="About Know My Menu"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start p-8 justify-center">
                <Heading size="h3" className="mb-2">
                  Know More About Our Founder on the Restaurant Unstoppable
                  Podcast!
                </Heading>
                <Paragraph className="max-w-xl">
                  Find out how Susan is helping more people dine out with less
                  frustration—for kitchens, servers, and patrons.
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBlock
        className="-mb-12"
        heading="Your food, just the way you want it"
        text="Get started with Know My Menu"
        buttonText="Explore Restaurants"
        buttonLink="/restaurants"
      />
    </>
  );
}

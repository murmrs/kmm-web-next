import Heading from "@/components/typography/heading";
import { Faqs } from "@/components/ui/faqs";

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

export default function PricingFAQ() {
  return (
    <>
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
    </>
  );
}

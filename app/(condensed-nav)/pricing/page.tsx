import { PageHero } from "@/components/page-hero";
import Heading from "@/components/typography/heading";
import Paragraph from "@/components/typography/paragraph";
import { Faqs } from "@/components/ui/faqs";
import { CtaBlock } from "@/components/cta-block";

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
        question: "Additional Free Months",
        answer:
          "For every 1,000 new restaurants that join, you'll receive an additional free month.",
      },
      {
        question: "Referral Bonus",
        answer:
          "You’ll have priority access to our support team, ensuring your questions are answered promptly.",
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

export default function PricingPage() {
  return (
    <>
      <PageHero heading="Pricing" />
      <div className="flex-1 px-12 container">
        <div className="">
          {/* <Heading size="pageTitle" className="mb-12">
        Frequently Asked Questions
      </Heading> */}

          <section className="grid grid-cols-[400px_1fr] gap-24 items-start pb-24">
            <Heading className="text-5xl sticky top-24">
              Why we need you
            </Heading>
            <div className="flex-1">
              <Paragraph>
                We need restaurants to make this happen. Diners can’t search if
                there are no restaurants on the platform. As we continue to
                develop the Know My Menu APP, with enhanced search features and
                richer information for patrons, we're offering the following
                incentives for our early adopters.
              </Paragraph>
            </div>
          </section>
          {FAQ_SECTIONS.map((section) => (
            <section className="grid grid-cols-[400px_1fr] gap-24 items-start pb-24">
              <Heading className="text-5xl sticky top-24">
                {section.title}
              </Heading>
              <div className="flex-1">
                <Faqs faqs={section.faqs} openAll={true} />
              </div>
            </section>
          ))}
          {/* <div className="flex flex-col items-center justify-center h-screen"> */}
          {/* <h1 className="text-4xl font-bold">Pricing</h1> */}
          {/* </div> */}
        </div>
      </div>
      <CtaBlock className="-mb-12" />
    </>
  );
}

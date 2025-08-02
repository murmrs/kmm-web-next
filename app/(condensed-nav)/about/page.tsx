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

export default function PricingPage() {
  return (
    <>
      <PageHero heading="About Know My Menu" description="" />
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

          {/* Video Callout Section */}
          <section className="w-full flex justify-center ">
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
          </section>
        </div>
      </div>
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

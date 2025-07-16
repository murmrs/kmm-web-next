import { Hero } from "@/components/hero";
import { MarqueeBanner } from "@/components/marquee-banner";
import { RestaurantList } from "@/components/restaurant-list";
import { TagCloud } from "@/components/tag-cloud";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import Heading from "@/components/typography/heading";
import Header from "@/components/header";
import HeadingIntroText from "@/components/heading-intro-text";
import Paragraph from "@/components/typography/paragraph";

export default function Home() {
  return (
    <>
      {/* <Header searchIntroText="Ready to know your menu?" className="dark" /> */}
      <Header
        centerComponent={
          <div className="max-w-2xl mx-auto w-full mt-42 mb-32 text-center">
            <HeadingIntroText className="mb-4" />
            <SearchBar />
            <Paragraph className="text-foreground max-w-lg mx-auto mt-5 leading-6">
              Whether you're searching for a quick bite, or your new favorite
              spot, we're empowering you to find the best food for you.
            </Paragraph>
          </div>
        }
        expanded={true}
        backgroundImage="/hero.jpg"
      />
      <RestaurantList className="mt-12" />
      <MarqueeBanner />
      {/* <TagCloud /> */}
      <Footer />
    </>
  );
}

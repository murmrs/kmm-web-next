import { Footer } from "@/components/footer";
import Header from "@/components/header";
import HeadingIntroText from "@/components/heading-intro-text";
import { MarqueeBanner } from "@/components/marquee-banner";
import { RestaurantList } from "@/components/restaurant-list";
import { SearchBar } from "@/components/search-bar";
import { SearchSheet } from "@/components/search-sheet";
import Paragraph from "@/components/typography/paragraph";

export default function Home() {
  return (
    <>
      {/* <Header searchIntroText="Ready to know your menu?" className="dark" /> */}
      <Header
        centerComponent={
          <>
            <div className="hidden lg:block max-w-2xl mx-auto w-full mt-42 mb-32 text-center">
              <HeadingIntroText className="mb-4" />
              <SearchBar />
              <Paragraph className="text-foreground max-w-lg mx-auto mt-5 leading-6">
                Whether you&apos;re searching for a quick bite, or your new
                favorite spot, we&apos;re empowering you to find the best food
                for you.
              </Paragraph>
            </div>
            <div className="block lg:hidden mt-16 mb-16 w-full">
              <HeadingIntroText className="mb-4" />
              <SearchSheet />
              <Paragraph className="text-center text-foreground max-w-lg mx-auto mt-5 leading-6">
                Whether you&apos;re searching for a quick bite, or your new
                favorite spot, we&apos;re empowering you to find the best food
                for you.
              </Paragraph>
              {/* <SearchBar /> */}
            </div>
          </>
        }
        expanded={true}
        backgroundImage="/hero.jpg"
      />
      <RestaurantList className="sm:mt-12" />
      <MarqueeBanner />
      {/* <TagCloud /> */}
      <Footer />
    </>
  );
}

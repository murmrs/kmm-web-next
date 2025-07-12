import { Hero } from "@/components/hero";
import { Header } from "@/components/header";
import { MarqueeBanner } from "@/components/marquee-banner";
import { RestaurantList } from "@/components/restaurant-list";
import { TagCloud } from "@/components/tag-cloud";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      {/* <Hero /> */}
      <RestaurantList />
      {/* <RestaurantList /> */}
      {/* <RestaurantList /> */}

      <MarqueeBanner />
      <TagCloud />
      <Footer />
    </>
  );
}

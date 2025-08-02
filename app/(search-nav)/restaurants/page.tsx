import SearchPage from "@/components/search-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Restaurants",
  description:
    "Explore restaurants on Know My Menu and find the perfect place to eat.",
};

export default function Search() {
  return <SearchPage />;
}

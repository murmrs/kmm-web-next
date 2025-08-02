import ListYourRestaurantForm from "@/components/list-your-restaurant-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Your Restaurant",
  description: "List your restaurant on Know My Menu",
};

export default function ListYourRestaurant() {
  return (
    <div className="container">
      <ListYourRestaurantForm />
    </div>
  );
}

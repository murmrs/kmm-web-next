import { Restaurant } from "@/config/typesense";
import { typesenseConfig } from "@/lib/typesense";
import Typesense from "typesense";

const client = new Typesense.Client(typesenseConfig);

export const syncRestaurants = async () => {
  // Fetch all restaurants from the database (https://api.knowmymenu.com/v1/public/locations/)
  const response = await fetch(
    "https://api.knowmymenu.com/v1/public/locations/"
  );
  const data: {
    payload: LocationSearchResult;
  } = await response.json();
  //   console.log(data);

  const restaurants: Restaurant[] = data.payload.entities.map((restaurant) => ({
    id: restaurant.id.toString(),
    slug: restaurant.id.toString(),
    name: restaurant.name,
    description: restaurant.description,
    cuisine: restaurant.categories,
    dietary: [],
    corkage_fee: restaurant.corkageFee,
    dogs_ok: restaurant.dogsOk,
    accepts_reservations: restaurant.reservations === "yes",
    accepts_events: restaurant.displayEvents,
    price_range: restaurant.priceRangeResponse.min.toString(),
    price_range_max: restaurant.priceRangeResponse.max,
    price_range_min: restaurant.priceRangeResponse.min,
    location: [restaurant.latitude, restaurant.longitude],
    city: restaurant.city,
    state: restaurant.state,
    country: restaurant.country,
    address: restaurant.address1,
    phone: restaurant.phoneNumber,
    website: restaurant.website || "",
    image_url: restaurant.image?.url || "",
    image_url_alt: restaurant.image?.description || "",
    email: "",
  }));

  console.log(restaurants[0]);

  //   Create item in collection

  try {
    const result = await client
      .collections("restaurants")
      .documents()
      .import(restaurants, {
        action: "upsert",
      });
    console.log(result);
  } catch (error: any) {
    console.error(error.importResults);
  }
};

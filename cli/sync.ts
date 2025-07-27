import { Restaurant } from "@/config/typesense";
import { LocationSearchResult, SummaryResult } from "@/types/location-result";
import "@dotenvx/dotenvx/config";
import { writeFileSync } from "fs";

// import { typesenseConfig } from "@/lib/typesense";
// import Typesense from "typesense";

// const client = new Typesense.Client(typesenseConfig);

export const syncRestaurants = async () => {
  console.log("Syncing restaurants", process.env.NEXT_PUBLIC_API_URL);
  // Fetch all restaurants from the database (https://api.knowmymenu.com/v1/public/locations/)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`);
  const data: {
    payload: LocationSearchResult;
  } = await response.json();
  console.log(data);

  // For each restaurant, fetch its summary from /v1/public/locations/:id/summary

  const restaurants: Restaurant[] = await Promise.all(
    data.payload.entities.map(async (restaurant) => {
      let summary = null;
      console.log("Fetching summary for restaurant: ", restaurant.id);
      try {
        const summaryRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/locations/${restaurant.id}/summary`
        );
        if (summaryRes.ok) {
          const data = (await summaryRes.json()) as {
            payload: SummaryResult;
          };
          summary = data.payload;
          // console.log("Summary: ", JSON.stringify(summary, null, 2));
        }
      } catch (e) {
        // If summary fetch fails, just continue
        summary = null;
      }

      // Collect all daps from all menus
      const allDaps = summary?.entity.menus.flatMap((menu) => menu.daps) || [];
      // Aggregate by dap name: if name is unique, keep as is; if duplicate, sum counts
      const dapMap = new Map<
        string,
        { name: string; nonOptionalCount: number; optionalCount: number }
      >();
      for (const dap of allDaps) {
        if (dapMap.has(dap.name)) {
          const existing = dapMap.get(dap.name)!;
          existing.nonOptionalCount += dap.nonOptionalCount;
          existing.optionalCount += dap.optionalCount;
        } else {
          dapMap.set(dap.name, {
            name: dap.name,
            nonOptionalCount: dap.nonOptionalCount,
            optionalCount: dap.optionalCount,
          });
        }
      }
      const menuDaps = Array.from(dapMap.values());

      // console.log("Menu Daps: ", { menuDaps, id: restaurant.id });

      return {
        id: restaurant.id.toString(),
        slug: restaurant.id.toString(),
        name: restaurant.name,
        description: restaurant.description,
        cuisine: restaurant.categories,
        category: restaurant.categories,
        dietary: [],
        corkage_fee: restaurant.corkageFee,
        dogs_ok: restaurant.dogsOk,
        accepts_reservations: restaurant.reservations === "yes",
        accepts_events: restaurant.displayEvents,
        price_range: restaurant.priceRangeResponse.min,
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
        // menuDaps,
        // Optionally, you can add summary fields here if needed, e.g.:
        summary: summary,
      };
    })
  );

  writeFileSync(
    "restaurant_sample.json",
    JSON.stringify(restaurants[0], null, 2)
  );

  //   Create item in collection

  // try {
  //   const result = await client
  //     .collections("restaurants")
  //     .documents()
  //     .import(restaurants, {
  //       action: "upsert",
  //     });
  //   console.log(result);
  // } catch (error: any) {
  //   console.error(error.importResults);
  // }
};

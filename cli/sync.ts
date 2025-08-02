import { Restaurant } from "@/config/typesense";
import { LocationSearchResult, SummaryResult } from "@/types/location-result";
import "@dotenvx/dotenvx/config";
import { writeFileSync } from "fs";

import { typesenseConfig } from "@/lib/typesense";
import Typesense from "typesense";

const client = new Typesense.Client(typesenseConfig);

export const syncRestaurants = async () => {
  console.log("Syncing restaurants", process.env.NEXT_PUBLIC_API_URL);
  // Fetch all restaurants from the database (https://api.knowmymenu.com/v1/public/locations/)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`);
  const data: {
    payload: LocationSearchResult;
  } = await response.json();
  // console.log(data);

  // For each restaurant, fetch its summary from /v1/public/locations/:id/summary

  const restaurants: Restaurant[] = await Promise.all(
    data.payload.entities.map(async (restaurant) => {
      let summary = null;
      // console.log("Fetching summary for restaurant: ", restaurant.id);
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

      // Collect all daps from all the menus, add nonOptionalComplianceCount together for each dap. Eg [{name: "Vegan", total: 29}]
      let menuDaps: string[] = [];
      if (summary && summary.entity && Array.isArray(summary.entity.menus)) {
        const dapTotals: Record<string, number> = {};
        summary.entity.menus.forEach((menu) => {
          if (Array.isArray(menu.daps)) {
            menu.daps.forEach((dap) => {
              if (dap && dap.name) {
                dapTotals[dap.name] =
                  (dapTotals[dap.name] || 0) +
                  (dap.nonOptionalComplianceCount || 0);
              }
            });
          }
        });
        menuDaps = Object.entries(dapTotals)
          .map(([name, total]) => ({
            name,
            total,
          }))
          .filter((dap) => dap.total > 3)
          .map((dap) => dap.name);
      }

      return {
        id: restaurant.id.toString(),
        slug: restaurant.id.toString(),
        name: restaurant.name,
        description: restaurant.description,
        cuisine: restaurant.cuisines.map((c) => ({
          id: c.id,
          name: c.name,
          primary: c.primaryCuisine,
        })),
        category: restaurant.categories,
        corkage_fee: restaurant.corkageFee,
        dogs_ok: restaurant.dogsOk,
        accepts_reservations: restaurant.reservations === "yes",
        accepts_events: restaurant.displayEvents,
        price_range_max: restaurant.priceRangeResponse.max,
        price_range_min: restaurant.priceRangeResponse.min,
        location: [restaurant.latitude, restaurant.longitude],
        city: restaurant.city,
        state: restaurant.state,
        country: restaurant.country,
        address: restaurant.address1,
        locale: [restaurant.country, restaurant.state, restaurant.city],
        phone: restaurant.phoneNumber ?? "",
        website: restaurant.website || "",
        image_url: restaurant.image?.url || "",
        image_url_alt: restaurant.image?.description || "",
        email: "",
        dap_compliance: menuDaps,
      } as Restaurant;
    })
  );

  //   Create item in collection

  try {
    // Delete all documents in the collection
    console.log("Deleting all documents in the collection");
    await client.collections("restaurants").documents().delete({
      filter_by: "id:*",
    });

    // Import the new documents
    console.log("Importing new documents", restaurants.length);
    const result = await client
      .collections("restaurants")
      .documents()
      .import(restaurants, {
        action: "upsert",
      });
    // console.log("Imported documents", result);
  } catch (error: any) {
    // console.log("Error importing documents", error);
    console.error(error.importResults);
  }
};

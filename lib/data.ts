"use server";

import { LocationResult, LocationSearchResult } from "@/types/location-result";
import { cache } from "react";

export const fetchRestaurant = cache(async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/locations/${id}`
    );
    const data = await res.json();

    if (res.ok) {
      return data.payload.entity as LocationResult;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
});

export const getAllRestaurantIds = cache(async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`);
  const data = (await res.json()).payload as LocationSearchResult;
  return data.entities.map((entity: LocationResult) => entity.id.toString());
});

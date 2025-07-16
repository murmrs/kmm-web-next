import Details from "@/components/restaurants/details";
import { fetchRestaurant } from "@/lib/data";
import type { LocationResult } from "@/types/location-result";

interface RestaurantPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { id } = await params;
  const data = await fetchRestaurant(id);
  return <Details className="-mt-12" location={data || undefined} />;
}

export async function generateStaticParams() {
  const { getAllRestaurantIds } = await import("@/lib/data");
  const ids: string[] = await getAllRestaurantIds();
  return ids.map((id) => ({ id }));
}

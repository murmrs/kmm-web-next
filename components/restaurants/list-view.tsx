"use client";

import { useHits } from "react-instantsearch";
import { RestaurantCard } from "./restaurant-card";
import { Restaurant } from "@/config/typesense";

const ListView = () => {
  const { items } = useHits<Restaurant>();
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <RestaurantCard key={item.objectID} location={item} />
      ))}
    </div>
  );
};

export default ListView;

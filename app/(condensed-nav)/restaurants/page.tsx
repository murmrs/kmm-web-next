"use client";

import ListView from "@/components/restaurants/list-view";
import MapView from "@/components/restaurants/map-view";
import Heading from "@/components/typography/heading";
import Paragraph from "@/components/typography/paragraph";
import { Restaurant } from "@/config/typesense";
import { useState } from "react";
import { useHits } from "react-instantsearch";

export default function Search() {
  const [view, setView] = useState<"list" | "map">("list");
  const { items } = useHits<Restaurant>();
  return (
    <div className="px-12 flex-1">
      {/* <Paragraph className="text-right -mt-14 text-sm">
        {items.length} restaurants found
      </Paragraph> */}
      {/* <hr className="mt-0 pb-8" /> */}
      <div className="flex gap-8">
        {/* <div className="w-2/3"> */}
        <ListView />
        {/* </div> */}
        <div className="w-full">
          <MapView />
        </div>
      </div>
    </div>
  );
}

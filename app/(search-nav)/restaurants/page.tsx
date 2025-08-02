"use client";

import ListView from "@/components/restaurants/list-view";
import MapView from "@/components/restaurants/map-view";
import Heading from "@/components/typography/heading";
import Paragraph from "@/components/typography/paragraph";
import { Restaurant } from "@/config/typesense";
import { useRef, useState } from "react";
import { useHits } from "react-instantsearch";

export default function Search() {
  const [view, setView] = useState<"list" | "map">("list");
  const [mapKey, setMapKey] = useState(0); // Add key for forcing map reload
  const { items } = useHits<Restaurant>();

  // Function to handle view switching with map reload
  const handleViewChange = (newView: "list" | "map") => {
    if (newView === "map" && view !== "map") {
      // Force map reload when switching to map view
      setMapKey((prev) => prev + 1);
    }
    setView(newView);
  };

  return (
    <div className="px-12 flex-1 mb-8">
      {/* Mobile view switcher */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <Paragraph className="text-left mt-0 text-sm">
          {items.length} restaurants found
        </Paragraph>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              view === "list"
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
            }`}
            onClick={() => handleViewChange("list")}
            aria-pressed={view === "list"}
          >
            List
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              view === "map"
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
            }`}
            onClick={() => handleViewChange("map")}
            aria-pressed={view === "map"}
          >
            Map
          </button>
        </div>
      </div>
      <div className="flex gap-8">
        {/* ListView: show on desktop or when selected on mobile */}
        <div
          className={`w-full ${view === "list" ? "block" : "hidden"} lg:block`}
        >
          {/* On desktop, always show; on mobile, show if selected */}
          <ListView />
        </div>
        {/* MapView: show on desktop or when selected on mobile */}
        <div
          className={`w-full ${
            view === "map" ? "block" : "hidden"
          } lg:block min-h-[calc(100vh-200px)] max-h-[calc(100vh-200px)] sticky top-32`}
        >
          <div className="hidden lg:block">
            <Paragraph className="text-left mt-0 text-sm">
              {items.length} restaurants found
            </Paragraph>
          </div>
          <MapView key={mapKey} />
        </div>
      </div>
    </div>
  );
}

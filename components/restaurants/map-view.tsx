"use client";

import { useHits } from "react-instantsearch";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Restaurant } from "@/config/typesense";

// Set your Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

const MapView = () => {
  const { items } = useHits<Restaurant>();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  console.log(items);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize the map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-122.4194, 37.7749], // San Francisco default
      zoom: 10,
      scrollZoom: false, // Disable scroll input
    });

    map.current.on("load", () => {
      console.log("map loaded");
      map.current?.resize();
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers when items change
  useEffect(() => {
    if (!map.current || !items.length) return;

    // Remove existing markers
    const existingMarkers = document.querySelectorAll(".mapboxgl-marker");
    existingMarkers.forEach((marker) => marker.remove());

    const bounds = new mapboxgl.LngLatBounds();

    // Add markers for each restaurant
    items.forEach((item) => {
      if (item.location) {
        const lngLat = [item.location[1], item.location[0]] as [number, number];

        // Create a custom marker element
        const markerEl = document.createElement("div");
        markerEl.className = "restaurant-marker";
        markerEl.style.width = "20px";
        markerEl.style.height = "20px";
        markerEl.style.borderRadius = "50%";
        markerEl.style.backgroundColor = "#3b82f6";
        markerEl.style.border = "2px solid white";
        markerEl.style.cursor = "pointer";
        markerEl.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-2">
            <h3 class="font-semibold text-sm">${item.name || "Restaurant"}</h3>
            <p class="text-xs text-gray-600">${item.cuisine || ""}</p>
            <p class="text-xs text-gray-600">${item.address || ""}</p>
          </div>
        `);

        console.log("Use effect item", item);

        // Add marker to map
        if (map.current && lngLat) {
          new mapboxgl.Marker(markerEl)
            .setLngLat(lngLat)
            .setPopup(popup)
            .addTo(map.current);
          bounds.extend(lngLat);
          map.current?.resize();
        }
      }
    });

    // Fit map to show all markers if there are any
    if (items.length > 0) {
      if (!bounds.isEmpty() && map.current) {
        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15,
        });
      }
    }
  }, [items]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden sticky top-0">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default MapView;

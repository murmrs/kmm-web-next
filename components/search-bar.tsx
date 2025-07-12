"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import instantsearch from "instantsearch.js";
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  DynamicWidgets,
  ToggleRefinement,
} from "react-instantsearch";

import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { typesenseConfig } from "@/lib/typesense";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: typesenseConfig,
  additionalSearchParameters: {
    query_by: "name,cuisine,dietary,city,state,address",

    // disjunctiveFacets: ["accepts_events"],
    // disjunctiveFacetsRefinements: {
    //   accepts_events: ["true"],
    // },
  },
});

const searchClient = typesenseInstantsearchAdapter.searchClient;

const SearchButton = ({
  tab,
  label,
  onClick,
  className,
  children,
  active,
}: {
  tab: string;
  label: string;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  children?: React.ReactNode;
  active?: boolean;
}) => {
  return (
    <div className="relative w-full">
      <button
        className={cn(
          "bg-transparent border-none py-3 text-left  inline-flex items-center px-5 hover:rounded-md w-full hover:bg-primary/20 transition-colors",
          active && "bg-primary/20 rounded-md group-hover:bg-transparent",
          className
        )}
        data-search-button="true"
        onClick={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
      >
        <Search className="mr-2 h-4 w-4" />
        {label}
      </button>
      {children}
    </div>
  );
};

export function SearchBar({ showIntro = false }: { showIntro?: boolean }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("");

  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietary, setDietary] = useState("");

  // Add state to track heights of each refinement list
  const [heights, setHeights] = useState({
    location: 200,
    cuisine: 200,
    dietary: 200,
  });

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log("Searching with:", { location, cuisine, dietary });
    setIsSearchOpen(false);
  };

  const handleClick = useCallback(
    (newTab: string) => {
      if (newTab !== tab) {
        setTab(newTab);
        !isOpen && setIsOpen(true);
      }
    },
    [isOpen, tab]
  );

  const handleClose = useCallback((open: boolean) => {
    if (!open) {
      setIsOpen(false);
      setTab("");
    }
  }, []);

  // Function to update height when refinement list content changes
  const updateHeight = useCallback((tabName: string, height: number) => {
    setHeights((prev) => ({
      ...prev,
      [tabName]: height,
    }));
  }, []);

  // Get current height based on active tab
  const currentHeight = tab ? heights[tab as keyof typeof heights] : 200;

  // Create refs for each refinement list
  const locationRef = useRef<HTMLDivElement>(null);
  const cuisineRef = useRef<HTMLDivElement>(null);
  const dietaryRef = useRef<HTMLDivElement>(null);

  // Effect to measure and update heights when content changes
  useEffect(() => {
    const measureHeight = () => {
      if (locationRef.current) {
        const height = locationRef.current.scrollHeight;
        updateHeight("location", Math.max(height, 200));
      }
      if (cuisineRef.current) {
        const height = cuisineRef.current.scrollHeight;
        updateHeight("cuisine", Math.max(height, 200));
      }
      if (dietaryRef.current) {
        const height = dietaryRef.current.scrollHeight;
        updateHeight("dietary", Math.max(height, 200));
      }
    };

    // Measure after a short delay to ensure content is rendered
    const timeoutId = setTimeout(measureHeight, 100);
    return () => clearTimeout(timeoutId);
  }, [updateHeight]);

  const handleClickOutside = useCallback(
    (e) => {
      // Don't fire if the click intersects with any of the buttons
      const target = e.target as HTMLElement;
      // Check if the click is inside a SearchButton or its children
      if (
        target.closest &&
        target.closest('button[data-search-button="true"]')
      ) {
        return;
      }

      if (isOpen) {
        setIsOpen(false);
        setTab("");
      }
    },
    [isOpen]
  );

  return (
    <InstantSearch
      indexName="restaurants"
      searchClient={searchClient}
      initialUiState={{
        restaurants: {
          toggle: {
            accepts_events: true,
          },
        },
      }}
    >
      <div className="w-full max-w-3xl pb-12">
        {showIntro && (
          <h1 className="text-center text-5xl font-bold text-foreground mb-8 max-w-2xl mx-auto mt-24">
            Search for a location, cuisine, or dietary preference
          </h1>
        )}
        <Popover open={isOpen}>
          <PopoverAnchor asChild>
            <div className="relative w-full max-w-3xl mx-auto bg-muted rounded-md flex my-8 overflow-hidden group">
              <SearchButton
                tab="location"
                label="Location"
                // onClick={() => console.log("clicked")}
                onClick={() => handleClick("location")}
                className="flex-2"
                active={tab === "location"}
              />
              <SearchButton
                tab="cuisine"
                label="Cuisine"
                onClick={() => handleClick("cuisine")}
                className="flex-1"
                active={tab === "cuisine"}
              />
              <SearchButton
                tab="dietary"
                label="Dietary"
                onClick={() => handleClick("dietary")}
                className="pr-28"
                active={tab === "dietary"}
              >
                <Button className="ml-auto absolute right-4 top-1/2 -translate-y-1/2">
                  Search
                </Button>
              </SearchButton>
            </div>
          </PopoverAnchor>
          <PopoverContent
            align="start"
            style={{ width: "var(--radix-popover-trigger-width)" }}
            className="w-full max-w-3xl mx-auto"
            onPointerDownOutside={handleClickOutside}
          >
            <div className="overflow-hidden">
              <div
                className="grid grid-cols-[repeat(3,100%)]  transition-transform duration-300 grid-rows-[0fr]"
                style={{
                  transform:
                    tab === "location"
                      ? "translateX(0%)"
                      : tab === "cuisine"
                      ? "translateX(-100%)"
                      : tab === "dietary"
                      ? "translateX(-200%)"
                      : "translateX(0%)",
                }}
              >
                <div className="col-span-1 min-h-0">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium">Popular Locations</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 cursor-pointer transition">
                      <span className="font-medium">California</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 cursor-pointer transition">
                      <span className="font-medium">Utah</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 min-h-0">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium">Popular Cuisines</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 cursor-pointer transition">
                      <span className="font-medium">Italian</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 cursor-pointer transition">
                      <span className="font-medium">Italian</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 cursor-pointer transition">
                      <span className="font-medium">Italian</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 min-h-0">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium">
                      Popular Dietary Restrictions
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* <SearchBox /> */}
        {/* <Hits /> */}

        {/* <ToggleRefinement attribute="address.city" label="City" on={true} /> */}
        {/* <ToggleRefinement
          attribute="corkage_fee"
          label="Corkage Fee"
          on={true}
        />
        <ToggleRefinement attribute="dogs_ok" label="Dogs OK" on={true} />
        <ToggleRefinement
          attribute="accepts_reservations"
          label="Accepts Reservations"
          on={true}
        />

        <ToggleRefinement
          attribute="accepts_events"
          label="Accepts Events"
          on={true}
        /> */}
      </div>
    </InstantSearch>
  );
}

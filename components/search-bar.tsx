"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { Filter, Search } from "lucide-react";
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
  },
});

const searchClient = typesenseInstantsearchAdapter.searchClient;

const PopularLocations = [
  {
    name: "Utah",
    key: "UT",
    image: "/locations/utah.jpg",
  },
  {
    name: "California",
    key: "CA",
    image: "/locations/california.jpg",
  },
];

const sections: {
  name: string;
  label?: string;
  key: string;
  type: "single" | "multi";
  items: { name: string; key: string; image: string }[];
  height: number;
  width: number | "full";
}[] = [
  {
    name: "location",
    label: "Popular Locations",
    key: "state",
    type: "single",
    items: PopularLocations,
    height: 240,
    width: 300,
  },
  {
    name: "cuisine",
    label: "Popular Cuisines",
    key: "cuisine",
    items: [],
    type: "multi",
    height: 300,
    width: "full",
  },
  {
    name: "dietary",
    key: "dietary",
    items: [],
    type: "multi",
    height: 300,
    width: "full",
  },
];

const SearchButton = ({
  tab,
  label,
  onClick,
  className,
  children,
  active,
  text,
}: {
  tab: string;
  label: string;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  children?: React.ReactNode;
  active?: boolean;
  text?: string;
}) => {
  return (
    <div className="relative w-full">
      <button
        className={cn(
          "bg-transparent dark:bg-accent-foreground border-none py-3 text-left  inline-flex items-center px-5 hover:rounded-md w-full hover:bg-primary/20  transition-colors text-muted-foreground",
          active && "bg-primary/20 rounded-md group-hover:bg-transparent",
          text && "text-foreground dark:text-black",
          className
        )}
        data-search-button="true"
        onClick={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
      >
        <Search className="mr-2 h-4 w-4" />
        {text || label}
      </button>
      {children}
    </div>
  );
};

export function SearchBar({
  introText,
  condensed,
  className,
}: {
  introText?: string;
  condensed?: boolean;
  className?: string;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("");
  const [popoverOffset, setPopoverOffset] = useState(0);

  const [width, setWidth] = useState<number | "full">("full");
  const [height, setHeight] = useState<number>(0);

  const [location, setLocation] = useState("");
  const [locationText, setLocationText] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietary, setDietary] = useState("");

  const anchorRef = useRef<HTMLDivElement>(null);

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
    (e: React.MouseEvent, newTab: string) => {
      const section = sections.find((section) => section.name === newTab);
      if (section) {
        setWidth(section.width);
        setHeight(section.height);
        console.log("Section", { section, width, height });
      }

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
      <div className="flex gap-4">
        <div
          className={cn("w-full", !condensed && "max-w-3xl pb-12", className)}
        >
          {introText && (
            <h1
              className={cn(
                "text-center text-5xl font-bold text-foreground mb-8 max-w-2xl mx-auto mt-[15vh] dark"
              )}
            >
              {introText}
            </h1>
          )}
          <Popover open={isOpen}>
            <PopoverAnchor asChild ref={anchorRef}>
              <div
                className={cn(
                  "relative w-full  mx-auto bg-muted rounded-md flex overflow-hidden group",
                  !condensed && " max-w-3xl my-8"
                )}
              >
                <SearchButton
                  tab="location"
                  label="Location"
                  text={locationText}
                  // onClick={() => console.log("clicked")}
                  onClick={(e) => handleClick(e, "location")}
                  className="flex-2"
                  active={tab === "location"}
                />
                <SearchButton
                  tab="cuisine"
                  label="Cuisine"
                  text={cuisine}
                  onClick={(e) => handleClick(e, "cuisine")}
                  className="flex-1"
                  active={tab === "cuisine"}
                />
                <SearchButton
                  tab="dietary"
                  label="Dietary"
                  text={dietary}
                  onClick={(e) => handleClick(e, "dietary")}
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
              alignOffset={popoverOffset}
              style={{
                width:
                  width === "full"
                    ? "var(--radix-popover-trigger-width)"
                    : `${width}px`,
                height: `${height}px`,
              }}
              className="w-full mx-auto transition-all duration-300"
              onPointerDownOutside={handleClickOutside}
            >
              <div className="overflow-hidden">
                <div
                  className="grid grid-cols-[repeat(3,100%)]  transition-transform duration-300"
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
                  {sections.map((section) => (
                    <div
                      key={section.key}
                      className="col-span-1 min-h-0 h-max"
                      id={section.key}
                    >
                      <div className="flex flex-col gap-2 mb-3">
                        <h3 className="text-md font-medium">{section.label}</h3>
                      </div>
                      {section.type === "single" && (
                        <div className="grid grid-cols-1 gap-3">
                          {section.items.map((item) => (
                            <div
                              key={item.name}
                              className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 cursor-pointer transition"
                              onClick={() => {
                                setLocation(item.key);
                                setLocationText(item.name);
                                // setIsOpen(false);
                              }}
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="size-16 rounded-md object-cover"
                              />
                              <span className="font-medium">{item.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {section.type === "multi" && (
                        <div className="grid grid-cols-2 gap-3">
                          {section.items.map((item) => (
                            <div key={item.name}>{item.name}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {condensed && (
          <Button variant="outline" className="h-auto border-none">
            <Filter className="h-5 w-5" /> Filter
          </Button>
        )}
      </div>
    </InstantSearch>
  );
}

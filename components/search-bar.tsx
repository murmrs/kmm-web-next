"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { Filter, Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DynamicWidgets,
  SearchBoxProps,
  ToggleRefinementProps,
  useCurrentRefinements,
  // SearchBox,
  useRefinementList,
  useSearchBox,
  useToggleRefinement,
} from "react-instantsearch";

import { RefinementListItem } from "instantsearch.js/es/connectors/refinement-list/connectRefinementList";
import Image from "next/image";
import Link from "next/link";
import { badgeVariants } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";

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
    height: 220,
    width: 300,
  },
  {
    name: "cuisine",
    label: "Popular Cuisines",
    key: "cuisine",
    items: [
      {
        name: "American",
        key: "american",
        image: "/cuisines/american.jpg",
      },
      {
        name: "Irish",
        key: "irish",
        image: "/cuisines/irish.jpg",
      },
      {
        name: "Tiki",
        key: "tiki",
        image: "/cuisines/tiki.jpg",
      },
      {
        name: "Mexican",
        key: "mexican",
        image: "/cuisines/mexican.jpg",
      },
    ],
    type: "multi",
    height: 200,
    width: "full",
  },
  {
    name: "dietary",
    key: "dietary",
    label: "Popular Dietary Restrictions",
    items: [],
    type: "multi",
    height: 200,
    width: "full",
  },
];

const SearchInput = ({
  search,
  onClick,
  label,
  attribute,
  className,
}: {
  search: (query: string) => void;
  items: RefinementListItem[];
  onClick: (e: React.MouseEvent) => void;
  label: string;
  attribute: string;
  className?: string;
}) => {
  // Get active refinments`

  const currentRefinements = useCurrentRefinements({
    includedAttributes: [attribute],
  });

  const currentRefinementsItems = currentRefinements.items.flatMap(
    (item) => item.refinements
  );

  const count = currentRefinementsItems.length;

  const test = "hello world";

  // const two = "two";
  const bool: boolean = "hello";

  const labelText = useMemo(() => {
    if (count === 0) return label;
    if (count >= 1) return `${label} (${count})`;
    return `${label} (${count})`;
  }, [count, label]);

  return (
    <>
      <div
        className={cn(
          "relative w-full bg-muted dark:bg-white rounded-md overflow-hidden flex items-center gap-2",
          className
        )}
      >
        {/* {currentRefinementsItems.length > 0 ? (
          <div className="flex flex-col items-center my-2 relative">
            <p className="absolute text-sm text-muted-foreground mt-1 -top-5">
              {label}
            </p>
            <div className="flex text-ellipsis items-center gap-2 bg-muted dark:bg-accent-foreground w-full">
              {currentRefinementsItems.map((refinement) => (
                <Badge
                  key={refinement.value}
                  className="cursor-pointer"
                  onClick={() => handleRefinementClick(refinement)}
                >
                  {refinement.label}
                  <X className="ml-2 h-4 w-4" />
                </Badge>
              ))}
            </div>
          </div>
        ) : ( */}
        <div className="relative flex-1">
          <input
            className={cn(
              "bg-muted dark:bg-accent-foreground border-none py-3 text-left  inline-flex items-center px-5 hover:rounded-md w-full hover:bg-muted-foreground/20 dark:hover:bg-muted/10  transition-colors text-muted-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:bg-muted-foreground/20 focus:text-foreground pl-7 dark:focus:text-background",
              count > 0 && "placeholder:text-black"
            )}
            data-search-button="true"
            onClick={onClick}
            onChange={(e) => {
              search(e.target.value);
            }}
            // value={query}
            placeholder={labelText}
          />
          <Search className="mr-2 h-4 w-4 absolute top-1/2 -translate-y-1/2 left-2 text-muted-foreground" />
        </div>
        {/* )} */}
      </div>
    </>
  );
};

const SearchBox = (props: SearchBoxProps) => {
  const { query, refine } = useSearchBox(props);
  return (
    <div className="relative w-full bg-muted dark:bg-white rounded-md overflow-hidden">
      <input
        className={cn(
          "bg-muted dark:bg-accent-foreground border-none py-3 text-left  inline-flex items-center px-5 hover:rounded-md w-full hover:bg-muted-foreground/20 dark:hover:bg-muted/10  transition-colors text-muted-foreground placeholder:text-muted-foreground pr-7 focus:outline-none focus:ring-0 focus:bg-muted-foreground/20 focus:text-foreground"
          // active && "bg-primary/20 rounded-md group-hover:bg-primary",
          // text && "text-foreground dark:text-black",
          // className
        )}
        data-search-button="true"
        value={query}
        onChange={(e) => {
          refine(e.target.value);
        }}
        onClick={(e) => {
          e.stopPropagation();
          // onClick(e);
        }}
        placeholder="Search by name, cuisine, or location"
      />
      <Search className="mr-2 h-4 w-4 absolute top-1/2 -translate-y-1/2 right-2 text-muted-foreground" />
      {/* {text || label} */}
      {/* Search */}
      {/* </button> */}
      {/* {children} */}
    </div>
  );
};

function CustomToggleRefinement(
  props: ToggleRefinementProps & { description?: string }
) {
  const { value, canRefine, refine } = useToggleRefinement(props);

  return (
    <div className="flex items-start gap-3">
      <Checkbox
        id="terms-2"
        // value={value.isRefined ? "true" : "false"}
        defaultChecked={value.isRefined}
        onCheckedChange={(checked) => {
          console.log("checked", value.isRefined);

          if (checked) {
            refine({ isRefined: false });
          } else {
            refine({ isRefined: true });
          }
        }}
        disabled={!canRefine}
      />
      <div className="grid gap-1">
        <Label htmlFor="terms-2">{props.label}</Label>
        {props.description && (
          <p className="text-muted-foreground text-sm">{props.description}</p>
        )}
      </div>
    </div>
  );
}

const VirtualFilters = () => {
  useToggleRefinement({ attribute: "corkage_fee" });
  useToggleRefinement({ attribute: "dogs_ok" });
  useToggleRefinement({ attribute: "accepts_reservations" });
  useToggleRefinement({ attribute: "accepts_events" });
  useSearchBox();
  return null;
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
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"location" | "cuisine" | "dietary" | null>(
    null
  );

  const [width, setWidth] = useState<number | "full">("full");
  const [height, setHeight] = useState<number>(0);

  const cuisine = useRefinementList({ attribute: "cuisine.name", limit: 8 });
  const dietary = useRefinementList({ attribute: "dap_compliance", limit: 8 });
  const location = useRefinementList({ attribute: "state", limit: 8 });

  const anchorRef = useRef<HTMLDivElement>(null);

  // Add state to track heights of each refinement list
  const [, setHeights] = useState({
    location: 200,
    cuisine: 200,
    dietary: 200,
  });

  const singleItemsSearchWrapRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent, newTab: "location" | "cuisine" | "dietary") => {
      const section = sections.find((section) => section.name === newTab);
      if (section) {
        setWidth(section.width);
        setHeight(section.height);
        console.log("Section", section);
      }

      if (anchorRef.current) {
        // const offset =
        //   (e.target as HTMLElement).getBoundingClientRect().left -
        //   anchorRef.current.getBoundingClientRect().left;
        // console.log("Offset", offset);
      }

      if (newTab !== tab) {
        setTab(newTab);
        if (!isOpen) setIsOpen(true);
        // updateHeight(newTab, 200);
      }
    },
    [isOpen, tab]
  );

  // Function to update height when refinement list content changes
  const updateHeight = useCallback(
    (tabName: string, height: number) => {
      setHeights((prev) => ({
        ...prev,
        [tabName]: height,
      }));
    },
    [setHeights]
  );

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
    (e: CustomEvent<{ originalEvent: PointerEvent }>) => {
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
        setTab(null);
      }
    },
    [isOpen]
  );

  const items = {
    location: location,
    cuisine: cuisine,
    dietary: dietary,
  };

  // Get current search state and convert the url to /restaurants?{search}
  // We'll use the useSearchBox and useCurrentRefinements hooks from react-instantsearch

  // Custom hook to get current search state and build the URL
  // function useSearchUrl() {
  //   const { indexUiState } = useInstantSearch();
  //   // indexUiState contains the current search state for the index (e.g., query, refinements)
  //   // We'll convert it to a query string
  //   return "/restaurants?" + qs.stringify(indexUiState, { arrayFormat: "bracket" });
  // }

  const queryParams = useSearchParams();

  // const searchUrl =
  // "/restaurants??" +
  // qs.stringify(i?nstantSearch, { arrayFormat: "bracket-separator" });

  // Example usage:
  // const searchUrl = useSearchUrl();
  // router.push(searchUrl);

  return (
    <div className="flex gap-4">
      <VirtualFilters />
      <div className={cn("w-full", className)}>
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
                "relative  mx-auto dark:bg-white bg-muted rounded-md flex overflow-hidden group min-w-96"
              )}
            >
              <SearchInput
                label="Location"
                attribute="state"
                items={location.items}
                onClick={(e) => handleClick(e, "location")}
                search={location.searchForItems}
              />
              <SearchInput
                label="Cuisine"
                attribute="cuisine.name"
                items={cuisine.items}
                onClick={(e) => handleClick(e, "cuisine")}
                search={cuisine.searchForItems}
              />
              <SearchInput
                label="Dietary"
                attribute="dap_compliance"
                items={dietary.items}
                onClick={(e) => handleClick(e, "dietary")}
                search={dietary.searchForItems}
                className="pr-26"
              />

              <Link
                href={{
                  pathname: "/restaurants",
                  query: {
                    ...Object.fromEntries(queryParams.entries()),
                  },
                }}
                className={cn(
                  buttonVariants(),
                  "ml-auto absolute right-4 top-1/2 -translate-y-1/2"
                )}
              >
                Search
              </Link>
            </div>
          </PopoverAnchor>
          <PopoverContent
            align="start"
            // alignOffset={popoverOffset}
            style={{
              width:
                width === "full"
                  ? "var(--radix-popover-trigger-width)"
                  : `${width}px`,
              height: `${height}px`,
            }}
            className="w-full mx-auto transition-all duration-300 overflow-hidden"
            onPointerDownOutside={handleClickOutside}
          >
            <div className="overflow-hidden ">
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
                    className="col-span-1 min-h-0 h-max overflow-y-scroll show-scrollbar"
                    id={section.key}
                  >
                    <div className="flex flex-col gap-2 mb-2">
                      <h3 className="text-xs font-light">{section.label}</h3>
                    </div>
                    {section.type === "single" && (
                      <div
                        className="grid grid-cols-1 gap-2"
                        ref={singleItemsSearchWrapRef}
                      >
                        {section.items.map((item) => {
                          // Check if this item is currently refined
                          const isRefined =
                            tab &&
                            items[tab]?.items?.some(
                              (refinementItem) =>
                                refinementItem.value === item.key &&
                                refinementItem.isRefined
                            );

                          return (
                            <div
                              key={item.name}
                              className={cn(
                                "flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 cursor-pointer transition",
                                isRefined &&
                                  "bg-primary/20 border border-primary"
                              )}
                              onClick={() => {
                                // setIsOpen(false);
                                // Clear other refinments for this attribute

                                if (tab && items[tab]) {
                                  // items[tab]
                                  items[tab].refine(item.key);
                                }
                              }}
                            >
                              <Image
                                src={item.image}
                                alt={item.name || ""}
                                width={200}
                                height={200}
                                className="size-16 rounded-md object-cover"
                              />
                              <span className="font-medium">{item.name}</span>
                              {isRefined && (
                                <X className="ml-auto h-4 w-4 text-primary" />
                              )}
                            </div>
                          );
                        })}
                        {tab &&
                          items[tab].items?.map((item) => (
                            <div
                              onClick={() => {
                                items[tab].refine(item.value);
                              }}
                              key={item.value}
                            >
                              {item.label}
                            </div>
                          ))}
                      </div>
                    )}
                    {section.type === "multi" && (
                      <div className="grid grid-cols-2 gap-3">
                        {(tab &&
                          items[tab].items?.map((item) => (
                            <div
                              key={item.value}
                              onClick={() => {
                                // If the item is already refined, unrefine it`
                                console.log("item", item);
                                items[tab].refine(item.value);
                              }}
                              className={cn(
                                item.isRefined && badgeVariants({ size: "lg" }),
                                "cursor-pointer py-0"
                              )}
                            >
                              {item.label}
                              {item.isRefined && <X className="ml-2 h-4 w-4" />}
                            </div>
                          ))) ??
                          section.items.map((item) => (
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-auto border-none">
              <Filter className="h-5 w-5" /> Filter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter</DialogTitle>
              <DialogDescription>
                You can filter your search results further by selecting the
                following options.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                {/* <h4 className="text-sm font-medium">Location</h4> */}
                <SearchBox />

                <div className="flex flex-col space-y-5 mt-4">
                  <DynamicWidgets>
                    {/* <SearchBox attribute="name" /> */}
                    {/* <RefinementList attribute="cuisine" /> */}
                    <CustomToggleRefinement
                      label="Corkage Fee"
                      attribute="corkage_fee"
                      description="Corkage fee is a fee charged for bringing your own wine to the restaurant."
                    />
                    <CustomToggleRefinement
                      label="Dogs OK"
                      attribute="dogs_ok"
                      description="Dogs are allowed at the restaurant."
                    />
                    <CustomToggleRefinement
                      label="Accepts Reservations"
                      attribute="accepts_reservations"
                      description="The restaurant accepts reservations."
                    />
                    <CustomToggleRefinement
                      label="Accepts Events"
                      attribute="accepts_events"
                      description="The restaurant accepts events."
                    />
                    {/* <ToggleRefinement label="Dogs OK" attribute="dogs_ok" /> */}
                    {/* <ToggleRefinement
                      label="Accepts Reserversations"
                      attribute="accepts_reservations"
                    /> */}
                    {/* <ToggleRefinement
                      label="Accepts Events"
                      attribute="accepts_events"
                    /> */}
                  </DynamicWidgets>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

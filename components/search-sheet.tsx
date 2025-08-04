"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  SearchBoxProps,
  ToggleRefinementProps,
  useCurrentRefinements,
  useInstantSearch,
  useRefinementList,
  useSearchBox,
  useToggleRefinement,
} from "react-instantsearch";

import { zodResolver } from "@hookform/resolvers/zod";
import { RefinementListItem } from "instantsearch.js/es/connectors/refinement-list/connectRefinementList";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

const SearchInput = ({
  search,
  items,
  label,
  attribute,
  className,
  placeholder,
}: {
  search: (query: string) => void;
  items: RefinementListItem[];
  label: string;
  attribute: string;
  className?: string;
  placeholder?: string;
}) => {
  const currentRefinements = useCurrentRefinements({
    includedAttributes: [attribute],
  });

  const currentRefinementsItems = currentRefinements.items.flatMap(
    (item) => item.refinements,
  );

  const count = currentRefinementsItems.length;

  const labelText = useMemo(() => {
    if (count === 0) return label;
    if (count >= 1) return `${label} (${count})`;
    return `${label} (${count})`;
  }, [count, label]);

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative flex-1">
        <input
          className={cn(
            "w-full px-3 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
            count > 0 && "border-primary",
          )}
          onChange={(e) => {
            search(e.target.value);
          }}
          placeholder={placeholder || `Search ${label.toLowerCase()}...`}
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};

const RefinementList = ({
  items,
  refine,
  attribute,
  label,
  type = "multi",
}: {
  items: RefinementListItem[];
  refine: (value: string) => void;
  attribute: string;
  label: string;
  type?: "single" | "multi";
}) => {
  const currentRefinements = useCurrentRefinements({
    includedAttributes: [attribute],
  });

  const currentRefinementsItems = currentRefinements.items.flatMap(
    (item) => item.refinements,
  );

  const selectedValues = currentRefinementsItems.map((item) => item.value);

  if (items.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        <p className="text-sm">No {label.toLowerCase()} found</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.value} className="flex items-center space-x-2">
          <Checkbox
            id={`${attribute}-${item.value}`}
            checked={selectedValues.includes(item.value)}
            onCheckedChange={() => refine(item.value)}
            disabled={
              !item.isRefined && type === "single" && selectedValues.length > 0
            }
          />
          <Label
            htmlFor={`${attribute}-${item.value}`}
            className="text-sm font-normal cursor-pointer flex-1"
          >
            {item.label}
            <span className="text-muted-foreground ml-1">({item.count})</span>
          </Label>
        </div>
      ))}
    </div>
  );
};

const SearchBox = (props: SearchBoxProps) => {
  const { query, refine } = useSearchBox(props);

  return (
    <div className="relative w-full">
      <input
        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        value={query}
        onChange={(e) => refine(e.target.value)}
        placeholder="Search by name, cuisine, or location"
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  );
};

function CustomToggleRefinement(
  props: ToggleRefinementProps & { description?: string },
) {
  const { value, canRefine, refine } = useToggleRefinement(props);

  return (
    <div className="flex items-start gap-3">
      <Checkbox
        id="terms-2"
        defaultChecked={value.isRefined}
        onCheckedChange={(checked) => {
          checked ? refine({ isRefined: false }) : refine({ isRefined: true });
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

const SearchFormSchema = z.object({
  location: z.array(z.string()).optional(),
  cuisine: z.array(z.string()).optional(),
  dietary: z.array(z.string()).optional(),
});

export function SearchSheet({
  introText,
  condensed,
  className,
  icon,
}: {
  introText?: string;
  condensed?: boolean;
  className?: string;
  icon?: boolean;
}) {
  const searchForm = useForm<z.infer<typeof SearchFormSchema>>({
    resolver: zodResolver(SearchFormSchema),
    defaultValues: {
      location: [],
      cuisine: [],
      dietary: [],
    },
  });

  const cuisine = useRefinementList({ attribute: "cuisine.name", limit: 20 });
  const dietary = useRefinementList({ attribute: "dap_compliance", limit: 20 });
  const location = useRefinementList({ attribute: "state", limit: 20 });

  const { indexUiState } = useInstantSearch();
  const queryParams = useSearchParams();

  // Get current refinements for display
  const currentRefinements = useCurrentRefinements();
  const allRefinements = currentRefinements.items.flatMap(
    (item) => item.refinements,
  );

  const clearAllRefinements = () => {
    allRefinements.forEach((refinement) => {
      currentRefinements.refine(refinement);
    });
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <VirtualFilters />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {icon ? (
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full"
              aria-label="Main menu"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search for your next meal</span>
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full h-12 justify-start pl-12"
            >
              <Search className="w-4 h-4 mr-2 ml-4" />
              Search for your next meal
            </Button>
          )}
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <SheetTitle className="text-lg font-semibold">
              Search Filters
            </SheetTitle>
            {allRefinements.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllRefinements}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            )}
          </div>

          {/* Active refinements */}
          {allRefinements.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {allRefinements.map((refinement) => (
                  <Badge
                    key={`${refinement.attribute}-${refinement.value}`}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {refinement.label}
                    <button
                      onClick={() => currentRefinements.refine(refinement)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Location section */}
          <div className="mb-6">
            <div className="mb-3">
              <h3 className="text-sm font-medium mb-2">Location</h3>
              <SearchInput
                label="Location"
                attribute="state"
                items={location.items}
                search={location.searchForItems}
                placeholder="Search locations..."
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              <RefinementList
                items={location.items}
                refine={location.refine}
                attribute="state"
                label="Location"
                type="single"
              />
            </div>
          </div>

          {/* Cuisine section */}
          <div className="mb-6">
            <div className="mb-3">
              <h3 className="text-sm font-medium mb-2">Cuisine</h3>
              <SearchInput
                label="Cuisine"
                attribute="cuisine.name"
                items={cuisine.items}
                search={cuisine.searchForItems}
                placeholder="Search cuisines..."
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              <RefinementList
                items={cuisine.items}
                refine={cuisine.refine}
                attribute="cuisine.name"
                label="Cuisine"
                type="multi"
              />
            </div>
          </div>

          {/* Dietary section */}
          <div className="mb-6">
            <div className="mb-3">
              <h3 className="text-sm font-medium mb-2">Dietary Restrictions</h3>
              <SearchInput
                label="Dietary"
                attribute="dap_compliance"
                items={dietary.items}
                search={dietary.searchForItems}
                placeholder="Search dietary options..."
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              <RefinementList
                items={dietary.items}
                refine={dietary.refine}
                attribute="dap_compliance"
                label="Dietary"
                type="multi"
              />
            </div>
          </div>

          {/* Additional filters */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Additional Filters</h3>
            <CustomToggleRefinement
              attribute="corkage_fee"
              label="Corkage Fee"
              description="Restaurants that allow you to bring your own wine"
            />
            <CustomToggleRefinement
              attribute="dogs_ok"
              label="Dog Friendly"
              description="Restaurants that welcome dogs"
            />
            <CustomToggleRefinement
              attribute="accepts_reservations"
              label="Accepts Reservations"
              description="Restaurants that take reservations"
            />
            <CustomToggleRefinement
              attribute="accepts_events"
              label="Event Space"
              description="Restaurants with event space available"
            />
          </div>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            className="w-full sticky bottom-0"
          >
            Search
          </Button>
        </SheetContent>
      </Sheet>
    </>
  );
}

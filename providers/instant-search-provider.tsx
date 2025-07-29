"use client";

import { InstantSearch } from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";

import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { typesenseConfig } from "@/lib/typesense";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: typesenseConfig,
  additionalSearchParameters: {
    query_by: "name,cuisine,city,state,address,locale",
  },
});

const searchClient = typesenseInstantsearchAdapter.searchClient;

export const InstantSearchProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <InstantSearchNext
      indexName="restaurants"
      searchClient={searchClient}
      routing={true}
      initialUiState={{
        restaurants: {
          toggle: {
            accepts_events: true,
          },
        },
      }}
      future={{
        preserveSharedStateOnUnmount: true,
      }}
    >
      {children}
    </InstantSearchNext>
  );
};

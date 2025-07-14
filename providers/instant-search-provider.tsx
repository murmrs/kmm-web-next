"use client";

import { InstantSearch } from "react-instantsearch";

import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { typesenseConfig } from "@/lib/typesense";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: typesenseConfig,
  additionalSearchParameters: {
    query_by: "name,cuisine,dietary,city,state,address",
  },
});

const searchClient = typesenseInstantsearchAdapter.searchClient;

export const InstantSearchProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
      {children}
    </InstantSearch>
  );
};

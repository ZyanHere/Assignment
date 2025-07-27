// hooks/useStableSearch.js
import useSWR from "swr";
import { api } from "@/lib/api/axios";

const fetcher = (url) => api.get(url).then((res) => res.data.data);

/**
 * Stable search hook — used when user lands on /search?q=...
 * This hits the unified general search API
 */
export const useStableSearch = (query) => {
  const encodedQuery = encodeURIComponent(query || "");
  const shouldFetch = !!query;

  const { data, error, isLoading } = useSWR(
    shouldFetch ? `lmd/api/v1/retail/search?q=${encodedQuery}&page=1&limit=10` : null,
    fetcher
  );

  return {
    data, // includes { products, stores, brands, categories }
    isLoading,
    isError: !!error,
  };
};

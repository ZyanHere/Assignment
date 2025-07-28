// hooks/useStableSearch.js
import useSWR from "swr";
import { api } from "@/lib/api/axios";

/**
 * Fetcher function for SWR - hits the general search API with query & sort
 * @param {string} url - SWR key used as API endpoint
 * @returns {Promise<object>} - Parsed API response
 */
const fetcher = (url) =>
  api.get(url).then((res) => res.data.data);

/**
 * Stable Search Hook — used for SSR-compatible search
 * Triggers only when user lands on `/search?q=...`
 * Can pass optional sort to backend.
 * 
 * @param {object} options
 * @param {string} options.query - The search query from user
 * @param {string} options.sort - Sort type (e.g., price_low_high, relevance, etc.)
 * @param {number} [options.page=1] - Pagination page number
 * @param {number} [options.limit=12] - Items per page
 */
export const useStableSearch = ({
  query,
  sort = "relevance",
  page = 1,
  limit = 12,
}) => {
  const encodedQuery = encodeURIComponent(query || "");
  const encodedSort = encodeURIComponent(sort || "relevance");

  const shouldFetch = !!query;

  const url = shouldFetch
    ? `/lmd/api/v1/retail/search?q=${encodedQuery}&sort=${encodedSort}&page=${page}&limit=${limit}`
    : null;

  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data, // Expected to contain products, stores, brands, categories, etc.
    isLoading,
    isError: !!error,
  };
};

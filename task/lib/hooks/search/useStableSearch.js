// hooks/useStableSearch.js
import useSWR from "swr";
import { api } from "@/lib/api/axios";
import qs from "query-string"; // for building query strings safely

const fetcher = (url) => api.get(url).then((res) => res.data.data);

/**
 * Stable Search Hook
 * Supports: search, filters, pagination, and sorting
 */
export const useStableSearch = ({
  q,
  category,
  brand,
  minPrice,
  maxPrice,
  page = 1,
  limit = 12,
  sort,
}) => {
  // Construct the full query string
  const queryString = qs.stringify(
    {
      q,
      category,
      brand,
      minPrice,
      maxPrice,
      page,
      limit,
      sort,
    },
    { skipNull: true, skipEmptyString: true }
  );

  const shouldFetch = !!q;

  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? `lmd/api/v1/retail/search?${queryString}` : null,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: !!error,
    mutate,
  };
};

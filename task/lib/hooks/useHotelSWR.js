// lib/hooks/useHotelSWR.js
import useSWR from "swr";
import { api } from "@/lib/api/axios";
import { adaptHotelSections } from "../utils/hotelAdapter";

const fetcher = async (url) => {
  const { data } = await api.get(url);
  if (!data?.success) throw new Error(data?.message || "Failed to fetch hotels");
  return data.data; // raw API shape
};

/**
 * Fetch Hotels data using SWR
 * @param {Object} opts
 * @param {boolean} opts.hotelsOnly - adds type=HOTELS to query
 * @param {number} opts.productsLimit - API product limit
 */
export function useHotelsSWR({ hotelsOnly = false, productsLimit = 20 } = {}) {
  const typeParam = hotelsOnly ? "type=HOTELS&" : "";
  const url = `/lmd/api/v1/retail/home/comprehensive?${typeParam}productsLimit=${productsLimit}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  return {
    data: data ? adaptHotelSections(data) : null,
    isLoading,
    isError: !!error,
    error,
    refresh: mutate,
  };
}

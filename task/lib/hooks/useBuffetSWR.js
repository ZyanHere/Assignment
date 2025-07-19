// lib/hooks/useBuffetSWR.js
import useSWR from "swr";
import { fetchBuffetData } from "@/lib/api/buffet";
import { adaptBuffetSections, adaptRestaurantDetails } from "../utils/buffetAdapters";


/**
 * Hook for full buffet data
 */
export function useBuffetData() {
  const { data, error, isLoading } = useSWR("/buffet-data", fetchBuffetData);

  return {
    data: data ? adaptBuffetSections(data.data) : null,
    isLoading,
    error,
  };
}

/**
 * Hook for a specific restaurant detail by ID
 */
export function useRestaurantDetails(id) {
  const { data, error, isLoading } = useSWR("/buffet-data", fetchBuffetData);

  const restaurant = data ? adaptRestaurantDetails(data.data, id) : null;

  return {
    data: restaurant,
    isLoading,
    error,
  };
}

// lib/hooks/useEventsSWR.js
import useSWR from "swr";
import { api } from "@/lib/api/axios";
import { adaptEventSections } from "../utils/eventAdapters";


const fetcher = async (url) => {
  const { data } = await api.get(url);
  if (!data?.success) throw new Error(data?.message || "Failed to fetch events");
  return data.data;
};

export function useEventsSWR({ eventsOnly = false, productsLimit = 60 } = {}) {
  const typeParam = eventsOnly ? "type=EVENTS&" : "";
  const url = `/lmd/api/v1/retail/home/comprehensive?${typeParam}productsLimit=${productsLimit}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  return {
    data: data ? adaptEventSections(data) : null,
    isLoading,
    isError: !!error,
    error,
    refresh: mutate,
  };
}

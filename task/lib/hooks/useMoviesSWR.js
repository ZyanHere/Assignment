// lib/hooks/useMoviesSWR.js
import useSWR from "swr";
import { api } from "@/lib/api/axios";
import { adaptMovieSections } from "../utils/movieAdapter";

const fetcher = async (url) => {
  const { data } = await api.get(url);
  if (!data?.success) throw new Error(data?.message || "Failed to fetch movies");
  return data.data; // raw API data
};

export function useMoviesSWR({ moviesOnly = true, productsLimit = 20 } = {}) {
  const typeParam = moviesOnly ? "type=MOVIES&" : "";
  const url = `/lmd/api/v1/retail/home/comprehensive?${typeParam}productsLimit=${productsLimit}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  return {
    data: data ? adaptMovieSections(data) : null,
    isLoading,
    isError: !!error,
    error,
    refresh: mutate,
  };
}

import { useState, useEffect } from "react";
import { api } from "@/lib/api/axios";

/**
 * useLiveSearch - fetches live search suggestions and results as user types.
 *
 * @param {string} query - the raw search input
 * @returns {{
 *   data: {
 *     products: Array,
 *     suggestions: Array<string>,
 *     redirectUrl: string | null
 *   } | null,
 *   isLoading: boolean
 * }}
 */
export const useLiveSearch = (query) => {
  const [results, setResults] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce user input for 300ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 200);
    return () => clearTimeout(timeout);
  }, [query]);

  // Fetch API only after debounce delay
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery) return setResults(null);

      try {
        setLoading(true);
        const res = await api.get(`lmd/api/v1/retail/search?q=${encodeURIComponent(debouncedQuery)}&limit=10&page=1`);
        const raw = res.data?.data;

        const products = raw?.results?.[0]?.products || [];
        const suggestions = raw?.suggestions || [];
        const redirectUrl = raw?.redirectUrl || null;

        setResults({ products, suggestions, redirectUrl });
      } catch (err) {
        console.error("Live search error:", err);
        setResults(null);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return { data: results, isLoading };
};

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLiveSearch } from "@/lib/hooks/search/useLiveSearch";


/**
 * SearchBar Component
 * - Renders a search input with live dropdown suggestions
 * - Integrates with unified general search API
 */
const SearchBar = ({ placeholder = 'Search "stores, products, brands..."' }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const router = useRouter();

  const { data: results, isLoading } = useLiveSearch(searchQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false)
    const trimmed = searchQuery.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleSuggestionClick = (text) => {
    router.push(`/search?q=${encodeURIComponent(text)}`);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true); // Show suggestions when user types
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative w-full">
        {/* Search Icon */}
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-8 pr-3 py-1.5 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500 text-gray-700 transition-all border border-transparent hover:border-yellow-400 text-sm"
        />
      </div>

      {/* Suggestions Dropdown */}
      {searchQuery && showSuggestions && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-md max-h-72 overflow-y-auto text-sm">
          {isLoading && (
            <div className="px-4 py-2 text-gray-500">Loading...</div>
          )}

          {!isLoading && !results && (
            <div className="px-4 py-2 text-gray-500">No results</div>
          )}

          {!isLoading &&
            results &&
            results.products?.length === 0 &&
            results.suggestions?.length === 0 && (
              <div className="px-4 py-2 text-gray-500">No matches found</div>
          )}

          {results?.products?.length > 0 && (
            <>
              <div className="px-4 py-1 font-semibold text-gray-700 bg-gray-100">Products</div>
              {results.products.map((item) => (
                <div
                  key={item._id}
                  className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(item.name)}
                >
                  {item.name}
                </div>
              ))}
            </>
          )}

          {results?.suggestions?.length > 0 && (
            <>
              <div className="px-4 py-1 font-semibold text-gray-700 bg-gray-100">Suggestions</div>
              {results.suggestions.map((text, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(text)}
                >
                  {text}
                </div>
              ))}
            </>
          )}

          {results?.redirectUrl && (
            <div
              className="px-4 py-2 text-blue-600 bg-gray-50 hover:underline cursor-pointer"
              onClick={() => router.push(results.redirectUrl)}
            >
              See more results for &ldquo;{searchQuery}&rdquo;
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default SearchBar;

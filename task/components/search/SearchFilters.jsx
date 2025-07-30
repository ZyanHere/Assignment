// components/search/SearchFilters.jsx
"use client";

import { useState, useEffect } from "react";

const SearchFilters = ({ filters, setFilters }) => {
  const [category, setCategory] = useState(filters.category || "");
  const [brand, setBrand] = useState(filters.brand || "");
  const [minPrice, setMinPrice] = useState(filters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        category: category || null,
        brand: brand || null,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
        page: 1, // reset to first page on filter change
      }));
    }, 500);

    return () => clearTimeout(timeout);
  }, [category, brand, minPrice, maxPrice]);

  return (
    <div className="space-y-4 bg-yellow-50 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-yellow-700">Filters</h3>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 px-3 py-1 rounded text-sm"
          placeholder="e.g. electronics"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Brand</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full border border-gray-300 px-3 py-1 rounded text-sm"
          placeholder="e.g. apple"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border border-gray-300 px-3 py-1 rounded text-sm"
            placeholder="100"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border border-gray-300 px-3 py-1 rounded text-sm"
            placeholder="1000"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;

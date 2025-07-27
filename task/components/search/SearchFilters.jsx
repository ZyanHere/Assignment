// components/search/SearchFilters.jsx
"use client";

import React, { useState } from "react";

const SearchFilters = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

  return (
    <aside className="w-full sm:w-64 p-4 border-r border-yellow-300 bg-white">
      <h2 className="text-lg font-semibold mb-4 text-yellow-600">Filters</h2>

      {/* --- Price Filter --- */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2 text-gray-700">PRICE</h3>
        <input
          type="range"
          min="0"
          max="5000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex items-center justify-between mt-2 gap-2 text-sm text-gray-600">
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-1/2 border rounded px-2 py-1 text-xs"
          />
          to
          <input
            type="number"
            max="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-1/2 border rounded px-2 py-1 text-xs"
          />
        </div>
      </div>

      {/* --- Category Filter --- */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2 text-gray-700">Category</h3>
        {/* Replace with dynamic category checkboxes later */}
        <label className="block text-sm text-gray-600 mb-1">
          <input type="checkbox" className="mr-2" /> Electronics
        </label>
        <label className="block text-sm text-gray-600 mb-1">
          <input type="checkbox" className="mr-2" /> Fashion
        </label>
      </div>

      {/* --- Subcategory Filter --- */}
      <div>
        <h3 className="text-sm font-medium mb-2 text-gray-700">SubCategory</h3>
        {/* Replace with dynamic subcategory checkboxes later */}
        <label className="block text-sm text-gray-600 mb-1">
          <input type="checkbox" className="mr-2" /> Jeans
        </label>
        <label className="block text-sm text-gray-600 mb-1">
          <input type="checkbox" className="mr-2" /> T-Shirts
        </label>
      </div>
    </aside>
  );
};

export default SearchFilters;

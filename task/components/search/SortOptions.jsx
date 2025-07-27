// components/search/SortOptions.jsx
"use client";

import React, { useState } from "react";

const sortTypes = [
  { label: "Relevance", value: "relevance" },
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "priceLow" },
  { label: "Price: High to Low", value: "priceHigh" },
  { label: "Newest First", value: "newest" },
];

const SortOptions = ({ onChange }) => {
  const [active, setActive] = useState("relevance");

  const handleSortChange = (value) => {
    setActive(value);
    onChange?.(value);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center mb-4">
      <span className="text-sm font-medium text-gray-700">Sort By</span>
      {sortTypes.map((sort) => (
        <button
          key={sort.value}
          className={`text-xs sm:text-sm px-2.5 py-1.5 rounded-md border transition ${
            active === sort.value
              ? "bg-yellow-500 text-white border-yellow-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-50"
          }`}
          onClick={() => handleSortChange(sort.value)}
        >
          {sort.label}
        </button>
      ))}
    </div>
  );
};

export default SortOptions;

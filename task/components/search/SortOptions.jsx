"use client";

import { useState, useEffect } from "react";

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "popularity", label: "Popularity" },
  { value: "price_low_high", label: "Price: Low to High" },
  { value: "price_high_low", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Customer Rating" },
  { value: "discount", label: "Discount" },
];

export default function SortOptions({ onApply, currentSort = "relevance" }) {
  const [selected, setSelected] = useState(currentSort);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    setSelected(currentSort);
  }, [currentSort]);

  const handleSelect = (value) => {
    setSelected(value);
    onApply(value);
    setHasApplied(true);
  };

  const handleClear = () => {
    setSelected("relevance");
    onApply("relevance");
    setHasApplied(false);
  };

  return (
    <div className="flex flex-col items-start gap-2 sm:gap-4 text-sm w-full">
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-gray-700 font-medium">Sort By</span>
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`px-3 py-1 rounded-full font-medium border transition ${
              selected === option.value
                ? "bg-yellow-100 text-yellow-700 border-yellow-400"
                : "text-gray-600 border-gray-300 hover:bg-yellow-50"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {hasApplied && selected !== "relevance" && (
        <button
          onClick={handleClear}
          className="text-yellow-700 text-xs mt-1 underline hover:text-yellow-900"
        >
          ⟲ Clear Sort
        </button>
      )}
    </div>
  );
}

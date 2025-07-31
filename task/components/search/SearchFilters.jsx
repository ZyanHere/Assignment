// components/search/SearchFilters.jsx
"use client";

import { useState, useEffect } from "react";
import { Slider } from "../ui/slider";

const SearchFilters = ({ filters, setFilters }) => {
  const [category, setCategory] = useState(filters.category || "");
  const [brand, setBrand] = useState(filters.brand || "");
  const [minPrice, setMinPrice] = useState(filters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || "");
  const [priceRange, setPriceRange] = useState([minPrice || 0, maxPrice || 5000]);

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

    {/* Price Range */}
      <div className="mb-8">
        <h3 className="font-medium text-gray-900 mb-4">PRICE</h3>
        <div className="space-y-6">
          {/* Price Display */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>₹{minPrice.toLocaleString()}</span>
            <span>₹{maxPrice.toLocaleString()}</span>
          </div>

          {/* Dual Range Slider */}
          <div className="px-2">
            <Slider
              value={[minPrice || 0, maxPrice || 5000]}
              onValueChange={(value) => {
                setMinPrice(value[0]);
                setMaxPrice(value[1]);
              }}
              max={5000}
              min={0}
              step={50}
              className="w-full"
              minStepsBetweenThumbs={1}
            />
          </div>
        </div>
      </div>


      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => {
              const value = Math.max(
                0,
                Math.min(5000, parseInt(e.target.value) || 0)
              );
              setMinPrice(value);
            }}
            // onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border border-gray-300 px-3 py-1 rounded text-sm"
            placeholder="100"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600 mb-1">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => {
              const value = Math.max(
                0,
                Math.min(5000, parseInt(e.target.value) || 0)
              );
              setMaxPrice(value);
            }}
            // onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border border-gray-300 px-3 py-1 rounded text-sm"
            placeholder="1000"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;

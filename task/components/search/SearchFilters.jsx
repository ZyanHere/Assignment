"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Filter, Tag, DollarSign, Package, Sparkles, X } from "lucide-react"
import { Slider } from "../ui/slider"

const SearchFilters = ({ filters, setFilters }) => {
  const [category, setCategory] = useState(filters.category || "")
  const [brand, setBrand] = useState(filters.brand || "")
  const [minPrice, setMinPrice] = useState(filters.minPrice || 0)
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || 5000)
  const [priceRange, setPriceRange] = useState([minPrice || 0, maxPrice || 5000])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        category: category || null,
        brand: brand || null,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null,
        page: 1, // reset to first page on filter change
      }))
    }, 500)

    return () => clearTimeout(timeout)
  }, [category, brand, minPrice, maxPrice, setFilters])

  const clearAllFilters = () => {
    setCategory("")
    setBrand("")
    setMinPrice(0)
    setMaxPrice(5000)
    setPriceRange([0, 5000])
  }

  const hasActiveFilters = category || brand || minPrice > 0 || maxPrice < 5000

  return (
    <motion.div
      className="backdrop-blur-md bg-white/70 rounded-2xl p-6 border border-white/20 shadow-xl sticky top-6"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Filter className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Filters
          </h3>
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
          >
            <X className="w-3 h-3" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-4 h-4 text-blue-500" />
            <label className="text-sm font-medium text-gray-700">Category</label>
          </div>
          <div className="relative">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white/50 border border-white/30 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
              placeholder="e.g. electronics, clothing"
            />
            {category && (
              <button
                onClick={() => setCategory("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Brand Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-purple-500" />
            <label className="text-sm font-medium text-gray-700">Brand</label>
          </div>
          <div className="relative">
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full bg-white/50 border border-white/30 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200"
              placeholder="e.g. apple, samsung"
            />
            {brand && (
              <button
                onClick={() => setBrand("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Price Range */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-4 h-4 text-green-500" />
            <label className="text-sm font-medium text-gray-700">Price Range</label>
          </div>

          {/* Price Display */}
          <div className="flex items-center justify-between text-sm font-medium text-gray-600 mb-4">
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              ₹{minPrice.toLocaleString()}
            </span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              ₹{maxPrice.toLocaleString()}
            </span>
          </div>

          {/* Dual Range Slider */}
          <div className="px-2 mb-4">
            <Slider
              value={[minPrice || 0, maxPrice || 5000]}
              onValueChange={(value) => {
                setMinPrice(value[0])
                setMaxPrice(value[1])
                setPriceRange(value)
              }}
              max={5000}
              min={0}
              step={50}
              className="w-full"
              minStepsBetweenThumbs={1}
            />
          </div>

          {/* Price Input Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Min Price</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => {
                  const value = Math.max(0, Math.min(5000, Number.parseInt(e.target.value) || 0))
                  setMinPrice(value)
                }}
                className="w-full bg-white/50 border border-white/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all duration-200"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Max Price</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => {
                  const value = Math.max(0, Math.min(5000, Number.parseInt(e.target.value) || 0))
                  setMaxPrice(value)
                }}
                className="w-full bg-white/50 border border-white/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                placeholder="5000"
              />
            </div>
          </div>
        </motion.div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <motion.div
            className="pt-4 border-t border-white/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Active Filters</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {category && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {category}
                  <button onClick={() => setCategory("")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {brand && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                  {brand}
                  <button onClick={() => setBrand("")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {(minPrice > 0 || maxPrice < 5000) && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  ₹{minPrice} - ₹{maxPrice}
                  <button
                    onClick={() => {
                      setMinPrice(0)
                      setMaxPrice(5000)
                      setPriceRange([0, 5000])
                    }}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default SearchFilters

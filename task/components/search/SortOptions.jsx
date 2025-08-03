"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpDown, Check, RotateCcw, Sparkles } from "lucide-react"

const sortOptions = [
  { value: "relevance", label: "Relevance", icon: "🎯" },
  { value: "popularity", label: "Popularity", icon: "🔥" },
  { value: "price_low_high", label: "Price: Low to High", icon: "📈" },
  { value: "price_high_low", label: "Price: High to Low", icon: "📉" },
  { value: "newest", label: "Newest First", icon: "✨" },
  { value: "rating", label: "Customer Rating", icon: "⭐" },
  { value: "discount", label: "Discount", icon: "💰" },
]

export default function SortOptions({ onApply, currentSort = "relevance" }) {
  const [selected, setSelected] = useState(currentSort)
  const [hasApplied, setHasApplied] = useState(false)

  useEffect(() => {
    setSelected(currentSort)
  }, [currentSort])

  const handleSelect = (value) => {
    setSelected(value)
    onApply(value)
    setHasApplied(true)
  }

  const handleClear = () => {
    setSelected("relevance")
    onApply("relevance")
    setHasApplied(false)
  }

  const selectedOption = sortOptions.find((option) => option.value === selected)

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Sort Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-blue-600" />
          <span className="text-gray-700 font-medium">Sort By</span>
          {selectedOption && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
            >
              <span>{selectedOption.icon}</span>
              <span>{selectedOption.label}</span>
              <Check className="w-3 h-3" />
            </motion.div>
          )}
        </div>

        {/* Clear Sort Button */}
        <AnimatePresence>
          {hasApplied && selected !== "relevance" && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClear}
              className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded-lg hover:bg-red-50 transition-all duration-200"
            >
              <RotateCcw className="w-3 h-3" />
              Clear Sort
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-2 flex-wrap">
        {sortOptions.map((option, index) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(option.value)}
            className={`group relative px-4 py-2 rounded-xl font-medium border transition-all duration-200 ${
              selected === option.value
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg"
                : "text-gray-600 border-gray-300 hover:border-blue-400 hover:bg-blue-50 bg-white/70 backdrop-blur-sm"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{option.icon}</span>
              <span className="text-sm">{option.label}</span>
              {selected === option.value && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center">
                  <Check className="w-3 h-3" />
                </motion.div>
              )}
            </div>

            {/* Hover Effect */}
            {selected !== option.value && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            )}

            {/* Selection Sparkle Effect */}
            {selected === option.value && (
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-3 h-3 text-yellow-400" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

     
    </div>
  )
}

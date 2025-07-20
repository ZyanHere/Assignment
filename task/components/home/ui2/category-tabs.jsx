"use client"

import { Button } from "@/components/ui/button"
import { categories, secondaryCategories } from "../../../data/trendingData"

export function CategoryTabs({
  activeCategory,
  activeSecondaryCategory,
  onPrimaryCategoryClick,
  onSecondaryCategoryClick,
}) {
  return (
    <div>
      {/* Primary Categories */}
      <div className="flex flex-wrap gap-3 mb-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={`rounded-full px-6 py-2 transition-all ${
              activeCategory === category.id
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => onPrimaryCategoryClick(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Secondary Categories */}
      <div className="flex flex-wrap gap-3">
        {secondaryCategories.map((category) => (
          <Button
            key={category.id}
            variant={activeSecondaryCategory === category.id ? "default" : "ghost"}
            className={`px-4 py-2 transition-all ${
              activeSecondaryCategory === category.id
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => onSecondaryCategoryClick(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
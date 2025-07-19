"use client"

import { useState } from "react"
import { categories, secondaryCategories } from "../../data/trendingData"
import { ProductCard } from "../../components/home/ui2/product-card.jsx"
import { PromotionalCard } from "../../components/home/ui2/promotional-card.jsx"
import { CategoryTabs } from "../../components/home/ui2/category-tabs.jsx"

export default function Component() {
  const [activeCategory, setActiveCategory] = useState("farm-fresh-fruits")
  const [activeSecondaryCategory, setActiveSecondaryCategory] = useState(null)

  // Get current products based on active category
  const getCurrentProducts = () => {
    if (activeSecondaryCategory) {
      const secondaryCategory = secondaryCategories.find((cat) => cat.id === activeSecondaryCategory)
      return secondaryCategory?.products || []
    }

    const category = categories.find((cat) => cat.id === activeCategory)
    return category?.products || []
  }

  const handlePrimaryCategoryClick = (categoryId) => {
    setActiveCategory(categoryId)
    setActiveSecondaryCategory(null) // Reset secondary category when primary changes
  }

  const handleSecondaryCategoryClick = (categoryId) => {
    setActiveSecondaryCategory(activeSecondaryCategory === categoryId ? null : categoryId)
  }

  const handleProductClick = (product) => {
    console.log("Product clicked:", product.name)
    // Add your product click logic here
  }

  const handlePromotionalClick = () => {
    console.log("Promotional card clicked")
    // Add your promotional click logic here
  }

  const currentProducts = getCurrentProducts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Trending Store Favorites</h1>

            <CategoryTabs
              activeCategory={activeCategory}
              activeSecondaryCategory={activeSecondaryCategory}
              onPrimaryCategoryClick={handlePrimaryCategoryClick}
              onSecondaryCategoryClick={handleSecondaryCategoryClick}
            />
          </div>

          {/* Promotional Card */}
          <div className="ml-8">
            <PromotionalCard onButtonClick={handlePromotionalClick} />
          </div>
        </div>

        {/* Category Title */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeSecondaryCategory
              ? secondaryCategories.find((cat) => cat.id === activeSecondaryCategory)?.name
              : categories.find((cat) => cat.id === activeCategory)?.name}
          </h2>
          <p className="text-gray-600 text-sm mt-1">{currentProducts.length} items available</p>
        </div>

        {/* Product Grid */}
        <div
          className={`grid gap-6 ${
            currentProducts.length >= 5 ? "grid-cols-5" : `grid-cols-${Math.min(currentProducts.length, 4)}`
          }`}
        >
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} onClick={handleProductClick} />
          ))}
        </div>

        {/* Empty State */}
        {currentProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available in this category</p>
          </div>
        )}
      </div>
    </div>
  )
}
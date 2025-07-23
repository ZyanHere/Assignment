"use client"

import { useState } from "react"
import { categories, secondaryCategories  } from "../../data/trendingData"
import { ProductCard } from "../../components/home/ui2/product-card.jsx"
import { PromotionalCard } from "../../components/home/ui2/promotional-card.jsx"
import { CategoryTabs } from "../../components/home/ui2/category-tabs.jsx"

export default function Component() {
  const [activeCategory, setActiveCategory] = useState("farm-fresh-fruits")
  const [activeSecondaryCategory, setActiveSecondaryCategory] = useState(null)

  const getCurrentProducts = () => {
    if (activeSecondaryCategory) {
      const secondaryCategory = secondaryCategories.find(cat => cat.id === activeSecondaryCategory)
      return secondaryCategory?.products || []
    }
    const category = categories.find(cat => cat.id === activeCategory)
    return category?.products || []
  }

  const handlePrimaryCategoryClick = (categoryId) => {
    setActiveCategory(categoryId)
    setActiveSecondaryCategory(null)
  }

  const handleSecondaryCategoryClick = (categoryId) => {
    setActiveSecondaryCategory(prev => (prev === categoryId ? null : categoryId))
  }

  const handleProductClick = (product) => {
    console.log("Product clicked:", product.name)
    // Your product click logic here
  }

  const handlePromotionalClick = () => {
    console.log("Promotional card clicked")
    // Your promotional click logic here
  }

  const currentProducts = getCurrentProducts()

  const gridColsClass =
    currentProducts.length >= 5
      ? "grid-cols-5"
      : currentProducts.length === 4
      ? "grid-cols-4"
      : currentProducts.length === 3
      ? "grid-cols-3"
      : currentProducts.length === 2
      ? "grid-cols-2"
      : "grid-cols-1"

  return (
    <div className=" bg-gradient-to-br from-purple-100 to-pink-50 p-20 rounded-3xl">
      <div className="mx-auto bg-white p-10 rounded-4xl">
        {/* Header */}
        <div className="flex bg-purple-800 -mt-10">
          <div className="bg-white flex-1 rounded-tr-[40px]">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-10">Trending Store Favorites</h1>

            <CategoryTabs
              activeCategory={activeCategory}
              activeSecondaryCategory={activeSecondaryCategory}
              onPrimaryCategoryClick={handlePrimaryCategoryClick}
              onSecondaryCategoryClick={handleSecondaryCategoryClick}
            />
          </div>

          <div className=" -mr-10 bg-white rounded-tr-4xl ">
            <PromotionalCard onButtonClick={handlePromotionalClick} />
          </div>
        </div>

        {/* Category Title */}
        <div className="bg-purple-800 -mr-10 ">
        <div className="mb-3 bg-white rounded-tr-[40px] ">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeSecondaryCategory
              ? secondaryCategories.find(cat => cat.id === activeSecondaryCategory)?.name
              : categories.find(cat => cat.id === activeCategory)?.name}
          </h2>
          <p className="text-gray-600 text-sm mt-1">{currentProducts.length} items available</p>
        </div>
        </div>


        {/* Product Grid */}
        <div className={`grid gap-6 ${gridColsClass}`}>
          {currentProducts.map(product => (
            <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
          ))}
        </div>

        {currentProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available in this category</p>
          </div>
        )}
      </div>
    </div>
  )
}

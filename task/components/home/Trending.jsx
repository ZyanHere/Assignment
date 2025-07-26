"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Image from "next/image"
import { fetchComprehensiveHomeData, fetchProductsByCategory } from "../../lib/redux/home/homeSlice"
import SubProductRedux from "../subcategoryProduct/SubProductRedux"
import { PromotionalCard } from "../../components/home/ui2/promotional-card.jsx"
import { Skeleton } from "@/components/ui/skeleton"

// Fallback image for invalid URLs
const FALLBACK_IMAGE = "https://lastminutedeal.s3.ap-southeast-2.amazonaws.com/retail/products/fallback.png"

const ProductSkeleton = () => (
  <div className="p-4 sm:p-6 flex flex-col gap-4">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="p-4 border-b-2 border-gray-300 animate-pulse">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-200 rounded-lg"></div>
          <div className="h-6 bg-gray-200 rounded w-24 sm:w-32"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
          {[...Array(6)].map((_, productIndex) => (
            <div key={productIndex} className="animate-pulse">
              <div className="bg-gray-200 h-24 sm:h-32 md:h-40 rounded-xl mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)

const CategoryTabs = ({ 
  activeCategory, 
  onPrimaryCategoryClick,
  showAllOption = false 
}) => {
  const dispatch = useDispatch()
  const {
    categories,
    homeDataLoading,
    homeDataError,
  } = useSelector(state => state.home)

  useEffect(() => {
    if (categories.length === 0 && !homeDataLoading) {
      dispatch(fetchComprehensiveHomeData())
    }
  }, [dispatch, categories.length, homeDataLoading])

  const finalCategories = (() => {
    const processedCategories = Array.isArray(categories) 
      ? categories.slice(0, 6).map(cat => ({
          ...cat,
          _id: cat._id || cat.id,
          id: cat.id || cat._id,
          name: cat.name || 'Unnamed Category',
          imageUrl: cat.imageUrl && !cat.imageUrl.includes("example.com") 
            ? cat.imageUrl 
            : FALLBACK_IMAGE
        }))
      : []
    
    return processedCategories
  })()

  return (
    <div className="mt-4 sm:mt-6">
      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
        {homeDataLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3 py-2 w-[100px] sm:w-[120px] md:w-[160px] rounded-xl bg-gray-200 bg-gradient-to-r from-yellow-50 to-gray-200"
            >
              <Skeleton className="w-6 h-6 sm:w-8 sm:h-8 rounded-md" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))
        ) : homeDataError ? (
          <div className="flex items-center justify-center w-full py-4">
            <p className="text-red-500 text-sm">Error loading categories</p>
          </div>
        ) : (
          finalCategories?.map((category) => {
            const categoryId = category._id || category.id
            const isActive = activeCategory === categoryId
            
            return (
              <button
                key={categoryId}
                onClick={() => onPrimaryCategoryClick(categoryId)}
                className={`flex items-center rounded-xl transition-all duration-200
                  ${isActive
                    ? "bg-purple-800 shadow-lg text-white border-2 border-purple-900"
                    : "bg-gray-200 shadow-sm hover:bg-gray-300"
                  }
                  w-[100px] sm:w-[120px] md:w-[160px] gap-2 px-3 py-2 text-xs sm:text-sm`}
              >
                <div className="relative w-6 h-6 sm:w-8 sm:h-8">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      console.warn(`Failed to load category image: ${category.imageUrl}`)
                      e.target.src = FALLBACK_IMAGE
                    }}
                  />
                </div>
                <span className="font-medium break-words text-center leading-tight">
                  {category.name}
                </span>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}

export default function TrendingProducts() {
  const dispatch = useDispatch()
  const { 
    categories, 
    productsByCategory, 
    allProducts,
    homeDataLoading, 
    homeDataError,
    productsLoading
  } = useSelector(state => state.home)

  const [activeCategory, setActiveCategory] = useState(null)
  const [activeSecondaryCategory, setActiveSecondaryCategory] = useState(null)
  const [fetchAttempts, setFetchAttempts] = useState(0)
  const maxFetchAttempts = 3
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!categories.length && !homeDataLoading && !homeDataError && fetchAttempts < maxFetchAttempts) {
      dispatch(fetchComprehensiveHomeData())
      setFetchAttempts(prev => prev + 1)
    }
  }, [dispatch, categories.length, homeDataLoading, homeDataError, fetchAttempts])

  useEffect(() => {
    if (categories.length > 0 && !activeCategory && !homeDataLoading) {
      const firstCategory = categories[0]
      const firstCategoryId = firstCategory._id || firstCategory.id
      setActiveCategory(firstCategoryId)
    }
  }, [categories, activeCategory, homeDataLoading])

  useEffect(() => {
    if (activeCategory && !productsByCategory[activeCategory] && !productsLoading[activeCategory]) {
      dispatch(fetchProductsByCategory(activeCategory))
    }
  }, [activeCategory, productsByCategory, productsLoading, dispatch])

  const handlePrimaryCategoryClick = (categoryId) => {
    setActiveCategory(categoryId)
    setActiveSecondaryCategory(null)
  }

  const handleProductClick = (product) => {
    console.log("Product clicked:", product.name)
  }

  const handlePromotionalClick = () => {
    console.log("Promotional card clicked")
  }

  const getCurrentProducts = () => {
    if (activeSecondaryCategory) {
      return productsByCategory[activeSecondaryCategory] || []
    }
    if (!activeCategory) {
      return []
    }
    return productsByCategory[activeCategory]?.map(product => ({
      ...product,
      imageUrl: product.imageUrl && !product.imageUrl.includes("example.com") 
        ? product.imageUrl 
        : FALLBACK_IMAGE
    })) || []
  }

  const currentProducts = getCurrentProducts()
  const displayedProducts = isSmallScreen && currentProducts.length > 4 
    ? currentProducts.slice(0, 4) 
    : currentProducts

  const isLoadingCurrentCategory = activeCategory && productsLoading[activeCategory]

  if (homeDataError) {
    return (
      <div className="px-4 py-8 sm:px-8 sm:py-12">
        <div className="mx-auto max-w-7xl bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="text-center py-8">
            <p className="text-red-500 text-sm sm:text-base">Error loading data</p>
            <button 
              onClick={() => dispatch(fetchComprehensiveHomeData())}
              className="mt-4 px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-700 text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        {/* Header section */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Trending Store Favorites
            </h1>
            <CategoryTabs
              activeCategory={activeCategory}
              onPrimaryCategoryClick={handlePrimaryCategoryClick}
            />
          </div>
          <div className="md:max-w-xs">
            <PromotionalCard onButtonClick={handlePromotionalClick} />
          </div>
        </div>

        {/* Products section */}
        <div className="mt-6">
          <div className="flex items-center gap-4 mb-4">
            {activeCategory && (
              <Image
                src={categories.find(cat => (cat.id || cat._id) === activeCategory)?.imageUrl || FALLBACK_IMAGE}
                alt={getCurrentCategoryName()}
                width={60}
                height={60}
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                onError={(e) => {
                  e.target.src = FALLBACK_IMAGE
                }}
              />
            )}
            <div>
              <h2 className="text-lg font-semibold">
                {getCurrentCategoryName()}
              </h2>
              <p className="text-gray-600 text-sm">
                {isLoadingCurrentCategory ? "Loading..." : `${currentProducts.length} items available`}
              </p>
            </div>
          </div>
          
          <div className={`grid ${isSmallScreen ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'} gap-4`}>
            {isLoadingCurrentCategory ? (
              Array.from({ length: isSmallScreen ? 4 : 6 }).map((_, idx) => (
                <div key={idx} className="animate-pulse">
                  <div className="bg-gray-200 h-40 rounded-lg mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded mb-1"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                </div>
              ))
            ) : displayedProducts.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No products available</p>
              </div>
            ) : (
              displayedProducts.map(product => (
                <div key={product.id || product._id} className="group">
                  <SubProductRedux 
                    product={product} 
                    onClick={() => handleProductClick(product)}
                    compact={isSmallScreen}
                  />
                </div>
              ))
            )}
          </div>

          {isSmallScreen && currentProducts.length > 4 && (
            <div className="mt-4 text-center">
              <button className="text-purple-800 hover:text-purple-900 text-sm font-medium">
                View all {currentProducts.length} products →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  function getCurrentCategoryName() {
    if (activeSecondaryCategory) {
      const secondaryCategory = categories.find(cat => 
        cat.subcategories?.find(sub => (sub.id || sub._id) === activeSecondaryCategory)
      )
      return secondaryCategory?.subcategories?.find(sub => (sub.id || sub._id) === activeSecondaryCategory)?.name || "Category"
    }
    if (!activeCategory) {
      return "Select Category"
    }
    const category = categories.find(cat => (cat.id || cat._id) === activeCategory)
    return category?.name || "Category"
  }
}
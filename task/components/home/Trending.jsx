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
  <div className="p-2 sm:p-4 md:p-6 flex flex-col gap-2 sm:gap-4">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="p-2 sm:p-4 md:p-6 border-b-2 border-gray-300 animate-pulse">
        <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
          <div className="w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-24 bg-gray-200 rounded-lg"></div>
          <div className="h-4 sm:h-6 bg-gray-200 rounded w-16 sm:w-24 md:w-32"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-4">
          {[...Array(5)].map((_, productIndex) => (
            <div key={productIndex} className="animate-pulse">
              <div className="bg-gray-200 h-20 sm:h-24 md:h-32 lg:h-40 rounded-xl mb-2 sm:mb-4"></div>
              <div className="bg-gray-200 h-3 sm:h-4 rounded mb-1 sm:mb-2"></div>
              <div className="bg-gray-200 h-3 sm:h-4 rounded w-3/4"></div>
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

  const [shuffledCategories, setShuffledCategories] = useState([])

  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  useEffect(() => {
    if (categories.length === 0 && !homeDataLoading) {
      dispatch(fetchComprehensiveHomeData())
    }
  }, [dispatch, categories.length, homeDataLoading])

  useEffect(() => {
    if (categories.length > 0 && shuffledCategories.length === 0) {
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

      setShuffledCategories(shuffleArray(processedCategories))
    }
  }, [categories, shuffledCategories.length])

  const finalCategories = shuffledCategories

  return (
    <div className="mt-2 sm:mt-4 md:mt-6">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
        {homeDataLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center px-2 sm:px-3 py-1 sm:py-2 rounded-xl bg-gray-200 bg-gradient-to-r from-yellow-50 to-gray-200"
            >
              <Skeleton className="h-3 sm:h-4 w-3/4" />
            </div>
          ))
        ) : homeDataError ? (
          <div className="col-span-full flex items-center justify-center py-2 sm:py-4">
            <p className="text-red-500 text-xs sm:text-sm">Error loading categories</p>
          </div>
        ) : (
          finalCategories?.map((category) => {
            const categoryId = category._id || category.id
            const isActive = activeCategory === categoryId

            return (
              <button
                key={categoryId}
                onClick={() => onPrimaryCategoryClick(categoryId)}
                className={`flex items-center justify-center rounded-xl transition-all duration-200
                  ${isActive
                    ? "bg-purple-700 text-white shadow-md"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }
                  px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm w-full`}
              >
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

const MobilePromotionalCard = ({ onButtonClick }) => (
  <div className="mt-2 sm:mt-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-800 p-2 sm:p-4 md:p-6 text-white shadow-lg">
    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
      <div className="w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-full"></div>
      <span className="text-xs sm:text-sm font-medium">Freshness Guarantee</span>
    </div>
    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4">Weekly sold 1k+</h3>
    <button
      onClick={onButtonClick}
      className="bg-white text-purple-800 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors text-xs sm:text-sm md:text-base"
    >
      View More →
    </button>
  </div>
)

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
    const products = productsByCategory[activeCategory]?.map(product => ({
      ...product,
      imageUrl: product.imageUrl && !product.imageUrl.includes("example.com")
        ? product.imageUrl
        : FALLBACK_IMAGE
    })) || []

    return products.slice(0, 5)
  }

  const currentProducts = getCurrentProducts()
  const isLoadingCurrentCategory = activeCategory && productsLoading[activeCategory]

  if (homeDataError) {
    return (
      <div className="px-2 sm:px-4 md:px-8 py-2 sm:py-4 md:py-8">
        <div className="mx-auto max-w-7xl bg-white p-2 sm:p-4 md:p-6 rounded-lg shadow-sm">
          <div className="text-center py-2 sm:py-4 md:py-8">
            <p className="text-red-500 text-xs sm:text-sm md:text-base">Error loading data</p>
            <button
              onClick={() => dispatch(fetchComprehensiveHomeData())}
              className="mt-2 sm:mt-4 px-2 sm:px-4 py-1 sm:py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-700 text-xs sm:text-sm md:text-base"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-gradient-to-br from-purple-100 to-pink-50 p-2 sm:p-4 md:p-8 lg:p-20 rounded-2xl sm:rounded-3xl md:rounded-4xl">
      <div className=" mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-3xl shadow-md">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-3/4 ">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trending Store Favorites
            </h1>
            <CategoryTabs
              activeCategory={activeCategory}
              onPrimaryCategoryClick={handlePrimaryCategoryClick}
            />
          </div>
          {!isSmallScreen && (
            <div className="w-full sm:w-1/4">
              <PromotionalCard
                onButtonClick={handlePromotionalClick}
              />
            </div>
          )}
        </div>

        {isSmallScreen && (
          <div className="mt-4">
            <MobilePromotionalCard onButtonClick={handlePromotionalClick} />
          </div>
        )}

        <div className="mt-6 sm:mt-8 md:mt-10">
          <div className={`grid ${isSmallScreen ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'} gap-3 sm:gap-4`}>
            {isLoadingCurrentCategory ? (
              <ProductSkeleton />
            ) : currentProducts.length === 0 ? (
              <div className="col-span-full text-center py-4 sm:py-6">
                <p className="text-gray-500 text-sm sm:text-base">No products available</p>
              </div>
            ) : (
              currentProducts.map(product => (
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
        </div>
      </div>
    </div>
  )
}
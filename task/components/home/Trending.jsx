
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
  <div className="p-4 flex flex-col gap-4">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="p-4 border-b-2 border-gray-300 animate-pulse">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
          <div className="h-6 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[...Array(6)].map((_, productIndex) => (
            <div key={productIndex} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
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

  // Fetch categories if not already loaded
  useEffect(() => {
    if (categories.length === 0 && !homeDataLoading) {
      dispatch(fetchComprehensiveHomeData())
    }
  }, [dispatch, categories.length, homeDataLoading])

  // Prepare categories - show first 6 categories
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

  // Debug log - remove in production
  useEffect(() => {
    if (finalCategories.length > 0) {
      console.log('Final categories for tabs:', finalCategories.map(cat => ({ 
        id: cat._id || cat.id, 
        name: cat.name 
      })))
    }
  }, [finalCategories])

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-3 md:gap-4">
        {homeDataLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-3 w-[120px] md:w-[180px] rounded-xl bg-gray-200 bg-gradient-to-r from-yellow-50 to-gray-200"
            >
              <Skeleton className="w-8 h-8 rounded-md" />
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
                  w-[120px] md:w-[180px] gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-3`}
              >
                <div className="relative w-6 h-6 md:w-8 md:h-8">
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
                <span className="font-medium break-words text-center text-xs md:text-sm leading-tight">
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

  // Fetch data on component mount with retry logic
  useEffect(() => {
    if (!categories.length && !homeDataLoading && !homeDataError && fetchAttempts < maxFetchAttempts) {
      console.log(`Fetching home data, attempt ${fetchAttempts + 1}`)
      dispatch(fetchComprehensiveHomeData())
      setFetchAttempts(prev => prev + 1)
    }

    // Timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (homeDataLoading && fetchAttempts >= maxFetchAttempts) {
        console.error("Max fetch attempts reached, stopping loading")
        dispatch({ type: "home/fetchComprehensiveHomeData/rejected", payload: "Max retries reached" })
      }
    }, 10000) // 10-second timeout

    return () => clearTimeout(timeout)
  }, [dispatch, categories.length, homeDataLoading, homeDataError, fetchAttempts])

  // Set initial active category
  useEffect(() => {
    if (categories.length > 0 && !activeCategory && !homeDataLoading) {
      const firstCategory = categories[0]
      const firstCategoryId = firstCategory._id || firstCategory.id
      setActiveCategory(firstCategoryId)
      console.log('Setting initial category:', firstCategoryId, firstCategory.name)
    }
  }, [categories, activeCategory, homeDataLoading])

  // Fetch products for specific category
  useEffect(() => {
    if (activeCategory && !productsByCategory[activeCategory] && !productsLoading[activeCategory]) {
      console.log('Fetching products for category:', activeCategory)
      dispatch(fetchProductsByCategory(activeCategory))
    }
  }, [activeCategory, productsByCategory, productsLoading, dispatch])

  const handlePrimaryCategoryClick = (categoryId) => {
    console.log('Category clicked:', categoryId)
    setActiveCategory(categoryId)
    setActiveSecondaryCategory(null)
  }

  const handleSecondaryCategoryClick = (categoryId) => {
    setActiveSecondaryCategory(prev => (prev === categoryId ? null : categoryId))
    console.log('Secondary category clicked:', categoryId)
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

  const getCurrentCategoryName = () => {
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

  const currentProducts = getCurrentProducts()
  const isLoadingCurrentCategory = activeCategory && productsLoading[activeCategory]

  // Error state
  if (homeDataError) {
    return (
      <div className="bg-gradient-to-br from-purple-100 to-pink-50 p-20 rounded-3xl">
        <div className="mx-auto bg-white p-10 rounded-4xl">
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Error loading data: {homeDataError}</p>
            <button 
              onClick={() => dispatch(fetchComprehensiveHomeData())}
              className="mt-4 px-6 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Loading state
  if (homeDataLoading && categories.length === 0) {
    return (
      <div className="bg-gradient-to-br from-purple-100 to-pink-50 p-20 rounded-3xl">
        <div className="mx-auto bg-white p-10 rounded-4xl">
          <div className="flex bg-purple-800 -mt-10">
            <div className="bg-white flex-1 rounded-tr-[40px]">
              <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-10">Trending Store Favorites</h1>
              <CategoryTabs
                activeCategory={activeCategory}
                onPrimaryCategoryClick={handlePrimaryCategoryClick}
                showAllOption={false}
              />
            </div>
            <div className="-mr-10 bg-white rounded-tr-4xl">
              <PromotionalCard onButtonClick={handlePromotionalClick} />
            </div>
          </div>
          <div className="bg-purple-800 -mr-10">
            <div className="bg-white rounded-tr-[40px]">
              <ProductSkeleton />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main content
  return (
    <div className="bg-gradient-to-br from-purple-100 to-pink-50 p-20 rounded-3xl">
      <div className="mx-auto bg-white p-10 rounded-4xl">
        <div className="flex bg-purple-800 -mt-10">
          <div className="bg-white flex-1 rounded-tr-[40px]">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-10">Trending Store Favorites</h1>
            <CategoryTabs
              activeCategory={activeCategory}
              onPrimaryCategoryClick={handlePrimaryCategoryClick}
              showAllOption={false}
            />
          </div>
          <div className="-mr-10 bg-white rounded-tr-4xl">
            <PromotionalCard onButtonClick={handlePromotionalClick} />
          </div>
        </div>
        <div className="bg-purple-800 -mr-10">
          <div className="p-4 flex flex-col gap-4 bg-white rounded-tr-[40px]">
            <div className="p-4 border-b-2 border-gray-300">
              <div className="flex items-center gap-4 mb-4">
                {activeCategory && (
                  <Image
                    src={categories.find(cat => (cat.id || cat._id) === activeCategory)?.imageUrl || FALLBACK_IMAGE}
                    alt={getCurrentCategoryName()}
                    width={100}
                    height={100}
                    className="object-contain"
                    onError={(e) => {
                      console.warn(`Failed to load category image: ${e.target.src}`)
                      e.target.src = FALLBACK_IMAGE
                    }}
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{getCurrentCategoryName()}</h2>
                  <p className="text-gray-600 text-sm">
                    {isLoadingCurrentCategory ? "Loading..." : `${currentProducts.length} items available`}
                    {isLoadingCurrentCategory && (
                      <span className="ml-2 inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-purple-800"></span>
                    )}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {isLoadingCurrentCategory ? (
                  Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="animate-pulse">
                      <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                      <div className="bg-gray-200 h-4 rounded mb-2"></div>
                      <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    </div>
                  ))
                ) : currentProducts.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 text-lg">No products available in this category</p>
                    {activeCategory && (
                      <button 
                        onClick={() => dispatch(fetchProductsByCategory(activeCategory))}
                        className="mt-4 px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-700 text-sm"
                      >
                        Retry Loading Products
                      </button>
                    )}
                  </div>
                ) : (
                  currentProducts.map(product => (
                    <div key={product.id || product._id}>
                      <SubProductRedux 
                        product={product} 
                        onClick={() => handleProductClick(product)} 
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, RefreshCw } from "lucide-react"
import { fetchComprehensiveHomeData, fetchProductsByCategory } from "@/lib/redux/home/homeSlice"
import SubProductRedux from "@/components/subcategoryProduct/SubProductRedux"

const FALLBACK_IMAGE = "https://lastminutedeal.s3.ap-southeast-2.amazonaws.com/retail/products/fallback.png"
const MAX_FETCH_ATTEMPTS = 3

export default function TrendingProducts() {
  const dispatch = useDispatch()
  const { categories, productsByCategory, homeDataLoading, homeDataError, productsLoading } = useSelector(
    (state) => state.home,
  )
  const [activeCategory, setActiveCategory] = useState(null)
  const [fetchAttempts, setFetchAttempts] = useState(0)
  const [shuffledCategories, setShuffledCategories] = useState([])
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  useEffect(() => {
    if (!categories.length && !homeDataLoading && !homeDataError && fetchAttempts < MAX_FETCH_ATTEMPTS) {
      dispatch(fetchComprehensiveHomeData())
      setFetchAttempts((prev) => prev + 1)
    }
  }, [categories, homeDataLoading, homeDataError, fetchAttempts, dispatch])

  useEffect(() => {
    if (categories.length && !activeCategory && !homeDataLoading) {
      const firstCategory = categories[0]
      setActiveCategory(firstCategory._id || firstCategory.id)
    }
  }, [categories, activeCategory, homeDataLoading])

  useEffect(() => {
    if (activeCategory && !productsByCategory[activeCategory] && !productsLoading[activeCategory]) {
      dispatch(fetchProductsByCategory(activeCategory))
    }
  }, [activeCategory, productsByCategory, productsLoading, dispatch])

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 640)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (categories.length > 0 && shuffledCategories.length === 0) {
      const processed = categories.slice(0, 6).map((cat) => ({
        ...cat,
        _id: cat._id || cat.id,
        id: cat.id || cat._id,
        name: cat.name || "Unnamed Category",
        imageUrl: cat.imageUrl?.includes("example.com") ? FALLBACK_IMAGE : cat.imageUrl || FALLBACK_IMAGE,
      }))
      setShuffledCategories(shuffleArray(processed))
    }
  }, [categories])

  // Limit to maximum 5 products
  const currentProducts = (productsByCategory[activeCategory] || []).slice(0, 5).map((product) => ({
    ...product,
    imageUrl: product.imageUrl?.includes("example.com") ? FALLBACK_IMAGE : product.imageUrl || FALLBACK_IMAGE,
  }))

  const isLoadingCurrentCategory = activeCategory && productsLoading[activeCategory]

  const handlePrimaryCategoryClick = (categoryId) => setActiveCategory(categoryId)

  if (homeDataError) {
    return (
      <div className="px-4 py-8">
        <div className="bg-white rounded-2xl p-8 text-center shadow-xl border border-red-100">
          <div className="text-red-500 text-lg font-semibold mb-4">⚠️ Error loading data</div>
          <Button
            onClick={() => dispatch(fetchComprehensiveHomeData())}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 sm:p-6 lg:p-8 rounded-3xl border border-purple-100 shadow-2xl"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-4xl p-4 sm:p-6 lg:p-8 shadow-xl ring-1 ring-purple-100">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
                Trending Store Favorites
              </h1>
            </div>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Discover the most popular products across categories
            </p>

            <div className="flex gap-2 flex-wrap">
              {homeDataLoading ? (
                Array.from({ length: 6 }).map((_, idx) => <Skeleton key={idx} className="h-10 w-24 rounded-full" />)
              ) : (
                <AnimatePresence>
                  {shuffledCategories.map((category, index) => {
                    const categoryId = category._id || category.id
                    const isActive = activeCategory === categoryId
                    return (
                      <motion.div
                        key={categoryId}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          onClick={() => handlePrimaryCategoryClick(categoryId)}
                          className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
                            isActive
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg border-0"
                              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-md"
                          }`}
                        >
                          {category.name}
                        </Button>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              )}
            </div>
          </div>

          {!isSmallScreen && (
            <div className="hidden sm:block -mt-8 -mr-8">
              <img src="/card.svg" alt="Card" className="h-24 sm:h-32 lg:h-40 object-contain opacity-80" />
            </div>
          )}
        </div>

        <div className="mt-8">
          {isLoadingCurrentCategory ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Skeleton className="h-48 w-full rounded-2xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-3/4 rounded" />
                    <Skeleton className="h-3 w-1/2 rounded" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : currentProducts.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 max-w-md mx-auto shadow-lg">
                <p className="text-gray-500 text-lg mb-4">No products available</p>
                <Button
                  onClick={() => dispatch(fetchComprehensiveHomeData())}
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
            >
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product.id || product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="transition-transform duration-300"
                >
                  <SubProductRedux product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

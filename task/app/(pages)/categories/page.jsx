"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import useSWR from "swr"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid3X3,
  List,
  Search,
  Star,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Heart,
  ShoppingCart,
  Eye,
} from "lucide-react"
import CategoryFooter from "@/components/categories/CategoryFooter"
import Footer from "@/components/home/footer"
import Header from "@/components/home/Header"
import { Button } from "@/components/ui/button"
import SortSheet from "@/app/components/sortSheet"
import { useHome } from "@/lib/hooks/useHome"
import { fetcher } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import ProductCard from "@/components/subcategoryProduct/ProductCard"

export default function CategoryPage() {
  const { categories, categoriesLoading, allProducts, allProductsLoading, fetchCategories, fetchAllProducts } =
    useHome()

  const [sortOption, setSortOption] = useState("relevance")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [viewMode, setViewMode] = useState("grid")
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [showAllProducts, setShowAllProducts] = useState(false)

  // Randomized products for default view
  const shuffledProducts = useMemo(() => {
    if (!allProducts || !Array.isArray(allProducts)) return []
    const array = [...allProducts]
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }, [allProducts])

  const SORT_PARAM_MAP = {
    relevance: "relevance",
    price_low_high: "price_low_high",
    price_high_low: "price_high_low",
    newest: "newest",
    rating: "rating",
    popularity: "popularity",
    discount: "discount",
  }

  const apiSort = SORT_PARAM_MAP[sortOption] ?? "relevance"

  // Fetch sorted products with pagination
  const {
    data: sortedData,
    isLoading: sortedLoading,
    error: sortedError,
  } = useSWR(
    sortOption !== "relevance" ? `/lmd/api/v1/retail/catalogue?sort=${apiSort}&page=${page}&limit=${limit}` : null,
    fetcher,
  )

  const sortedProducts = sortedData?.products || sortedData?.data?.products || []

  const scrollRef = useRef(null)
  const [pageIndex, setPageIndex] = useState(0)
  const [needsScrolling, setNeedsScrolling] = useState(false)
  const itemsPerPage = 16
  const pageCount = Math.ceil(categories.length / itemsPerPage)

  useEffect(() => {
    fetchCategories()
    fetchAllProducts()
  }, [fetchCategories, fetchAllProducts])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const checkScroll = () => {
      const isScrollable = container.scrollWidth > container.clientWidth
      setNeedsScrolling(isScrollable)
    }

    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [categories])

  const pages = Array.from({ length: pageCount }, (_, i) => categories.slice(i * itemsPerPage, (i + 1) * itemsPerPage))

  const scroll = (direction) => {
    const container = scrollRef.current
    if (!container) return
    const width = container.offsetWidth
    const newIndex = direction === "left" ? Math.max(0, pageIndex - 1) : Math.min(pageCount - 1, pageIndex + 1)

    container.scrollTo({ left: width * newIndex, behavior: "smooth" })
    setPageIndex(newIndex)
  }

  const handleScroll = () => {
    const container = scrollRef.current
    if (!container) return
    const newIndex = Math.round(container.scrollLeft / container.offsetWidth)
    if (newIndex !== pageIndex) setPageIndex(newIndex)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
      <Header />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Page Header */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 mt-6"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Grid3X3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Explore Categories
                </h1>
                <p className="text-gray-600 text-sm">Discover amazing products across all categories</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-gray-600"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-gray-600"
                  }`}
                >
                  <List className="w-4 h-4" />
                </motion.button>
              </div>

              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:border-blue-300 transition-all duration-300"
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                </Button>
              </motion.div>

              <SortSheet
                onApply={(option, newLimit) => {
                  setSortOption(option)
                  if (newLimit) setLimit(newLimit)
                  setPage(1)
                }}
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Categories Carousel */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative px-4 sm:px-6 lg:px-8 mt-8"
      >
        {categoriesLoading ? (
          <div className="flex justify-center items-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        ) : (
          <>
            {needsScrolling && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => scroll("left")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-lg rounded-full p-3 shadow-xl border border-white/20 hover:bg-white transition-all duration-300"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => scroll("right")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-lg rounded-full p-3 shadow-xl border border-white/20 hover:bg-white transition-all duration-300"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </motion.button>
              </>
            )}

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="overflow-hidden scroll-smooth snap-x snap-mandatory"
            >
              <div className="flex w-full">
                {pages.map((page, idx) => (
                  <div
                    key={idx}
                    className="w-full shrink-0 snap-start px-6 py-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-center"
                  >
                    <AnimatePresence>
                      {page.map((cat, index) => (
                        <motion.div
                          key={cat._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <CategoryItem
                            category={cat}
                            isHovered={hoveredCategory === cat._id}
                            onHover={setHoveredCategory}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {pageCount > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {pages.map((_, i) => (
                  <motion.button
                    key={i}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => {
                      const container = scrollRef.current
                      if (container) {
                        container.scrollTo({ left: container.offsetWidth * i, behavior: "smooth" })
                        setPageIndex(i)
                      }
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === pageIndex
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </motion.section>

      {/* Banner */}
      {/* <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 mt-8"
      >
        <div className="relative aspect-[3.5/1] w-full rounded-2xl overflow-hidden shadow-2xl">
          <Image src="/categories/category-bg.png" alt="Category Background" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center text-white"
            >
              <h2 className="text-2xl sm:text-4xl font-bold mb-2">Discover Amazing Deals</h2>
              <p className="text-sm sm:text-lg opacity-90">Up to 70% off on selected categories</p>
            </motion.div>
          </div>
        </div>
      </motion.section> */}

      {/* Products */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Products</h3>
              <p className="text-gray-600">Handpicked items just for you</p>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowAllProducts(true)}
            className="hidden sm:flex items-center gap-2 text-blue-600 cursor-pointer"
          >
            <span className="font-medium">View All</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        {sortOption !== "relevance" ? (
          sortedLoading ? (
            <ProductSkeleton />
          ) : sortedProducts.length > 0 ? (
            <ProductGrid products={sortedProducts} viewMode={viewMode} />
          ) : (
            <NoProducts />
          )
        ) : allProductsLoading ? (
          <ProductSkeleton />
        ) : shuffledProducts.length > 0 ? (
          <ProductGrid products={shuffledProducts.slice(0, showAllProducts ? 40 : 12)} viewMode={viewMode} />
        ) : (
          <NoProducts />
        )}

        {/* Load More Button */}
        {sortOption !== "relevance" && sortedProducts.length >= limit && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-8">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setPage((prev) => prev + 1)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Load More Products
              </Button>
            </motion.div>
          </motion.div>
        )}
      </motion.section>

      <CategoryFooter />
      <Footer />
    </main>
  )
}

const CategoryItem = ({ category, isHovered, onHover }) => (
  <Link href={`/categories/${category.slug}`} className="group">
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => onHover(category._id)}
      onHoverEnd={() => onHover(null)}
      className="relative flex flex-col items-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 hover:shadow-xl transition-all duration-300 group-hover:bg-white"
    >
      {/* Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{ opacity: isHovered ? 1 : 0 }}
      />

      <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
        <motion.div
          animate={{ rotate: isHovered ? [0, 5, -5, 0] : 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full"
        >
          <Image
            src={category.imageUrl || "/categories/subcat/fallback-category.png"}
            alt={category.name}
            fill
            className="object-contain"
            unoptimized
          />
        </motion.div>
      </div>

      <motion.p
        className="relative z-10 text-center mt-3 text-sm font-medium transition-colors duration-200 line-clamp-2"
        animate={{
          color: isHovered ? "#1d4ed8" : "#374151",
          fontWeight: isHovered ? 600 : 500,
        }}
      >
        {category.name}
      </motion.p>

      {/* Hover Effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center z-20"
          >
            <ArrowRight className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </Link>
)

const ProductGrid = ({ products, viewMode }) => (
  <motion.div
    layout
    className={`grid gap-6 ${
      viewMode === "grid"
        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        : "grid-cols-1 gap-4"
    }`}
  >
    <AnimatePresence>
      {products.map((product, index) => (
        <motion.div
          key={product._id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: index * 0.05 }}
          className={viewMode === "list" ? "w-full" : ""}
        >
          <ProductCard product={product} viewMode={viewMode} />
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>
)

const EnhancedProductCard = ({ product, viewMode }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300 ${
        viewMode === "list" ? "flex gap-4 p-4" : "flex flex-col"
      }`}
    >
      {/* Product Image */}
      <div
        className={`relative ${viewMode === "list" ? "w-32 h-32 flex-shrink-0" : "aspect-square"} overflow-hidden ${viewMode === "grid" ? "rounded-t-2xl" : "rounded-xl"}`}
      >
        <Image
          src={product.images?.[0]?.url || "/placeholder.svg?height=200&width=200&query=product"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Overlay Actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2"
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-5 h-5 text-gray-700" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
              >
                <Heart className="w-5 h-5 text-gray-700" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-white" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={`${viewMode === "grid" ? "p-4" : "flex-1"}`}>
        <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">{product.name}</h4>

        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">
              {typeof product.rating === "object"
                ? product.rating.average || product.rating.count || "0"
                : product.rating}
            </span>
            {typeof product.rating === "object" && product.rating.count && (
              <span className="text-xs text-gray-400">({product.rating.count})</span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">₹{product.price?.toLocaleString() || "N/A"}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const ProductSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.05 }}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
      >
        <Skeleton className="aspect-square w-full rounded-xl mb-4" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2 mb-3" />
        <Skeleton className="h-5 w-2/3" />
      </motion.div>
    ))}
  </div>
)

const NoProducts = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
      <Search className="w-12 h-12 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
    <p className="text-gray-600">Try adjusting your filters or search terms</p>
  </motion.div>
)

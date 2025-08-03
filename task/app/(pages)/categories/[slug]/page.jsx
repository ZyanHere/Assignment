"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import useSWR from "swr"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight,
  Grid3X3,
  List,
  Search,
  Sparkles,
  ArrowLeft,
  Package,
  TrendingUp,
  ShoppingBag,
  Eye,
} from "lucide-react"
import Header from "@/components/home/Header"
import Footer from "@/components/home/footer"
import SubProduct from "@/components/subcategoryProduct/SubProduct"
import { useState, useEffect, useMemo } from "react"
import { fetcher } from "@/lib/api"
import SortSheet from "@/app/components/sortSheet"
import { Skeleton } from "@/components/ui/skeleton"
import FilterSheet from "@/app/components/filterSheet"
import { Button } from "@/components/ui/button"

const FilterButton = ({ children, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="px-4 py-2 text-sm bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white hover:border-blue-300 hover:shadow-md transition-all duration-300"
  >
    {children}
  </motion.button>
)

const SubcategorySkeleton = () => (
  <div className="flex flex-col gap-4 p-4">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1 }}
        className="flex items-center gap-3 p-3 bg-white/50 rounded-xl"
      >
        <Skeleton className="w-12 h-12 rounded-xl" />
        <Skeleton className="h-4 w-3/4" />
      </motion.div>
    ))}
  </div>
)

export default function CategorySlugPage() {
  const { slug } = useParams()

  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null)
  const [sortOption, setSortOption] = useState("relevance")
  const [sortOpen, setSortOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filtersOption, setFiltersOption] = useState(null)
  const [viewMode, setViewMode] = useState("grid")
  const [hoveredSubcategory, setHoveredSubcategory] = useState(null)

  /* Fetch all categories */
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: loadingCategories,
  } = useSWR(["/lmd/api/v1/retail/categories", false], ([url, withCredentials]) => fetcher(url, withCredentials), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60_000,
  })

  /* Find current category by slug */
  const category = useMemo(() => categoriesData?.data?.find((cat) => cat.slug === slug), [categoriesData?.data, slug])

  /* Fetch subcategories for category */
  const {
    data: subcategoriesData,
    error: subcategoriesError,
    isLoading: loadingSubcategories,
  } = useSWR(
    category ? [`/lmd/api/v1/retail/categories/${category._id}/subcategories`, false] : null,
    ([url, withCredentials]) => fetcher(url, withCredentials),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60_000,
    },
  )

  /* Auto-select first subcategory when loaded */
  useEffect(() => {
    if (subcategoriesData?.data?.length && !selectedSubcategoryId) {
      setSelectedSubcategoryId(subcategoriesData.data[0]._id)
    }
  }, [subcategoriesData, selectedSubcategoryId])

  /* Loading state */
  if (loadingCategories) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
        <Header />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Category</h2>
            <p className="text-gray-600">Please wait while we fetch the category details...</p>
          </div>
        </motion.div>
        <Footer />
      </div>
    )
  }

  /* Error / missing category */
  if (!category || categoriesError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 flex flex-col">
        <Header />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex items-center justify-center px-4"
        >
          <div className="text-center max-w-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center"
            >
              <Search className="w-12 h-12 text-red-500" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h2>
            <p className="text-gray-600 mb-8">The category you're looking for doesn't exist or has been moved.</p>
            <Link href="/categories">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Categories
              </Button>
            </Link>
          </div>
        </motion.div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
      <Header />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
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

      <main className="flex-1 w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.section initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="py-6 md:py-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
              {/* Breadcrumb */}
              <nav className="flex items-center text-sm sm:text-base">
                <Link
                  href="/categories"
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors font-medium text-gray-700"
                >
                  <Package className="w-4 h-4" />
                  Categories
                </Link>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 relative">
                    <Image
                      src={category.imageUrl || "/categories/default.png"}
                      alt={category.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-bold text-blue-600 truncate">{category.name}</span>
                </div>
              </nav>

              {/* Controls */}
              <div className="flex items-center gap-3">
                {/* View Mode Toggle */}
                {/* <div className="flex bg-gray-100 rounded-lg p-1">
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
                </div> */}

                <FilterSheet
                  open={filtersOpen}
                  onOpenChange={setFiltersOpen}
                  currentSort={filtersOption}
                  onApply={(option) => {
                    setFiltersOption(option)
                    setFiltersOpen(false)
                  }}
                />

                <SortSheet
                  open={sortOpen}
                  onOpenChange={setSortOpen}
                  currentSort={sortOption}
                  onApply={(option) => {
                    setSortOption(option)
                    setSortOpen(false)
                  }}
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Main Content */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-6 min-h-[600px] pb-8"
        >
          {/* Subcategories Sidebar */}
          <div className="w-full lg:w-80 xl:w-96">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Subcategories</h3>
                    <p className="text-sm text-gray-600">Choose a subcategory</p>
                  </div>
                </div>
              </div>

              <div className="max-h-[500px] overflow-y-auto">
                {loadingSubcategories ? (
                  <SubcategorySkeleton />
                ) : subcategoriesData?.data?.length > 0 ? (
                  <div className="p-4 space-y-2">
                    <AnimatePresence>
                      {subcategoriesData.data.map((sub, index) => (
                        <motion.div
                          key={sub._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedSubcategoryId(sub._id)}
                          onHoverStart={() => setHoveredSubcategory(sub._id)}
                          onHoverEnd={() => setHoveredSubcategory(null)}
                          className={`relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                            selectedSubcategoryId === sub._id
                              ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-md"
                              : "bg-white/50 hover:bg-white hover:shadow-md border border-gray-100"
                          }`}
                        >
                          {/* Selection Indicator */}
                          {selectedSubcategoryId === sub._id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"
                            />
                          )}

                          <div className="relative w-12 h-12 flex-shrink-0">
                            <motion.div
                              animate={{
                                rotate: hoveredSubcategory === sub._id ? [0, 5, -5, 0] : 0,
                              }}
                              transition={{ duration: 0.6 }}
                              className="w-full h-full"
                            >
                              <Image
                                src={sub.imageUrl || "/categories/default.png"}
                                alt={sub.name}
                                fill
                                className="object-contain rounded-lg"
                              />
                            </motion.div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <motion.p
                              animate={{
                                color: selectedSubcategoryId === sub._id ? "#2563eb" : "#374151",
                                fontWeight: selectedSubcategoryId === sub._id ? 600 : 500,
                              }}
                              className="text-sm truncate"
                            >
                              {sub.name}
                            </motion.p>
                            {sub.productCount && (
                              <p className="text-xs text-gray-500 mt-1">{sub.productCount} products</p>
                            )}
                          </div>

                          {/* Hover Arrow */}
                          <AnimatePresence>
                            {hoveredSubcategory === sub._id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                              >
                                <ChevronRight className="w-3 h-3 text-white" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">No subcategories found</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 min-h-[500px]">
              {selectedSubcategoryId ? (
                <div className="p-6">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Products</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Discover amazing products in{" "}
                      {subcategoriesData?.data?.find((sub) => sub._id === selectedSubcategoryId)?.name}
                    </p>
                  </motion.div>

                  <SubProduct
                    categoryId={category._id}
                    subCategoryId={selectedSubcategoryId}
                    sortOption={sortOption}
                    filtersOption={filtersOption}
                    viewMode={viewMode}
                  />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center h-full min-h-[400px]"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center"
                    >
                      <Eye className="w-10 h-10 text-blue-500" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Subcategory</h3>
                    <p className="text-gray-600">Choose a subcategory from the sidebar to view products</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}

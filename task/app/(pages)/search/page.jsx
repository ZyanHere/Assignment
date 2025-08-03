"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/home/Header";
import { useStableSearch } from "@/lib/hooks/search/useStableSearch";
import SearchFilters from "@/components/search/SearchFilters";
import SortOptions from "@/components/search/SortOptions";
import SearchResultCard from "@/components/search/SearchResultCard";
import PaginationWrapper from "@/components/search/PaginationWrapper";
import { Search, Filter, Grid, List, Sparkles } from "lucide-react";

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [viewMode, setViewMode] = useState("grid");

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || null,
    brand: searchParams.get("brand") || null,
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 5000,
    page: Number(searchParams.get("page")) || 1,
    limit: 12,
  });

  const { data, isLoading } = useStableSearch({
    q: searchQuery,
    filters,
  });

  const productData = data?.results?.find((res) => res.type === "product");
  const results = productData?.results || [];

  return (
    <>
      <Header />
      <FloatingParticles />

      <main className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 relative">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row gap-6"
          >
            {/* Left: Filters */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-80 lg:sticky lg:top-6 lg:h-fit"
            >
              <SearchFilters filters={filters} setFilters={setFilters} />
            </motion.aside>

            {/* Right: Search Results */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-1 min-w-0"
            >
              {/* Top: Header + Controls */}
              <div className="backdrop-blur-md bg-white/70 border border-white/20 rounded-2xl p-6 shadow-xl mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                        <Search className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                        Search Results
                      </h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Showing results for:{" "}
                      <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        "{searchQuery}"
                      </span>
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Sparkles className="w-4 h-4" />
                      <span>
                        Showing {(filters.page - 1) * filters.limit + 1} –{" "}
                        {Math.min(filters.page * filters.limit, results.length)}{" "}
                        of {results.length} results
                      </span>
                    </div>
                  </div>

                  {/* View Mode Toggle */}
                  {/* <div className="flex items-center gap-2">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-md transition-all duration-200 ${
                          viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-md transition-all duration-200 ${
                          viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div> */}
                </div>

                {/* Sort Options */}
                <div className="border-t border-gray-200 pt-4">
                  <SortOptions
                    currentSort={filters.sort || "relevance"}
                    onApply={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        sort: value,
                        page: 1, // reset to first page when sorting changes
                      }))
                    }
                  />
                </div>
              </div>

              {/* Results Grid/List */}
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="backdrop-blur-md bg-white/70 border border-white/20 rounded-2xl p-12 shadow-xl text-center"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
                        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-ping border-t-purple-400"></div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          Searching for products...
                        </p>
                        <p className="text-sm text-gray-500">
                          Finding the best matches for "{searchQuery}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : results.length > 0 ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className={`w-full ${
                      viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
                        : "flex flex-col gap-4"
                    }`}
                  >
                    {results.map((item, index) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="group"
                      >
                        <SearchResultCard item={item} viewMode={viewMode} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-results"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="backdrop-blur-md bg-white/70 border border-white/20 rounded-2xl p-12 shadow-xl text-center"
                  >
                    <div className="flex flex-col items-center gap-6">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                          <Search className="w-10 h-10 text-gray-400" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">0</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800">
                          No results found
                        </h3>
                        <p className="text-gray-600 max-w-md">
                          We couldn't find any products matching "{searchQuery}
                          ". Try adjusting your search terms or filters.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          Try different keywords
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          Check spelling
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          Remove filters
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pagination */}
              {results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="mt-8 flex justify-center"
                >
                  <div className="backdrop-blur-md bg-white/70 border border-white/20 rounded-2xl p-4 shadow-xl">
                    <PaginationWrapper
                      currentPage={filters.page}
                      totalPages={data?.meta?.totalPages || 1}
                      onPageChange={(newPage) =>
                        setFilters((prev) => ({ ...prev, page: newPage }))
                      }
                    />
                  </div>
                </motion.div>
              )}
            </motion.section>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default SearchPage;

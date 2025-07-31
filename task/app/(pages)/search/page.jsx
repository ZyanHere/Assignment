"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/home/Header";
import { useStableSearch } from "@/lib/hooks/search/useStableSearch";
import { sampleResults } from "@/data/sampleresults";
import SearchFilters from "@/components/search/SearchFilters";
import SortOptions from "@/components/search/SortOptions";
import SearchResultCard from "@/components/search/SearchResultCard";
import PaginationWrapper from "@/components/search/PaginationWrapper";


const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

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

      const productData = data?.results?.find((res) => res.type === 'product');

    const results = productData?.results || [];

  return (
    <>
      <Header />
      <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Filters */}
          <aside className="w-full lg:w-64 lg:sticky lg:top-6 lg:h-fit">
            <SearchFilters filters={filters} setFilters={setFilters} />
          </aside>

          {/* Right: Search Results */}
          <section className="flex-1 min-w-0">
            {/* Top: Header + Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                  Showing results for:{" "}
                  <span className="text-yellow-600">"{searchQuery}"</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Showing {(filters.page - 1) * filters.limit + 1} –{" "}
                  {(filters.page - 1) * filters.limit + results.length} of{" "}
                  {results.length} results
                </p>
              </div>
              
            </div>
            <div className="mb-4">
            <SortOptions />
            </div>

            <div className="mt-6"> 
            {/* Results Grid */}
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="w-full flex flex-wrap gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
                {results.map((item) => (
                  <SearchResultCard key={item._id} item={item} />
                ))}
              </div>
            )}
            </div>

            {/* Pagination */}
            <div className="mt-6 sm:mt-8 flex justify-center">
              <PaginationWrapper
                currentPage={filters.page}
                totalPages={data?.meta?.totalPages || 1}
                onPageChange={(newPage) =>
                  setFilters((prev) => ({ ...prev, page: newPage }))
                }
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default SearchPage;
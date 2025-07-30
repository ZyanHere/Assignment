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
    minPrice: searchParams.get("minPrice") || null,
    maxPrice: searchParams.get("maxPrice") || null,
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
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left: Filters */}
          <aside className="w-64">
            <SearchFilters filters={filters} setFilters={setFilters} />
          </aside>

          {/* Right: Search Results */}
          <section className="flex-1">
            {/* Top: Header + Sort */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Showing results for:{" "}
                  <span className="text-yellow-600">"{searchQuery}"</span>
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Showing {(filters.page - 1) * filters.limit + 1} –{" "}
                  {(filters.page - 1) * filters.limit + results.length} of{" "}
                  {results.length} results
                </p>
              </div>
              
            </div>
            <SortOptions />

            <div className="mt-6"> 
            {/* Results Grid */}
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {results.map((item) => (
                  <SearchResultCard key={item._id} item={item} />
                ))}
              </div>
            )}
            </div>

            {/* Pagination */}
            <div className="mt-8">
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
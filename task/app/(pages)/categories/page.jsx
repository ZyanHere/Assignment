"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import CategoryFooter from "@/components/categories/CategoryFooter";
import Footer from "@/components/home/footer";
import Header from "@/components/home/Header";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/subcategoryProduct/ProductCard";
import SortSheet from "@/app/components/sortSheet";
import { useHome } from "@/lib/hooks/useHome";
import { fetcher } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryPage() {
  const {
    categories,
    categoriesLoading,
    allProducts,
    allProductsLoading,
    fetchCategories,
    fetchAllProducts,
  } = useHome();

  const [sortOption, setSortOption] = useState("relevance");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  // Randomized products for default view
  const shuffledProducts = useMemo(() => {
    if (!allProducts || !Array.isArray(allProducts)) return [];
    const array = [...allProducts];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, [allProducts]);

  const SORT_PARAM_MAP = {
    relevance: "relevance",
    price_low_high: "price_low_high",
    price_high_low: "price_high_low",
    newest: "newest",
    rating: "rating",
    popularity: "popularity",
    discount: "discount",
  };

  const apiSort = SORT_PARAM_MAP[sortOption] ?? "relevance";

  // Fetch sorted products with pagination
  const {
    data: sortedData,
    isLoading: sortedLoading,
    error: sortedError,
  } = useSWR(
    sortOption !== "relevance"
      ? `/lmd/api/v1/retail/catalogue?sort=${apiSort}&page=${page}&limit=${limit}`
      : null,
    fetcher
  );

  if (sortedError) {
    console.error("Sorted fetch error:", sortedError);
  }

  const sortedProducts = sortedData?.products || sortedData?.data?.products || [];

  const scrollRef = useRef(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [needsScrolling, setNeedsScrolling] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Default to mobile (3 rows × 2 items)

  useEffect(() => {
    fetchCategories();
    fetchAllProducts();
  }, [fetchCategories, fetchAllProducts]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(6); // 3 rows × 2 items for mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(8); // 2 rows × 4 items for tablet
      } else {
        setItemsPerPage(12); // 2 rows × 6 items for desktop
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const pageCount = Math.ceil(categories.length / itemsPerPage);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const checkScroll = () => {
      const isScrollable = container.scrollWidth > container.clientWidth;
      setNeedsScrolling(isScrollable);
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [categories, itemsPerPage]);

  const pages = Array.from({ length: pageCount }, (_, i) =>
    categories.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
  );

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const width = container.offsetWidth;
    const newIndex =
      direction === "left"
        ? Math.max(0, pageIndex - 1)
        : Math.min(pageCount - 1, pageIndex + 1);

    container.scrollTo({ left: width * newIndex, behavior: "smooth" });
    setPageIndex(newIndex);
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const newIndex = Math.round(container.scrollLeft / container.offsetWidth);
    if (newIndex !== pageIndex) setPageIndex(newIndex);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Page Header */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-4 sm:mt-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
            Categories
          </h2>
          <div className="flex gap-2 sm:gap-3">
            <Button variant="outline" className="text-xs sm:text-sm px-3 sm:px-4 py-2">
              Filters
            </Button>
            <SortSheet
              onApply={(option, newLimit) => {
                setSortOption(option);
                if (newLimit) setLimit(newLimit);
                setPage(1);
              }}
            />
          </div>
        </div>
      </section>

      {/* Categories Carousel */}
      <section className="relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-6 sm:mt-8">
        {categoriesLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
          </div>
        ) : (
          <>
            {needsScrolling && (
              <>
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200"
                  aria-label="Scroll left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200"
                  aria-label="Scroll right"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}

            <div ref={scrollRef} onScroll={handleScroll} className="overflow-hidden scroll-smooth snap-x snap-mandatory">
              <div className="flex w-full">
                {pages.map((page, idx) => (
                  <div
                    key={idx}
                    className="w-full shrink-0 snap-start px-2 py-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
                  >
                    {page.map((cat) => (
                      <CategoryItem key={cat._id} category={cat} />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {pageCount > 1 && (
              <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
                {pages.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                      i === pageIndex ? "bg-yellow-400" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Banner */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-6 sm:mt-8">
        <div className="relative aspect-[3.5/1] w-full rounded-xl overflow-hidden">
          <Image 
            src="/categories/category-bg.png" 
            alt="Category Background" 
            fill 
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Products */}
      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-12">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
          Featured Products
        </h3>
        {sortOption !== "relevance" ? (
          sortedLoading ? (
            <ProductSkeleton />
          ) : sortedProducts.length > 0 ? (
            <ProductGrid products={sortedProducts} />
          ) : (
            <NoProducts />
          )
        ) : allProductsLoading ? (
          <ProductSkeleton />
        ) : shuffledProducts.length > 0 ? (
          <ProductGrid products={shuffledProducts.slice(0, 12)} />
        ) : (
          <NoProducts />
        )}

        {sortOption !== "relevance" && sortedProducts.length >= limit && (
          <div className="text-center mt-6">
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2"
            >
              Load More
            </Button>
          </div>
        )}
      </section>

      <CategoryFooter />
      <Footer />
    </main>
  );
}

const CategoryItem = ({ category }) => (
  <Link href={`/categories/${category.slug}`} className="group">
    <div className="flex flex-col items-center p-2 sm:p-3 hover:bg-gray-50 rounded-xl transition-all duration-200">
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center">
        <Image
          src={category.imageUrl || "/categories/subcat/fallback-category.png"}
          alt={category.name}
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <p className="text-center mt-2 text-xs sm:text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
        {category.name}
      </p>
    </div>
  </Link>
);

const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
    {products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
  </div>
);

const ProductSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="space-y-3">
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    ))}
  </div>
);

const NoProducts = () => (
  <div className="text-center text-gray-500 py-8 sm:py-12">No products found.</div>
);
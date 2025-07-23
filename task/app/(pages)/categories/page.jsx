"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import CategoryFooter from "@/components/categories/CategoryFooter";
import Footer from "@/components/home/footer";
import Header from "@/components/home/Header";
import CategoryCarousel from "@/components/categories/CategoryCarousel";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/subcategoryProduct/ProductCard";
import { useHome } from "@/lib/hooks/useHome";

export default function CategoryPage() {
  const { 
    categories, 
    categoriesLoading, 
    allProducts, 
    allProductsLoading,
    fetchCategories, 
    fetchAllProducts 
  } = useHome();

  // Randomizing products logic
  const shuffledProducts = useMemo(() => {
    if (!allProducts || !Array.isArray(allProducts)) return [];
    const array = [...allProducts];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, [allProducts]);
  
  const scrollRef = useRef(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [needsScrolling, setNeedsScrolling] = useState(false);
  const itemsPerPage = 16; // 8 * 2 layout
  const pageCount = Math.ceil(categories.length / itemsPerPage);

  // Fetch data on component mount
  useEffect(() => {
    fetchCategories();
    fetchAllProducts();
  }, [fetchCategories, fetchAllProducts]);

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
  }, [categories]);

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

      {/* Page Header Section */}
      <section className="w-full max-w-[1700px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 mt-4 sm:mt-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
            Categories
          </h2>
          <div className="flex gap-2 sm:gap-3">
            <Button 
              variant="outline" 
              className="text-xs sm:text-sm px-3 sm:px-4 py-2"
            >
              Filters
            </Button>
            <Button 
              variant="outline" 
              className="text-xs sm:text-sm px-3 sm:px-4 py-2"
            >
              Sort
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Carousel Section */}
      <section className="relative px-3 sm:px-4 md:px-6 lg:px-8 mt-6 sm:mt-8">
        {/* Loading State */}
        {categoriesLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
          </div>
        ) : (
          <>
            {/* Scroll buttons - only visible when scrolling is needed */}
            {needsScrolling && (
              <>
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200"
                  aria-label="Scroll left"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200"
                  aria-label="Scroll right"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
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
                    className="w-full shrink-0 snap-start px-3 sm:px-6 py-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 justify-center"
                  >
                    {page.map((cat) => (
                      <CategoryItem key={cat._id} category={cat} />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
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

      {/* Banner Section */}
      <section className="w-full max-w-[1700px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 mt-6 sm:mt-8">
        <div className="relative aspect-[3.5/1] w-full rounded-xl overflow-hidden">
          <Image
            src="/categories/category-bg.png"
            alt="Category Background"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Random Product Cards Section */}
      <section className="w-full max-w-[1700px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
          Featured Products
        </h3>
        {allProductsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-48 mb-2"></div>
                <div className="bg-gray-200 rounded h-4 mb-1"></div>
                <div className="bg-gray-200 rounded h-3 w-2/3"></div>
              </div>
            ))}
          </div>
        ) : shuffledProducts.length > 0 ? (
          <div className="flex overflow-x-auto gap-4 sm:gap-6 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:overflow-x-visible md:gap-6">
            {shuffledProducts.slice(0, 12).map((product) => {
              // Process images to handle S3 URLs with spaces
              const processedProduct = {
                ...product,
                images: Array.isArray(product.images)
                  ? product.images.map((img) => ({
                      ...img,
                      url: encodeURI(img.url),
                    }))
                  : product.images,
              };
              return (
                <div key={product._id} className="flex-shrink-0 w-64 snap-start md:w-auto">
                  <ProductCard product={processedProduct} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8 sm:py-12">
            No featured products found.
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

const FilterButton = ({ children }) => (
  <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
    {children}
  </button>
);

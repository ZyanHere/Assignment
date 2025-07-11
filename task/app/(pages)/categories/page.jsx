"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import CategoryFooter from "@/components/categories/CategoryFooter";
import Footer from "@/components/home/footer";
import Header from "@/components/home/Header";
import CategoryCarousel from "@/components/categories/CategoryCarousel";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/subcategoryProduct/ProductCard";

const API_URL = "https://lmd-user-2ky8.onrender.com/lmd/api/v1/retail/categories";
const API_PRODUCTS_URL = "https://lmd-user-2ky8.onrender.com/lmd/api/v1/retail/products";
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // move to .env.local

const fetcher = async (url) => {
  const res = await fetch(url, {
    headers: { Authorization: TOKEN },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};


// SWR fetcher for all products
const productsFetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};


export default function CategoryPage() {
  const { data, isLoading } = useSWR(API_URL, fetcher);
  const {data: ProductData} = useSWR(API_PRODUCTS_URL, productsFetcher);
  const categories = data?.data || [];
  

  // Randomizing products logic
  const shuffledProducts = useMemo(() => {
  if (!ProductData?.data || !Array.isArray(ProductData.data)) return [];
  const array = [...ProductData.data];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}, [ProductData?.data]);
  
  const scrollRef = useRef(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [needsScrolling, setNeedsScrolling] = useState(false);
  const itemsPerPage = 16; // 8 * 2 layout
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
    <main className="space-y-6 md:space-y-8">
      <Header />

      <section className="w-full max-w-[1700px] mx-auto px-4 md:px-6 mt-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Categories</h2>
        <div className="flex gap-2">
          <Button variant="outline">Filters</Button>
          <Button variant="outline">Sort</Button>
        </div>
      </section>

      <section className="relative px-4 md:px-6">
        {/* Scroll buttons - only visible when scrolling is needed */}
        {needsScrolling && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
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
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
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
          className="overflow-x-auto scroll-smooth snap-x snap-mandatory"
        >
          <div className="flex w-full">
            {pages.map((page, idx) => (
              <div
                key={idx}
                className="w-full shrink-0 snap-start px-2 py-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4 justify-center"
              >
                {page.map((cat) => (
                  <CategoryItem key={cat._id} category={cat} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-2 space-x-2">
          {pages.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === pageIndex ? "bg-yellow-400" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1700px] mx-auto px-4 md:px-6">
        <div className="relative aspect-[3.5/1] w-full rounded-xl overflow-hidden">
          <Image
            src="/categories/category-bg.png"
            alt="Category Background"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="w-full max-w-[1700px] mx-auto px-4 md:px-6 space-y-6">
        <CategoryCarousel data={[]} loading={isLoading} />
      </section>

      {/*Random Product Cards Section */}
      <section className="w-full max-w-[1700px] mx-auto px-4 md:px-6 py-8">
        {shuffledProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shuffledProducts.map((product) => {
              // Process images to handle S3 URLs with spaces (optional, as in SubProduct.jsx)
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
                <div key={product._id} className="flex gap-4">
                  <ProductCard product={processedProduct} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No products found.
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
    <div className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-xl transition-all">
      <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
        <Image
          src={category.imageUrl || "/categories/subcat/fallback-category.png"}
          alt={category.name}
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <p className="text-center mt-2 text-sm font-medium group-hover:text-blue-600">
        {category.name}
      </p>
    </div>
  </Link>
);
const FilterButton = ({ children }) => (
  <button className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-100 w-full md:w-auto justify-center">
    <Image src="/categories/icon.svg" alt="icon" width={20} height={20} />
    {children}
    <Image src="/categories/down.svg" alt="arrow" width={16} height={16} className="ml-2" />
  </button>
);

export { FilterButton };

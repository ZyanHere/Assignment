"use client";

import { useRef, useState, useEffect } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import CategoryFooter from "@/components/categories/CategoryFooter";
import Footer from "@/components/home/footer";
import Header from "@/components/home/Header";
import CategoryCarousel from "@/components/categories/CategoryCarousel";
import { Button } from "@/components/ui/button";

const API_URL = "https://lmd-user-2ky8.onrender.com/lmd/api/v1/retail/categories";
//const TOKEN ; // Store securely in .env.local

const fetcher = async (url) => {
  const res = await fetch(url, {
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export default function CategoryPage() {
  const { data, isLoading } = useSWR(API_URL, fetcher);
  const categories = data?.data || [];

  const scrollRef = useRef(null);
  const [pageIndex, setPageIndex] = useState(0);
  const itemsPerPage = 16;
  const pageCount = Math.ceil(categories.length / itemsPerPage);

  const pages = Array.from({ length: pageCount }, (_, i) =>
    categories.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
  );

  const handleArrow = (dir) => {
    const container = scrollRef.current;
    if (!container) return;
    const width = container.offsetWidth;
    const newIndex = Math.max(0, Math.min(pageIndex + dir, pageCount - 1));
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

      {/* Carousel */}
      <section className="relative px-4 md:px-6">
        {/* Arrows */}
        <button
          className="absolute top-1/2 left-0 z-10 -translate-y-1/2 bg-white border rounded-full shadow p-2"
          onClick={() => handleArrow(-1)}
        >
          ◀️
        </button>
        <button
          className="absolute top-1/2 right-0 z-10 -translate-y-1/2 bg-white border rounded-full shadow p-2"
          onClick={() => handleArrow(1)}
        >
          ▶️
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="overflow-x-auto scroll-smooth snap-x snap-mandatory"
        >
          <div className="flex w-full">
            {pages.map((page, idx) => (
              <div
                key={idx}
                className="w-full shrink-0 snap-start px-2 py-4 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4 justify-center"
              >
                {page.map((cat) => (
                  <CategoryItem key={cat._id} category={cat} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
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

      {/* Banner */}
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

      {/* Optional carousels */}
      <section className="w-full max-w-[1700px] mx-auto px-4 md:px-6 space-y-6">
        <CategoryCarousel data={[]} loading={isLoading} />
        <CategoryCarousel data={[]} loading={isLoading} />
      </section>

      <CategoryFooter />
      <Footer />
    </main>
  );
}

// Category card
const CategoryItem = ({ category }) => (
  <Link href={`/categories/${category.slug}`} className="group">
    <div className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-xl transition-all">
      <div className="relative w-14 h-14 md:w-20 md:h-20 lg:w-20 lg:h-20">
        <Image
          src={category.imageUrl || "/categories/subcat/fallback-category.png"}
          alt={category.name}
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <p className="text-center mt-2 text-xs md:text-sm font-medium group-hover:text-blue-600">
        {category.name}
      </p>
    </div>
  </Link>
);

// You can remove this if unused
const FilterButton = ({ children }) => (
  <button className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-100 w-full md:w-auto justify-center">
    <Image src="/categories/icon.svg" alt="icon" width={20} height={20} />
    {children}
    <Image src="/categories/down.svg" alt="arrow" width={16} height={16} className="ml-2" />
  </button>
);

export { FilterButton };
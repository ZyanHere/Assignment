"use client";

import CategoryCarousel from "@/components/categories/CategoryCarousel";
import CategoryFooter from "@/components/categories/CategoryFooter";
import Footer from "@/components/home/footer";
import Header from "@/components/home/Header";
import categoryData from "@/data/categoryData";
import Image from "next/image";
import Link from "next/link";

const CategoryPage = () => {
  return (
    <main className="space-y-6 md:space-y-8">
      <Header />

      {/* Breadcrumb + Filters */}
      <section className="w-full max-w-[1700px] mx-auto px-4 md:px-6 mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <nav className="text-xl font-semibold text-black">
          <Link href="/categories" className="hover:underline">
            Categories
          </Link>
        </nav>
        <div className="flex gap-2 w-full md:w-auto justify-center md:justify-end">
          <FilterButton>Filters</FilterButton>
          <FilterButton>Sort</FilterButton>
        </div>
      </section>

      {/* Categories grid */}
      <section className="w-full max-w-[1700px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {Object.entries(categoryData).map(([slug, category]) => (
            <CategoryItem key={slug} slug={slug} category={category} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="w-full max-w-[1700px] mx-auto px-4 md:px-6">
        <ResponsivePromoBanner />
      </section>

      {/* Carousels */}
      <section className="w-full max-w-[1700px] mx-auto px-4 md:px-6 space-y-6">
        <CategoryCarousel />
        <CategoryCarousel />
      </section>

      <CategoryFooter />
      <Footer/>
    </main>
  );
};

export const FilterButton = ({ children }) => (
  <button className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-100 w-full md:w-auto justify-center">
    <Image
      src="/categories/icon.svg"
      alt="icon"
      width={20}
      height={20}
      className="shrink-0"
    />
    {children}
    <Image
      src="/categories/down.svg"
      alt="arrow"
      width={16}
      height={16}
      className="ml-2"
    />
  </button>
);

const CategoryItem = ({ slug, category }) => (
  <Link href={`/categories/${slug}`} className="group">
    <div className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-xl transition-all">
      <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-contain"
        />
      </div>
      <p
        className={`text-center mt-2 text-sm md:text-base font-medium ${
          slug === "all" ? "text-yellow-400" : "group-hover:text-blue-600"
        }`}
      >
        {category.name}
      </p>
    </div>
  </Link>
);

const ResponsivePromoBanner = () => (
  <div className="relative aspect-[3.5/1] w-full rounded-xl overflow-hidden">
    <Image
      src="/categories/category-bg.png"
      alt="Category Background"
      fill
      className="object-cover"
    />
  </div>
);

export default CategoryPage;

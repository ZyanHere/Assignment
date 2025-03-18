"use client";

import CategoryCarousel from "@/components/categories/CategoryCarousel";
import CategoryFooter from "@/components/categories/CategoryFooter";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";
import categoryData from "@/data/categoryData";
import Image from "next/image";
import Link from "next/link";

const CategoryPage = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-6">
          <div className="flex justify-between items-center px-6 py-1 ">
            {/* breadcrumb */}
            <nav className="mb-4 text-2xl">
              <Link href="/stores" className="hover:underline font-medium">
                Categories
              </Link>
            </nav>

            {/* Filters and Sort Buttons */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-100">
                <img
                  src="/categories/icon.svg"
                  alt="Filter"
                  width={20}
                  height={20}
                />
                Filters
                <img
                  src="/categories/down.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                  className="ml-5"
                />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-100 ml-4">
                <img
                  src="/categories/icon.svg"
                  alt="Sort"
                  width={20}
                  height={20}
                />
                Sort
                <img
                  src="/categories/down.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                  className="ml-5"
                />
              </button>
            </div>
          </div>

          {/* categories */}
          <div className="grid grid-cols-8 gap-6 px-8 mt-2">
            {categoryData.map((category) => {
              const isAllCategory = category.slug === "all";
              return isAllCategory ? (
                // "all" category stays on the same page
                <div key={category.slug} className="flex flex-col items-center">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={100}
                    height={100}
                    className="w-24 h-18 object-contain"
                  />
                  <p className="text-center mt-2 font-bold text-yellow-400">
                    {category.name}
                  </p>
                </div>
              ) : (
                // other categories to slug
                <Link key={category.slug} href={"/category/${category.slug}"}>
                  <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={100}
                      height={100}
                      className="w-24 h-18 object-contain"
                    />
                    <p className="text-center mt-2 font-semibold">
                      {category.name}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <Image
              src="/categories/category-bg.png"
              alt="Category Background"
              width={1400}
              height={400}
              className="w-[1500px] h-[400px] max-w-full object-cover"
            />
          </div>

          <div className="p-8">
            <CategoryCarousel />
          </div>
          <div className="p-8">
            <CategoryCarousel />
          </div>
          
          <CategoryFooter/>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

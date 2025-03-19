"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/home/sidebar";
import Header from "@/components/home/Header";
import categoryData from "@/data/categoryData";
import CategoryCarousel from "@/components/categories/CategoryCarousel";

const CategorySlugPage = () => {
  const { slug } = useParams();

  // Find the selected category based on the slug -------> this is for arraysearch
  // const category = categoryData.find((cat) => cat.slug === slug)

  const category = categoryData[slug];

  if (!category) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 text-2xl">
        Category not found
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-6">
          <div className="flex justify-between items-center px-6 py-1 ">
            {/* breadcrumb */}
            <nav className="mb-4 text-2xl">
              <Link href="/categories" className="hover:underline font-medium">
                Categories
              </Link>
              <span className="mx-2 text-gray-400">&gt;</span>
              <span className="font-semibold text-yellow-500">
                {category.name}
              </span>
            </nav>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-100">
                <Image
                  src="/categories/icon.svg"
                  alt="Filter"
                  width={20}
                  height={20}
                />
                Filters
                <Image
                  src="/categories/down.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                  className="ml-5"
                />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-100 ml-4">
                <Image
                  src="/categories/icon.svg"
                  alt="Sort"
                  width={20}
                  height={20}
                />
                Sort
                <Image
                  src="/categories/down.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                  className="ml-5"
                />
              </button>
            </div>
          </div>
          {/* subcategories */}
          <div className="grid grid-cols-5 gap-6 px-8 mt-4">
            {category.subcategories?.map((sub) => (
              <Link key={sub.slug} href={`/categories/${slug}/${sub.slug}`}>
                <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition">
                  <Image
                    src={sub.image || "/categories/default.png"}
                    alt={sub.name}
                    width={100}
                    height={100}
                    className="w-24 h-18 object-contain"
                  />
                  <p className="text-center mt-2 font-semibold">{sub.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="p-8">
            <CategoryCarousel />
          </div>
          <div className="p-8">
            <CategoryCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlugPage;

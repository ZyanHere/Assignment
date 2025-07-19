"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import SubProduct from "@/components/subcategoryProduct/SubProduct";
import { useState, useEffect, useMemo } from "react";
import { fetcher } from "@/lib/api";

const FilterButton = ({ children }) => (
  <button className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
    {children}
  </button>
);

export default function CategorySlugTopLayoutPage() {
  const { slug } = useParams();
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: loadingCategories,
  } = useSWR("/lmd/api/v1/retail/categories", fetcher);

  const category = useMemo(() => {
    return categoriesData?.data?.find((cat) => cat.slug === slug);
  }, [categoriesData?.data, slug]);

  const {
    data: subcategoriesData,
    error: subcategoriesError,
    isLoading: loadingSubcategories,
  } = useSWR(
    category ? `/lmd/api/v1/retail/categories/${category._id}/subcategories` : null,
    fetcher
  );

  useEffect(() => {
    if (
      subcategoriesData?.data?.length > 0 &&
      !selectedSubcategory
    ) {
      setSelectedSubcategory(subcategoriesData.data[0]._id);
    }
  }, [subcategoriesData, selectedSubcategory]);

  if (loadingCategories) {
    return <div className="text-center py-12">Loading category...</div>;
  }

  if (!category || categoriesError) {
    return <div className="text-center py-12 text-red-500">Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="w-full max-w-[1700px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <section className="py-4 sm:py-6 md:py-8">
          <nav className="flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
            <Link
              href="/categories"
              className="hover:underline font-medium text-gray-700 hover:text-yellow-600 transition-colors"
            >
              Categories
            </Link>
            <span className="mx-2 sm:mx-3 text-gray-400">&gt;</span>
            <span className="font-semibold text-yellow-500 truncate">{category.name}</span>
          </nav>
        </section>

        {/* Subcategories Top Horizontal */}
        <section className="overflow-x-auto whitespace-nowrap flex gap-3 sm:gap-5 border-b border-gray-200 py-4 justify-center">
          {subcategoriesData?.data?.map((sub) => (
            <div
              key={sub._id}
              onClick={() => setSelectedSubcategory(sub._id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 cursor-pointer rounded-md transition-all ${
                selectedSubcategory === sub._id
                  ? "bg-yellow-100 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                <Image
                  src={sub.imageUrl || "/categories/default.png"}
                  alt={sub.name}
                  fill
                  className="object-contain rounded"
                />
              </div>
              <p className="text-xs sm:text-sm text-center text-gray-700 truncate w-20">{sub.name}</p>
            </div>
          ))}
        </section>

        {/* Selected Subcategory Products */}
        <section className="mt-6">
          {selectedSubcategory && (
            <SubProduct subCategoryId={selectedSubcategory} />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

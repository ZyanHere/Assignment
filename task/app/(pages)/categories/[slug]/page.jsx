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

export default function CategorySlugTopLayoutPage() {
  const { slug } = useParams();
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [sortOption, setSortOption] = useState('best-match');

  const sortOptions = [
    { value: 'best-match', label: 'Best Match' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'rating', label: 'Customer Rating' },
  ];

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
    isLoading: loadingSubcategories,
  } = useSWR(
    category ? `/lmd/api/v1/retail/categories/${category._id}/subcategories` : null,
    fetcher
  );

  useEffect(() => {
    if (subcategoriesData?.data?.length > 0 && !selectedSubcategory) {
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
        {/* Breadcrumb & Sorting Section */}
        <section className="py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            {/* Breadcrumb Navigation (Left side) */}
            <nav className="flex items-center text-sm sm:text-base">
              <Link
                href="/categories"
                className="hover:underline font-medium text-gray-700 hover:text-yellow-600 transition-colors"
              >
                Categories
              </Link>
              <span className="mx-2 sm:mx-3 text-gray-400">&gt;</span>
              <span className="font-semibold text-yellow-500 truncate">{category.name}</span>
            </nav>

            {/* Sorting Pills (Right side) */}
            <div className="flex flex-wrap gap-2 justify-start sm:justify-end max-w-md">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortOption(option.value)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 ${
                    sortOption === option.value
                      ? 'bg-yellow-400 text-black shadow'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Subcategories Top Horizontal */}
        <section className="overflow-x-auto whitespace-nowrap flex gap-3 sm:gap-5 border-b border-gray-200 py-4 justify-center">
          {loadingSubcategories ? (
            <p className="text-gray-500">Loading subcategories...</p>
          ) : (
            subcategoriesData?.data?.map((sub) => (
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
            ))
          )}
        </section>

        {/* Selected Subcategory Products */}
        <section className="mt-6">
          {selectedSubcategory && (
            <SubProduct subCategoryId={selectedSubcategory} sortOption={sortOption} />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
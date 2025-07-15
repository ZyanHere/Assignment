"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import CategoryCarousel from "@/components/categories/CategoryCarousel";
import SubProduct from "@/components/subcategoryProduct/SubProduct";
import { useState, useEffect, useMemo } from "react";
import { fetcher } from "@/lib/api";

// Simple FilterButton component
const FilterButton = ({ children }) => (
  <button className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
    {children}
  </button>
);

// Loading skeleton for subcategories
const SubcategorySkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 px-3 sm:px-4 md:px-6 lg:px-8 mt-6">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-gray-200 rounded-lg mx-auto mb-2"></div>
        <div className="bg-gray-200 rounded h-3 w-full"></div>
      </div>
    ))}
  </div>
);

export default function CategorySlugPage() {
  const { slug } = useParams();
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Fetch all categories with caching
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: loadingCategories,
  } = useSWR("/lmd/api/v1/retail/categories", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000, // Cache for 1 minute
  });

  // Memoize category to prevent unnecessary re-renders
  const category = useMemo(() => {
    return categoriesData?.data?.find((cat) => cat.slug === slug);
  }, [categoriesData?.data, slug]);

  // Fetch subcategories of the matched category
  const {
    data: subcategoriesData,
    error: subcategoriesError,
    isLoading: loadingSubcategories,
  } = useSWR(
    category ? `/lmd/api/v1/retail/categories/${category._id}/subcategories` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  // Auto-select first subcategory when data loads
  useEffect(() => {
    if (
      subcategoriesData?.data?.length > 0 &&
      !selectedSubcategory
    ) {
      setSelectedSubcategory(subcategoriesData.data[0]._id);
    }
  }, [subcategoriesData, selectedSubcategory]);

  // Loading state
  if (loadingCategories) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading category...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (!category || categoriesError) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-red-500 mb-2">
              Category not found
            </h2>
            <p className="text-gray-600 mb-4">The category you're looking for doesn't exist.</p>
            <Link
              href="/categories"
              className="inline-block px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Back to Categories
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-[1700px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Breadcrumb + Filters */}
        <section className="py-4 sm:py-6 md:py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center text-sm sm:text-base md:text-lg lg:text-xl">
              <Link
                href="/categories"
                className="hover:underline font-medium text-gray-700 hover:text-yellow-600 transition-colors"
              >
                Categories
              </Link>
              <span className="mx-2 sm:mx-3 text-gray-400">&gt;</span>
              <span className="font-semibold text-yellow-500 truncate">
                {category.name}
              </span>
            </nav>

            {/* Filter Buttons */}
            <div className="flex gap-2 sm:gap-3">
              <FilterButton>Filters</FilterButton>
              <FilterButton>Sort</FilterButton>
            </div>
          </div>
        </section>

        {/* Subcategories Grid */}
        <section className="flex flex-1 overflow-hidden min-h-[500px] sm:min-h-[600px]">
          <div className="w-1/4 sm:w-1/6 overflow-y-auto max-h-[80vh]">
            {loadingSubcategories ? (
              <div className="p-4">
                <SubcategorySkeleton />
              </div>
            ) : subcategoriesData?.data?.length > 0 ? (
              <div className="flex flex-col p-2 gap-2">
                {subcategoriesData.data.map((sub) => (
                  <div
                    key={sub._id}
                    onClick={() => setSelectedSubcategory(sub._id)}
                    className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all ${selectedSubcategory === sub._id
                        ? "bg-yellow-100 font-semibold"
                        : "hover:bg-gray-100"
                      }`}
                  >
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <Image
                        src={sub.imageUrl || "/categories/default.png"}
                        alt={sub.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-gray-700">{sub.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-sm p-4 text-center">
                No subcategories found
              </div>
            )}
          </div>
          <div className="w-[2px] bg-gray-300" />
          <div className="flex-1 overflow-y-auto max-h-[80vh] p-3 sm:p-5">
            {/* Products for selected subcate gory */}
            {selectedSubcategory && (
              <section className="mb-8 sm:mb-12">
                <SubProduct subCategoryId={selectedSubcategory} />
              </section>
            )}
          </div>
        </section>



        {/* Optional carousels - commented out for performance */}
        {/* <section className="mt-8 sm:mt-12">
          <CategoryCarousel />
        </section> */}
      </main>

      <Footer />
    </div>
  );
}

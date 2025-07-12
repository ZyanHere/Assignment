"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import CategoryCarousel from "@/components/categories/CategoryCarousel";
import { FilterButton } from "../page";
import SubProduct from "@/components/subcategoryProduct/SubProduct";
import { useState, useEffect } from "react";
import { fetcher } from "@/lib/api";

export default function CategorySlugPage() {
  const { slug } = useParams();
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Fetch all categories
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: loadingCategories,
  } = useSWR("/lmd/api/v1/retail/categories", fetcher);
  console.log(categoriesData);
  console.log(categoriesError);
  const category = categoriesData?.data?.find((cat) => cat.slug === slug);
  console.log(category);
  // Fetch subcategories of the matched category
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

  if (loadingCategories || loadingSubcategories) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  if (!category || categoriesError) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 text-2xl">
        Subcategory not found
      </div>
    );
  }

  return (
    <div className="flex-1">
      <Header />

      <div className="p-6 w-full max-w-[1700px] mx-auto">
        {/* Breadcrumb + Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2 md:px-6 py-1">
          <nav className="mb-4 text-2xl">
            <Link href="/categories" className="hover:underline font-medium">
              Categories
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="font-semibold text-yellow-500">
              {category.name}
            </span>
          </nav>

          <div className="flex gap-2 w-full md:w-auto">
            <FilterButton>Filters</FilterButton>
            <FilterButton>Sort</FilterButton>
          </div>
        </div>

        {/* Subcategories Grid */}
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 px-2 md:px-8 mt-6">
          {subcategoriesData?.data?.map((sub) => (
            <div
              key={sub._id}
              className={`group cursor-pointer flex flex-col items-center p-1 md:p-2 rounded-lg transition-all border ${
                selectedSubcategory === sub._id
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-transparent hover:bg-gray-50"
              }`}
              onClick={() => setSelectedSubcategory(sub._id)}
              tabIndex={0}
              role="button"
              aria-pressed={selectedSubcategory === sub._id}
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 xl:w-24 xl:h-24">
                <Image
                  src={sub.imageUrl || "/categories/default.png"}
                  alt={sub.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <p className="text-center mt-1 text-xs sm:text-sm md:text-base font-medium group-hover:text-blue-600">
                {sub.name}
              </p>
            </div>
          ))}
        </div>

        {/* Products for selected subcategory */}
        {selectedSubcategory && (
          <div className="mt-8">
            <SubProduct subCategoryId={selectedSubcategory} />
          </div>
        )}

        {/* Optional carousels
        <div className="mt-8">
          <CategoryCarousel />
        </div>
        <div>
          <CategoryCarousel />
        </div> */}

        <Footer />
      </div>
    </div>
  );
}

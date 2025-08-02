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
import SortSheet from "@/app/components/sortSheet";
import { Skeleton } from "@/components/ui/skeleton";
import FilterSheet from "@/app/components/filterSheet";


const FilterButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
  >
    {children}
  </button>
);

const SubcategorySkeleton = () => (
  <div className="flex flex-col gap-4 p-2">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-md" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    ))}
  </div>
);

export default function CategorySlugPage() {
  const { slug } = useParams();

  // which subcategory is active?
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);

  console.log(selectedSubcategoryId);
  // current sort
  const [sortOption, setSortOption] = useState("relevance");
  // control SortSheet open/close
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filtersOption, setFiltersOption] = useState(null);
  console.log('Filters Options', filtersOption);
  /* ---------------- Fetch all categories (for slug lookup) ---------------- */
  const {
  data: categoriesData,
  error: categoriesError,
  isLoading: loadingCategories,
} = useSWR(
  ["/lmd/api/v1/retail/categories", false], // false = no credentials
  ([url, withCredentials]) => fetcher(url, withCredentials),
  {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60_000,
  }
);

  /* ---------------- Find current category by slug ---------------- */
  const category = useMemo(
    () => categoriesData?.data?.find((cat) => cat.slug === slug),
    [categoriesData?.data, slug]
  );

  /* ---------------- Fetch subcategories for category ---------------- */
const {
  data: subcategoriesData,
  error: subcategoriesError,
  isLoading: loadingSubcategories,
} = useSWR(
  category
    ? [`/lmd/api/v1/retail/categories/${category._id}/subcategories`, false]
    : null,
  ([url, withCredentials]) => fetcher(url, withCredentials),
  {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60_000,
  }
);

  // const queryUrl = useMemo(() => {
  //   if (!category) return null;

  //   const queryParams = new URLSearchParams();

  //   queryParams.append("category", category._id);
  //   if (selectedSubcategoryId) queryParams.append("subcategory", selectedSubcategoryId);
  //   if (filtersOption?.priceRange?.min !== undefined) queryParams.append("minPrice", filtersOption.priceRange.min);
  //   if (filtersOption?.priceRange?.max !== null && filtersOption?.priceRange?.max !== undefined) queryParams.append("maxPrice", filtersOption.priceRange.max);
  //   if (filtersOption?.rating !== undefined) queryParams.append("minRating", filtersOption.rating);
  //   if (filtersOption?.availability !== undefined) queryParams.append("inStock", filtersOption.availability);

  //   return `/lmd/api/v1/retail/products?${queryParams.toString()}`;
  // }, [category, selectedSubcategoryId, filtersOption]);


  // const {
  //   data: filteredData,
  //   error: filteredDataError,
  //   isLoading: loadingFilteredData
  // } = useSWR(queryUrl, fetcher, {
  //   revalidateOnFocus: false,
  //   revalidateOnReconnect: false,
  //   dedupingInterval: 60_000,
  // });
  /* ---------------- Auto-select first subcategory when loaded ---------------- */
  useEffect(() => {
    if (subcategoriesData?.data?.length && !selectedSubcategoryId) {
      setSelectedSubcategoryId(subcategoriesData.data[0]._id);
    }
  }, [subcategoriesData, selectedSubcategoryId]);

  /* ---------------- Loading state (categories) ---------------- */
  if (loadingCategories) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4" />
            <p className="text-gray-600">Loading category...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  /* ---------------- Error / missing category ---------------- */
  if (!category || categoriesError) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-red-500 mb-2">
              Category not found
            </h2>
            <p className="text-gray-600 mb-4">
              The category you're looking for doesn't exist.
            </p>
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

  /* ---------------- Render page ---------------- */
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-[1700px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Breadcrumb + Filters */}
        <section className="py-4 sm:py-6 md:py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
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

            <div className="flex gap-2 sm:gap-3">
              <FilterSheet
                open={filtersOpen}
                onOpenChange={setFiltersOpen}
                currentSort={filtersOption}
                onApply={(option) => {
                  setFiltersOption(option);
                  setFiltersOpen(false);
                }}
              />
              <SortSheet
                open={filtersOpen}
                onOpenChange={setFiltersOpen}
                currentSort={sortOption}
                onApply={(option) => {
                  setSortOption(option);
                  setSortOpen(false);
                }}
              />
            </div>
          </div>
        </section>

        {/* Subcategories list + Products grid */}
        <section className="flex flex-1 overflow-hidden min-h-[500px] sm:min-h-[600px]">
          {/* Left: subcategory list */}
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
                    onClick={() => setSelectedSubcategoryId(sub._id)}
                    className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all ${selectedSubcategoryId === sub._id
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

          {/* Divider */}
          <div className="w-[2px] bg-gray-300" />

          {/* Right: products */}
          <div className="flex-1 overflow-y-auto max-h-[80vh] p-3 sm:p-5">
            {selectedSubcategoryId && (
              <SubProduct
                categoryId={category._id}
                subCategoryId={selectedSubcategoryId}
                sortOption={sortOption}
                filtersOption={filtersOption}
              />
            )}
          </div>
        </section>

        {/* Optional carousels – keep commented if heavy */}
        {/* <section className="mt-8 sm:mt-12">
          <CategoryCarousel />
        </section> */}
      </main>

      <Footer />
    </div>
  );
}

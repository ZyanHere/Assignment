"use client";

import useSWR from "swr";
import ProductCard from "./ProductCard";
import { fetcher } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

/* Map UI sort choices to backend params (adjust if backend uses different tokens) */
const SORT_PARAM_MAP = {
  relevance: null, // omit so backend natural order / relevance default
  price_low_high: "price_low_high",
  price_high_low: "price_high_low",
  newest: "newest",
  rating: "rating",
  popularity: "popularity",
  discount: "discount",
};

/* Build endpoint */
function buildUrl(categoryId, subCategoryId, sortOption, filtersOption = null, page = 1, limit = 20) {
  if (!subCategoryId) return null;
  const params = new URLSearchParams();
  params.set("category", categoryId);
  if (subCategoryId) params.set("subcategory", subCategoryId);

  // Pagination
  params.set("page", page);
  params.set("limit", limit);
  const apiSort = SORT_PARAM_MAP[sortOption] ?? null;
  if (apiSort) params.set("sort", apiSort);
  // Price filters
  if (filtersOption?.priceRange?.min !== undefined) {
    params.set("minPrice", filtersOption.priceRange.min);
  }
  if (filtersOption?.priceRange?.max !== null && filtersOption?.priceRange?.max !== undefined) {
    params.set("maxPrice", filtersOption.priceRange.max);
  }


  return `/lmd/api/v1/retail/products?${params.toString()}`;
}

export default function SubProduct({
  categoryId,
  subCategoryId,
  sortOption = "relevance",
  filtersOption = null,
  page = 1,
  limit = 20,
}) {
  const swrKey = buildUrl(categoryId, subCategoryId, sortOption, filtersOption, page, limit);

  const { data, error, isLoading } = useSWR(swrKey, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  if (process.env.NEXT_PUBLIC_DEBUG_API === "true") {
    console.log("[SubProduct] key:", swrKey);
    console.log("[SubProduct] resp:", data);
    console.log("[SubProduct] error:", error);
  }

  /* Defensive extract */
  const products = useMemo(() => {
    if (!data) return [];
    // API you uploaded returns {data: [...]}. :contentReference[oaicite:1]{index=1}
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.products)) return data.products;
    if (Array.isArray(data.data?.products)) return data.data.products;
    return [];
  }, [data]);

  /* Loading */
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  /* Error */
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 text-sm">Failed to load products.</p>
      </div>
    );
  }

  /* Empty */
  if (!products.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">
          No products found in this subcategory.
        </p>
      </div>
    );
  }

  /* Normalize product objects for ProductCard compatibility
     Your current SubProduct already encoded image URLs & passed to ProductCard. :contentReference[oaicite:2]{index=2}
  */
  const normalized = products.map((product) => {
    // choose an image: top-level product.image OR first product.images OR first variant image
    const fallbackImg =
      product?.image ||
      product?.images?.[0]?.url ||
      product?.variants?.[0]?.images?.[0]?.url ||
      "/fallback.png";

    const safeImages = Array.isArray(product.images)
      ? product.images.map((img) => ({
        ...img,
        url: encodeURI(img.url),
      }))
      : product.images;

    return {
      ...product,
      image: encodeURI(fallbackImg),
      images: safeImages,
    };
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
      {normalized.map((product) => (
        <div key={product._id} className="flex gap-4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

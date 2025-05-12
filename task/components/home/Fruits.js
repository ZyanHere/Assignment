"use client";

import useSWR from "swr";
import FruitsCard from "./FruitsCard";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { fetcher } from "@/lib/api";

const FruitsTabContent = () => {
  const { data: products, error, isLoading, mutate } = useSWR(
    "/lmd/api/v1/products/Fruits",
    fetcher
  );

  if (isLoading) {
    return (
      <div className="p-6 lg:px-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-[350px] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Failed to fetch Fruits products:", error);
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">Failed to load Fruits products.</p>
        <Button onClick={() => mutate()} className="bg-blue-500 text-white">
          Retry
        </Button>
      </div>
    );
  }

  const safeProducts = Array.isArray(products)
    ? products.filter((p) => p && p.id && p.name && p.discountedPrice && p.originalPrice && p.image)
    : [];

  return (
    <div className="p-6 lg:px-16">
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 max-h-[80vh] overflow-y-auto pr-2"
        role="region"
        aria-label="Fruits products"
      >
        {safeProducts.map((product) => (
          <FruitsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FruitsTabContent;

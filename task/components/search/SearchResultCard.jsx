"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductCard from "../subcategoryProduct/ProductCard";

const SearchResultCard = ({ item }) => {
  const router = useRouter();

  // --- Determine the type ---
  const isProduct = !!item.variants || !!item.variant; // retail or deal
  const isStore = !!item.store_type || item.type === "store";
  const isCategory = item.type === "category" || item.type === "subcategory";

  // --- Render product ---
  if (isProduct) {
    return <ProductCard product={item} />;
  }

  // --- Render store or category/subcategory ---
  const handleClick = () => {
    if (isStore) {
      router.push(`/stores/${item.slug || item._id}`);
    } else if (isCategory) {
      router.push(`/subcategories/${item.slug || item._id}`);
    }
  };

  const imageUrl =
    item.imageUrl ||
    item.image?.url ||
    "/placeholder-image.jpg";

  return (
    <Card
      onClick={handleClick}
      className="w-[240px] rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <CardHeader className="p-0">
        <div className="relative flex items-center justify-center w-full h-[161px] bg-gray-100 rounded-t-2xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={item.name}
            height={300}
            width={300}
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = "/fallback.png")}
          />
        </div>
      </CardHeader>

      <CardContent className="px-4 py-3 space-y-2 min-h-[110px]">
        <CardTitle className="text-sm font-semibold line-clamp-1">{item.name}</CardTitle>
        {item.store_type && (
          <p className="text-xs text-gray-500">Type: {item.store_type}</p>
        )}
        {item?.brand && (
          <p className="text-xs text-gray-500">Brand: {item.brand}</p>
        )}
        {item?.type === "subcategory" && (
          <p className="text-xs text-blue-500 font-medium">Explore Subcategory</p>
        )}
        {item?.type === "category" && (
          <p className="text-xs text-green-500 font-medium">Explore Category</p>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchResultCard;

"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/hooks/useWishlist";
import Link from "next/link";

export const HeartWithBadge = () => {
  const { summary } = useWishlist();

  return (
    <>
      <Heart className="w-6 h-6 text-gray-700 hover:text-red-500" />
      {summary.totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {summary.totalItems > 99 ? "99+" : summary.totalItems}
        </span>
      )}
    </>
  );
};
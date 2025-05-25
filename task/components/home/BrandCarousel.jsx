"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

const BrandCarousel = ({ data = [], loading = false }) => {
  const mappedProducts = data.map((item) => {
    const p = item.productId || item;

    const mrp = p.mrp || 0;
    const sellingPrice = p.sellingPrice || 0;
    const discount =
      mrp && sellingPrice ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 0;

    return {
      id: p._id || "",
      name: p.productName || "Unnamed Product",
      brand: p.brand || "Unknown Brand",
      seller: p.storeLocation || "Unknown Seller",
      discountedPrice: sellingPrice,
      originalPrice: mrp,
      image:
        Array.isArray(p.images) && p.images.length > 0
          ? p.images[0]
          : "/fallback.png",
      weight: p.weight || "1 unit",
      time: item.dealEndTime || null,
      discount: discount,
    };
  });

  if (loading) {
    return (
      <div className="flex gap-4 py-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Skeleton key={idx} className="h-[260px] w-[180px] rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="py-4 md:py-6 w-full">
      <Carousel
        className="w-full mx-auto"
        opts={{
          align: "start",
          slidesToScroll: "auto",
          dragFree: true,
        }}
      >
        <CarouselContent className="-ml-1">
          {mappedProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-2 basis-full xs:basis-1/2 sm:basis-1/3 md:basis-[20%] lg:basis-[16.666%] xl:basis-[12.5%]"
            >
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex left-0" />
        <CarouselNext className="hidden sm:flex right-0" />
      </Carousel>
    </div>
  );
};

export default BrandCarousel;

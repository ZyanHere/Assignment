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
    const p = item.productId || item; // flashDeals use `productId`, products are flat
    return {
      id: p._id,
      name: p.productName,
      brand: p.brand,
      seller: p.storeLocation,
      discountedPrice: p.sellingPrice,
      originalPrice: p.mrp,
      image: p.images?.[0] || "/fallback.png",
      weight: "1 unit",
      time: item.dealEndTime,
      discount: Math.round(((p.mrp - p.sellingPrice) / p.mrp) * 100),
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

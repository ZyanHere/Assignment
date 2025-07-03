"use client";

import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const BrandCarousel = ({ data = [], loading = false }) => {
  if (loading) {
    return (
      <div className="flex gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-[260px] w-[170px] rounded-lg" />
        ))}
      </div>
    );
  }

  const mappedProducts = data.map((item) => {
    const p = item.productId || item;
    const mrp = p.mrp || 0;
    const sp = p.sellingPrice || 0;

    return {
      id: p._id,
      name: p.productName || "Unnamed Product",
      brand: p.brand || "Unknown",
      seller: p.storeLocation || "N/A",
      discountedPrice: sp,
      originalPrice: mrp,
      image: p.images?.[0] || "/fallback.png",
      weight: p.weight || "1 unit",
      time: item.dealEndTime || null,
      discount: mrp && sp ? Math.round(((mrp - sp) / mrp) * 100) : 0,
    };
  });

  return (
    <Carousel className="w-full mx-auto">
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
  );
};

export default BrandCarousel;

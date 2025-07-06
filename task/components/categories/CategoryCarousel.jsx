"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";
import CategoryCard from "./CategoryCard";

const CategoryCarousel = ({ data = [], loading = false }) => {
  if (loading) {
    return (
      <div className="flex gap-4 px-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-[230px] h-[390px] rounded-2xl" />
        ))}
      </div>
    );
  }

  const mappedProducts = data.map((p) => {
    const mrp = p.mrp || 0;
    const sp = p.sellingPrice || 0;

    return {
      id: p._id,
      name: p.productName || "Unnamed",
      weight: p.weight || "1 unit",
      store: p.brand || "Unknown",
      discount: mrp && sp ? Math.round(((mrp - sp) / mrp) * 100) : 0,
      mrp: mrp,
      price: sp,
      image: p.images?.[0] || "/fallback.png",
      time: p.dealEndTime || null,
    };
  });

  return (
    <div className="py-6">
      <Carousel className="w-full mx-auto">
        <CarouselContent className="-ml-4">
          {mappedProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-[16.66%] flex-shrink-0"
            >
              <div className="p-1">
                <CategoryCard {...product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;

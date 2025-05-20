"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import { products } from "@/data/productData";

const BrandCarousel = () => {
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
          {products.map((product) => (
            <CarouselItem 
              key={product.id}
              // Preserve the original design for laptop/desktop screens
              // Make adjustments for tablet and mobile screens
              className="pl-2 basis-full xs:basis-1/2 sm:basis-1/3 md:basis-[20%] lg:basis-[16.666%] xl:basis-[12.5%]"
            >
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex left-0 " />
        <CarouselNext className="hidden sm:flex right-0 " />
      </Carousel>
    </div>
  );
};

export default BrandCarousel;
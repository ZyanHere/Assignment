// BrandCarousel.jsx
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
    <div className="py-4 md:py-6">
      <Carousel className="w-full mx-auto" opts={{
          align: "start",
          slidesToScroll: "auto",
          dragFree: true,
        }}>
         <CarouselContent className="-ml-1">
          {products.map((product) => (
            <CarouselItem 
              key={product.id}
              className="basis-[20%] md:basis-[16.666%] lg:basis-[12.5%] pl-2"
            >
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious aria-label="Previous slide" />
        <CarouselNext aria-label="Next slide" />
      </Carousel>
    </div>
  );
};

export default BrandCarousel;
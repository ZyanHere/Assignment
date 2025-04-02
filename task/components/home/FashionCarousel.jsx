"use client";

import { FASHION_PRODUCTS } from "@/data/fashionData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import FashionCard from "./FashionCard";



const FashionCarousel = ({category}) => {

  const products = FASHION_PRODUCTS[category] || [];
  return (
    <div className="py-6">
      <Carousel className="w-full mx-auto">
        <CarouselContent className="-ml-4 ">
          {products.map((product) => (
            <CarouselItem
            key={`${category}-${product.id}`}
              className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-[18.5%] flex-shrink-0"
            >
              <div className="p-1">
              <FashionCard {...product} />
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

export default FashionCarousel;

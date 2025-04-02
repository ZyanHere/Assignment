"use client";


import { ELECTRONICS_PRODUCTS } from "@/data/electronicsData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ElectronicsCard from "./ElectronicsCard";




const ElectronicsCarousel = ({category, reverse = false}) => {

  let products = ELECTRONICS_PRODUCTS[category] || [];
  if (reverse) products = [...products].reverse();


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
              <ElectronicsCard {...product} />
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

export default ElectronicsCarousel;

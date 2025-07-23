"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RestaurantCard from "./RestaurentCard";
import Link from "next/link";

export default function BuffetCarousel({ title, seeAllLink, items }) {
  return (
    <div className="w-full">
      {/* Responsive Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">{title}</h2>
        <Link 
          href={seeAllLink} 
          className="text-orange-500 text-sm sm:text-base font-semibold hover:text-orange-600 transition-colors self-start sm:self-auto"
        >
          See All
        </Link>
      </div>
      
      {/* Responsive Carousel */}
      <Carousel className="relative w-full">
        <CarouselContent className="-ml-2 sm:-ml-3 lg:-ml-4">
          {items.map((restaurant, index) => (
            <CarouselItem
              key={restaurant.id}
              className="basis-full xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4 2xl:basis-1/5 pl-2 sm:pl-3 lg:pl-4"
            >
              <div className="w-full">
                <RestaurantCard {...restaurant} index={index} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Responsive Navigation Buttons */}
        <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-6 xl:-left-8" />
        <CarouselNext className="hidden sm:flex -right-4 lg:-right-6 xl:-right-8" />
      </Carousel>
    </div>
  );
}

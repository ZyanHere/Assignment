// components/home/foursec/BuffetCarousel.jsx
"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RestaurantCard from "./RestaurentCard";

export default function BuffetCarousel({ items }) {
  return (
    <Carousel className="py-4">
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
        <ChevronLeft className="h-5 w-5" />
      </CarouselPrevious>

      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
        <ChevronRight className="h-5 w-5" />
      </CarouselNext>

      <CarouselContent className="space-x-4 overflow-visible">
        {items.map((restaurant, index) => (
          <CarouselItem key={restaurant._id} className="w-[300px]">
            <RestaurantCard
              img={restaurant.img}
              name={restaurant.name}
              rating={restaurant.rating}
              time={restaurant.time}
              price={restaurant.price}
              category={restaurant.category}  // can be object or string
              index={index}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

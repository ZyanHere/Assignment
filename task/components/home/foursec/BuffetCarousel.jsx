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
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link href={seeAllLink} className="text-orange-500 text-sm font-semibold">
          See All
        </Link>
      </div>
      <Carousel className="relative">
        <CarouselContent className="-ml-4">
          {items.map((restaurant, index) => (
            <CarouselItem
              key={restaurant.id}
              className="basis-1/2 md:basis-1/4 pl-4"
            >
              <RestaurantCard {...restaurant} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

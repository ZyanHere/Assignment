"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RestaurantCard from "./RestaurentCard";

export default function BuffetCarousel({ title, seeAllLink, items = [] }) {
  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {seeAllLink && (
          <a
            href={seeAllLink}
            className="text-orange-500 text-sm font-semibold hover:underline"
          >
            See All
          </a>
        )}
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {items.map((restaurant, index) => (
            <CarouselItem
              key={restaurant.id}
              className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-[20%]" // ensures 4 cards + peek
            >
              <RestaurantCard
                id={restaurant.id}
                img={restaurant.images?.[0]?.url}
                name={restaurant.name}
                rating={restaurant.rating}
                time="30 min"
                price="Free Delivery"
                category={restaurant.category}
                index={index}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}

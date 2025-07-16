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

const BuffetCarousel = ({ title, seeAllLink, items }) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link
          href={seeAllLink}
          className="text-orange-500 text-sm font-semibold"
        >
          See All
        </Link>
      </div>
      <div className="py-4">
        <Carousel className="w-full mx-auto">
          <CarouselContent className="-ml-4">
            {items.map((restaurant, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-[22.35%] flex-shrink-0"
              >
                <div className="p-1">
                  {/* only pass the props we need */}
                  <RestaurantCard
                    img={restaurant.img}
                    name={restaurant.name}
                    rating={restaurant.rating}
                    time={restaurant.time}
                    price={restaurant.price}
                    category={restaurant.category}
                    index={index}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default BuffetCarousel;

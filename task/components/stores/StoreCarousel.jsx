"use client";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import StoreCard from "./StoreCard";

const StoreCarousel = ({ vendorId, name, location, logo, distance, products }) => {
  return (
    <div className="w-full max-w-[1500px] mx-auto mt-6 mb-15">
      <div className="flex items-center justify-between mb-8">
        <Link href={`/stores/${vendorId}`} className="flex items-center gap-3">
          <img src={logo} alt={`${name} Logo`} className="w-24 h-24 cursor-pointer" />
          <div>
            <p className="text-4xl font-semibold cursor-pointer">{name}</p>
            <p className="text-lg text-gray-500">
              {location} • {distance} away
            </p>
          </div>
        </Link>
      </div>

      <Carousel className="relative">
        <CarouselPrevious />
        <CarouselContent className="ml-4 flex overflow-x-auto scroll-smooth gap-4">
          {products.map((product, index) => (
            <CarouselItem
              key={index}
              className="pl-2 basis-[80%] sm:basis-[50%] md:basis-[33.33%] lg:basis-[25%] xl:basis-[20%]"
            >

              <StoreCard product={product} storeName={name} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default StoreCarousel;

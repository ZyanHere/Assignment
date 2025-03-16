"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import StoreCard from "./StoreCard";

const StoreCarousel = ({ slug, name, location, logo, distance, banner, products }) => {
 
  const product = products[0];

  return (
    <div className="w-full max-w-[1500px] mx-auto mt-6 mb-15">
      {/* Store Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <img src={logo} alt={`${name} Logo`} className="w-24 h-24" />
          <div>
            <p className="text-4xl font-semibold">{name}</p>
            <p className="text-lg text-gray-500">{location} • {distance} away</p>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <Carousel className="relative">
        <CarouselPrevious />
        <CarouselContent className="ml-4">
          {[...Array(10)].map((_, index) => (
            <CarouselItem key={index} className={`pl-2  ${index === 9 ? "basis-[30%]" : "basis-[22%]"}`}>
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

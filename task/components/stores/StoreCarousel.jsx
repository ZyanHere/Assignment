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
import Image from "next/image";

const StoreCarousel = ({
  vendorId,
  name,
  location,
  logo,
  distance,
  products,
}) => {
  return (
    <div className="w-full max-w-[1500px] mx-auto mt-6 mb-15">
      {/* Store Heading */}
      <div className="flex items-center justify-between mb-8">
        <Link href={`/stores/${vendorId}`} className="flex items-center gap-3">
          <Image
            src={logo}
            alt={`${name} Logo`}
            className="w-20 h-20 cursor-pointer rounded-full"
            width={96}
            height={96}
          />
          <div>
            <p className="text-4xl font-semibold cursor-pointer">{name}</p>
            <p className="text-lg text-gray-500">
              {location} • {distance} away
            </p>
          </div>
        </Link>
      </div>

      {/* Carousel */}
      <Carousel className="relative">
        <CarouselPrevious />
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem
              key={index}
              className="px-2 basis-[80%] sm:basis-[50%] md:basis-[33.33%] lg:basis-[25%] xl:basis-[19.23%]"
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

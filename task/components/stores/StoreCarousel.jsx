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

  const showCarousel = products.length > 4;

  return (
    <div className="w-full max-w-[1500px] mx-auto mt-6 mb-16 overflow-hidden p-6">
      {/* Store Heading */}
      <div className="flex items-center justify-between mb-8">
        <Link href={`/stores/${vendorId}`} className="flex items-center gap-3">
          <Image
            src={logo}
            alt={`${name} Logo`}
            className="w-16 h-16 cursor-pointer rounded-full"
            width={96}
            height={96}
          />
          <div>
            <p className="text-2xl font-semibold cursor-pointer text-[#42434C]">{name}</p>
            <p className="text-lg text-gray-500 font-medium">
              {location} • {distance} away
            </p>
          </div>
        </Link>
      </div>

      {/* Carousel */}
      <div className="flex overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory sm:hidden -mx-4 px-4">
        {products.map((product, index) => (
          <div key={index} className="flex-shrink-0 w-64 snap-start">
            <StoreCard product={product} storeName={name} />
          </div>
        ))}
      </div>


      <Carousel className="relative hidden sm:block">
        {
          showCarousel && (<CarouselPrevious className="-left-4 top-1/2 -translate-y-1/2 z-10 bg-black/20" />)
        }
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem
              key={index}
              className="basis-[80%] sm:basis-[50%] md:basis-[33.33%] lg:basis-[25%] xl:basis-[19.23%]"
            >
              <StoreCard product={product} storeName={name} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {
          showCarousel && (<CarouselNext className="-right-4 top-1/2 -translate-y-1/2 z-10 bg-black/20" />)
        }

      </Carousel>
    </div>
  );
};

export default StoreCarousel;

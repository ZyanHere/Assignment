"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const images = [
  "/home/offers/offer1.png",
  "/home/offers/offer2.png",
  "/home/offers/offer3.png", 
  "/home/offers/offer4.png", 
];

const OffersBanner = () => {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <div className="w-full px-4">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-[1600px] mx-auto"
      >
        <CarouselContent className="-ml-4">
          {images.map((src, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-[85%] md:basis-[45%] lg:basis-[30%]"
            >
              <div className="relative h-[110px] md:h-[130px] lg:h-[140px] rounded-xl overflow-hidden shadow-md">
                <Image
                  src={src}
                  alt={`Offer ${index + 1}`}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default OffersBanner;

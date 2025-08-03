"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
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
    typeof window !== "undefined"
      ? Autoplay({ delay: 3000, stopOnInteraction: false })
      : null
  );

  return (
    <div className="w-full px-4 sm:px-6 md:px-0 md:w-screen md:mx-0">
      <Carousel
        plugins={plugin.current ? [plugin.current] : []}
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
        className="w-full max-w-[1600px] mx-auto"// full width for desktop
      >
        <CarouselContent className="-ml-4">
          {images.map((src, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-[85%] md:basis-[45%] lg:basis-[30%]"
            >
              <div
                className="relative h-[110px] md:h-[130px] lg:h-[140px] rounded-xl overflow-hidden shadow-md"
                aria-label={`Offer ${index + 1}`}
              >
                <Image
                  src={src}
                  alt={`Offer banner ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover rounded-xl"
                  priority={index === 0}
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

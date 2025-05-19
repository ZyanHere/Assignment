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
  "/home/music/music1.png",
  "/home/music/music2.png",
  "/home/music/music3.png",
  "/home/music/music4.png",
  "/home/music/music5.png",
  "/home/music/music6.png",
];

const FestBanner = () => {
  const plugin = useRef(
    typeof window !== "undefined"
      ? Autoplay({ delay: 3500, stopOnInteraction: false })
      : null
  );

  return (
    <div className="w-full px-4 sm:px-6">
      <Carousel
        plugins={plugin.current ? [plugin.current] : []}
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
              className="pl-4 basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[30%]"
            >
              <div className="relative h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] rounded-xl overflow-hidden shadow-md">
                <Image
                  src={src}
                  alt={`Music Banner ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 30vw"
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

export default FestBanner;

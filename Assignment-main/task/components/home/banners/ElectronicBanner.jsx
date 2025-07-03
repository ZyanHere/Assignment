"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const images = [
  "/home/electronics/Electronics 1.png",
  "/home/electronics/Electronics 2.png",
  "/home/electronics/Electronics 3.png",
  "/home/electronics/Electronics 4.png",
  "/home/electronics/Electronics 5.png",
];

const ElectronicBanner = () => {
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
        className="w-full max-w-[1700px] mx-auto"
      >
        <CarouselContent className="-ml-4">
          {images.map((src, index) => (
            <CarouselItem
              key={index}
              className="pl-4 basis-[85%] md:basis-[75%] lg:basis-[55%]"
            >
              <div className="relative h-[240px] md:h-[300px] lg:h-[360px] rounded-2xl overflow-hidden shadow">
                <Image
                  src={src}
                  alt={`Electronic ${index + 1}`}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ElectronicBanner;
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Clock } from "lucide-react";

const FourSec = () => {
  const items = [
    { img: "/home/hero1/stay.jpg", label: "Stay", link: "/home/hotel" },
    { img: "/home/hero1/movie.jpg", label: "Movie", link: "/home/movie" },
    { img: "/home/hero1/buffet.jpg", label: "Buffet", link: "/home/buffet" },
    { img: "/home/hero1/event.jpg", label: "Event", link: "/home/event" },
  ];

  return (
    <div className="w-full space-y-3">
      
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {items.map((item, index) => (
            <CarouselItem key={index} className="pl-1 basis-[65%] sm:basis-1/3 md:basis-1/4">
              <Link
                href={item.link}
                className="group block h-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white border border-gray-100 hover:border-amber-200"
              >
                {/* Image with gradient overlay */}
                <div className="relative w-full aspect-[5/4]">
                  <Image
                    src={item.img}
                    alt={item.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4 relative text-center">
                  {/* Label with creative styling */}
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                    {item.label}
                  </h3>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0  sm:flex" />
        <CarouselNext className="right-0  sm:flex" />
      </Carousel>
    </div>
  );
};

export default FourSec;
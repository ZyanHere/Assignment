"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { BannerHeader } from "./BannerHeader";

const images = [
  "/home/all/all-banner3.png",
  "/home/all/all-banner2.png",
  "/home/all/all-banner1.png",
];

const AllTabBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <BannerHeader />

      <div className="w-full px-2 md:px-4">
        <div
          className="flex flex-col items-center"
          role="region"
          aria-label="All tab carousel"
        >
          
          <div className="relative w-full overflow-hidden rounded-md lg:rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((src, index) => (
                <div
                  key={src}
                  className="w-full flex-shrink-0"
                  aria-hidden={index !== currentIndex}
                >
                  <div className="relative w-full">
                    <Image
                      src={src}
                      alt={`All collection ${index + 1}`}
                      className="rounded-2xl object-contain w-full h-auto" //scales acc to width
                      width={1200}
                      height={400}
                      priority={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTabBanner;
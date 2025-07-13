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
      <div className="px-0 md:px-4 mx-auto"> {/* px-0 for mobile, px-4 for md+ */}
        <div className="flex flex-col items-center" role="region" aria-label="All tab carousel">
          <div className="relative w-full h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-2xl">
            <div
              className="flex h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((src, index) => (
                <div
                  key={src}
                  className="w-full h-full flex-shrink-0 relative"
                  aria-hidden={index !== currentIndex}
                >
                  <Image
                    src={src}
                    alt={`All collection ${index + 1}`}
                    fill
                    className="object-contain" // Changed from object-cover to contain
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1500px) 80vw, 70vw"
                  />
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
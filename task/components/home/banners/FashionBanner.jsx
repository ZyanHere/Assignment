"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BannerHeader } from "./BannerHeader";

const images = [
  "/home/fashion/fashion-banner.jpg",
  "/home/fashion/fashion-banner2.jpg",
  "/home/fashion/fashion-banner3.jpg",
  "/home/fashion/fashion-banner5.jpg",
  "/home/fashion/fashion-banner6.jpg",
];

const FashionBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-container">
      <BannerHeader />
      <div className="banner-content h-[180px] md:h-[200px]">
        <div
          className="w-full flex flex-col items-center"
          role="region"
          aria-label="Main carousel"
        >
          <div className="relative w-full h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-2xl">
            <div
              className="flex w-full h-full transition-transform duration-500 ease-out"
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
                    alt={`Fashion collection ${index + 1}`}
                    className="w-full h-full object-fill rounded-2xl"
                    fill={false}
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority={index === 0}
                    placeholder="empty"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 mt-6" aria-label="Carousel navigation">
            {images.map((_, index) => (
              <motion.button
                key={index}
                className={`h-2 rounded-full transition-colors ${
                  currentIndex === index
                    ? "w-30 h-3 bg-blue-500 rounded-full"
                    : "w-10 h-3 bg-gray-400 rounded-full"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionBanner;

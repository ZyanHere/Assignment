"use client";
import { useState, useEffect } from "react";
import { BannerHeader } from "./BannerHeader";
import EcommerceBanner from "./ecommerce-banner";
import EcommerceBannerV2 from "./ecommerce-banner-v2";
import EcommerceBannerV3 from "./ecommerce-banner-v3";



const banners = [
  <EcommerceBanner key="v1" />,
  <EcommerceBannerV2 key="v2" />,
  <EcommerceBannerV3 key="v3" />,
];

const AllTabBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
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
              {banners.map((Component, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                  aria-hidden={index !== currentIndex}
                >
                  {Component}
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

"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.AUTH_TOKEN,
    },
  })
    .then((res) => res.json())
    .then((json) => json.data);

const CategoryTabs = ({ selectedTab, setSelectedTab }) => {
  const scrollContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [needsScrolling, setNeedsScrolling] = useState(false);

  const { data } = useSWR(
    "https://lmd-user-2ky8.onrender.com/lmd/api/v1/retail/categories",
    fetcher
  );

  const finalCategories = data
    ? [
        { _id: "all", name: "All", imageUrl: "/home/assets/all_logo.svg" },
        ...data,
      ]
    : [];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);

      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        setNeedsScrolling(scrollWidth > containerWidth);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [data]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-6 relative">
      {needsScrolling && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
            aria-label="Scroll left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
            aria-label="Scroll right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}

      <div
        ref={scrollContainerRef}
        className="overflow-x-auto no-scrollbar px-4 w-full"
      >
        <div className="flex gap-4 min-w-fit">
          {finalCategories?.map((category) => {
            const isActive = selectedTab === category._id;
            return (
              <button
                key={category._id}
                onClick={() => setSelectedTab(category._id)}
                className={`flex items-center rounded-xl transition-all duration-200 text-black
                  ${
                    isActive
                      ? "bg-gray-50 shadow-lg border-2 border-black border-b-4"
                      : "bg-gray-200 bg-gradient-to-r from-yellow-50 to-gray-200 shadow-sm border-b border-yellow-500"
                  }
                  ${
                    isMobile
                      ? "gap-2 px-3 py-2 w-[140px] flex-shrink-0"
                      : "gap-3 px-5 py-3 w-[180px] flex-shrink-0"
                  }`}
              >
                <div
                  className={`relative flex-shrink-0 ${
                    isMobile ? "w-6 h-6" : "w-8 h-8"
                  }`}
                >
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span
                  className={`font-medium text-left break-words whitespace-normal overflow-visible leading-tight
                    ${isMobile ? "text-xs" : "text-sm"}`}
                >
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;

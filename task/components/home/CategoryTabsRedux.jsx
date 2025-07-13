"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useHome } from "@/lib/hooks/useHome";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryTabsRedux = () => {
  const scrollContainerRef = useRef(null);
  
  const {
    selectedTab,
    categories,
    categoriesLoading,
    categoriesError,
    isMobile,
    needsScrolling,
    setSelectedTab,
    setIsMobile,
    setNeedsScrolling
  } = useHome();

  // Check if we're on mobile and if scrolling is needed on component mount and window resize
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Check if scrolling is needed
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        setNeedsScrolling(scrollWidth > containerWidth);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);

    // Clean up
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [setIsMobile, setNeedsScrolling]);

  // Check scrolling needs when categories are loaded
  useEffect(() => {
    if (!categoriesLoading && categories.length > 0 && scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      setNeedsScrolling(scrollWidth > containerWidth);
    }
  }, [categoriesLoading, categories.length, setNeedsScrolling]);

  // Function to handle scrolling left and right
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Prepare categories with "All" option
  const finalCategories = Array.isArray(categories)
    ? [{ _id: "all", name: "All", imageUrl: "/home/assets/all_logo.svg" }, ...categories]
    : [{ _id: "all", name: "All", imageUrl: "/home/assets/all_logo.svg" }];

  return (
    <div className="mt-6 relative">
      {/* Scroll buttons - only visible when scrolling is needed */}
      {needsScrolling && (
        <div>
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto no-scrollbar px-0 md:px-4 w-full"
      >
        <div className="flex gap-3 md:gap-4 whitespace-nowrap min-w-fit snap-x snap-mandatory">
          {categoriesLoading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-3 w-[120px] md:w-[180px] flex-shrink-0 rounded-xl bg-gray-200 bg-gradient-to-r from-yellow-50 to-gray-200`}
              >
                <Skeleton className="w-8 h-8 rounded-md" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))
          ) : (
            finalCategories?.map((category) => {
              const isActive = selectedTab === category._id;
              return (
                <button
                  key={category._id}
                  onClick={() => setSelectedTab(category._id)}
                  className={`flex items-center rounded-xl transition-all duration-200 snap-center
                  ${isActive
                      ? "bg-gray-50 shadow-lg text-black border-2 border-black border-b-4"
                      : "bg-gray-200 bg-gradient-to-r from-yellow-50 to-gray-200 shadow-sm border-b border-yellow-500"
                    }
                  ${isMobile
                      ? "gap-2 px-3 py-2 w-[120px] flex-shrink-0"
                      : "gap-3 px-5 py-3 w-[180px] flex-shrink-0"
                    }`}
                >
                  <div className={`relative ${isMobile ? "w-6 h-6" : "w-8 h-8"}`}>
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className={`font-medium break-words text-center ${isMobile ? "text-xs" : "text-sm"} leading-tight`}>
                    {category.name}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabsRedux; 
"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const categories = [
  { key: "all", label: "All", icon: "/home/assets/all_logo.svg" },
  { key: "grocery", label: "Grocery", icon: "/home/assets/grocery_logo.png" },
  { key: "fashion", label: "Fashion", icon: "/home/assets/fashion_logo.png" },
  { key: "gift", label: "Gift", icon: "/home/assets/gift_logo.png" },
  {
    key: "electronics",
    label: "Electronics",
    icon: "/home/assets/electronics_logo.png",
  },
  { key: "Personal Care", label: "Personal Care", icon: "/home/assets/gift_logo.png" },
  { key: "Apparels", label: "Apparels", icon: "/home/assets/fashion_logo.png" },
  { key: "Fruits and Vegetables", label: "Fruits and Vegetables", icon: "/home/assets/grocery_logo.png" },
];

const CategoryTabs = ({ selectedTab, setSelectedTab }) => {
  // Reference to scroll container for mobile scrolling via buttons
  const scrollContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [needsScrolling, setNeedsScrolling] = useState(false);

  // Check if we're on mobile and if scrolling is needed on component mount and window resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      
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
  }, []);

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

  return (
    <div className="mt-6 relative">
      {/* Scroll buttons - only visible when scrolling is needed */}
      {needsScrolling && (
        <div className="hidden md:block">
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
        className="overflow-x-auto no-scrollbar px-4"
      >
        <div className="flex justify-between gap-4">
          {categories.map((category) => {
            const isActive = selectedTab === category.key;
            return (
              <button
                key={category.key}
                onClick={() => setSelectedTab(category.key)}
                className={`flex items-center rounded-xl transition-all duration-200
                  ${isActive
                    ? "bg-gray-50 shadow-lg text-black border-2 border-black border-b-4"
                    : "bg-gray-200 bg-gradient-to-r from-yellow-50 to-gray-200 shadow-sm border-b border-yellow-500"
                  }
                  ${isMobile 
                    ? "gap-2 px-3 py-2 min-w-0" 
                    : "gap-3 px-5 py-3 min-w-[180px]"
                  }`}
              >
                <div className={`relative ${isMobile ? "w-6 h-6" : "w-8 h-8"}`}>
                  <Image
                    src={category.icon}
                    alt={category.label}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className={`font-medium whitespace-nowrap ${isMobile ? "text-xs" : "text-sm"}`}>
                  {category.label}
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
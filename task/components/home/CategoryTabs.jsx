"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTab, setIsMobile, setNeedsScrolling, fetchComprehensiveHomeData } from "../../lib/redux/home/homeSlice"; // Update this path
import { Skeleton } from "@/components/ui/skeleton";

const CategoryTabs = ({ 
  activeCategory, 
  onPrimaryCategoryClick,
  showAllOption = true 
}) => {
  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null);
  
  const {
    categories,
    homeDataLoading,
    homeDataError,
    isMobile,
    needsScrolling
  } = useSelector(state => state.home);

  // Fetch categories if not already loaded
  useEffect(() => {
    if (categories.length === 0 && !homeDataLoading) {
      dispatch(fetchComprehensiveHomeData());
    }
  }, [dispatch, categories.length, homeDataLoading]);

  // Check if we're on mobile and if scrolling is needed
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      dispatch(setIsMobile(mobile));

      // Check if scrolling is needed
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        dispatch(setNeedsScrolling(scrollWidth > containerWidth));
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
  }, [dispatch]);

  // Check scrolling needs when categories are loaded
  useEffect(() => {
    if (!homeDataLoading && categories.length > 0 && scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      dispatch(setNeedsScrolling(scrollWidth > containerWidth));
    }
  }, [homeDataLoading, categories.length, dispatch]);

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

  // Prepare categories - show only first 6 categories
  const finalCategories = (() => {
    // Ensure categories have proper structure for display
    const processedCategories = Array.isArray(categories) 
      ? categories.slice(0, 6).map(cat => ({
          ...cat,
          _id: cat._id || cat.id,
          id: cat.id || cat._id,
          name: cat.name || 'Unnamed Category',
          imageUrl: cat.imageUrl || cat.image || "/home/assets/default_category.svg"
        }))
      : [];
    
    return processedCategories;
  })();

  // Debug log - remove in production
  useEffect(() => {
    if (finalCategories.length > 0) {
      console.log('Final categories for tabs:', finalCategories.map(cat => ({ 
        id: cat._id || cat.id, 
        name: cat.name 
      })));
    }
  }, [finalCategories]);

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    if (onPrimaryCategoryClick) {
      onPrimaryCategoryClick(categoryId);
    } else {
      dispatch(setSelectedTab(categoryId));
    }
  };

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
          {homeDataLoading ? (
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
          ) : homeDataError ? (
            <div className="flex items-center justify-center w-full py-4">
              <p className="text-red-500 text-sm">Error loading categories</p>
            </div>
          ) : (
            finalCategories?.map((category) => {
              const categoryId = category._id || category.id;
              const isActive = activeCategory === categoryId;
              
              return (
                <button
                  key={categoryId}
                  onClick={() => handleCategoryClick(categoryId)}
                  className={`flex items-center rounded-xl transition-all duration-200 snap-center
                  ${isActive
                      ? "bg-purple-800 shadow-lg text-white border-2 border-purple-900"
                      : "bg-gray-200 shadow-sm hover:bg-gray-300"
                    }
                  ${isMobile
                      ? "gap-2 px-3 py-2 w-[120px] flex-shrink-0"
                      : "gap-3 px-5 py-3 w-[180px] flex-shrink-0"
                    }`}
                >
                  <div className={`relative ${isMobile ? "w-6 h-6" : "w-8 h-8"}`}>
                    <Image
                      src={category.imageUrl || "/home/assets/default_category.svg"}
                      alt={category.name}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        e.target.src = "/home/assets/default_category.svg";
                      }}
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

export default CategoryTabs;

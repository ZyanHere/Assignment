"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useHome } from "@/lib/hooks/useHome" // Assuming this hook exists and provides the necessary state
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight } from "lucide-react" // Import Lucide icons

export default function CategoryTabsRedux() {
  const scrollContainerRef = useRef(null)
  const {
    selectedTab,
    categories,
    categoriesLoading,
    categoriesError,
    isMobile,
    needsScrolling,
    setSelectedTab,
    setIsMobile,
    setNeedsScrolling,
  } = useHome()

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth
        const scrollWidth = scrollContainerRef.current.scrollWidth
        setNeedsScrolling(scrollWidth > containerWidth)
      }
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [setIsMobile, setNeedsScrolling])

  useEffect(() => {
    if (!categoriesLoading && categories.length > 0 && scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth
      const scrollWidth = scrollContainerRef.current.scrollWidth
      setNeedsScrolling(scrollWidth > containerWidth)
    }
  }, [categoriesLoading, categories.length, setNeedsScrolling])

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // Ensure categories is an array before spreading
  const finalCategories = Array.isArray(categories)
    ? [{ _id: "all", name: "All", imageUrl: "/home/assets/all_logo.svg?height=48&width=48" }, ...categories]
    : [{ _id: "all", name: "All", imageUrl: "/home/assets/all_logo.svg?height=48&width=48" }]

  if (categoriesError) {
    return <div className="mt-6 text-center text-red-500">Failed to load categories. Please try again later.</div>
  }

  return (
    <div className="mt-6 relative ">
      {needsScrolling && (
        <>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-lg p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 " />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-lg p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </motion.button>
        </>
      )}
      <div ref={scrollContainerRef} className="overflow-x-auto no-scrollbar px-0 md:px-4 w-full py-2">
        <div className="flex gap-3 md:gap-4 whitespace-nowrap min-w-fit snap-x snap-mandatory pb-1">
          {categoriesLoading
            ? Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-[120px] md:w-[180px] bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl px-4 py-2 flex items-center gap-3 animate-pulse shadow-sm"
                >
                  <Skeleton className="w-8 h-8 rounded-md bg-gray-300" />
                  <Skeleton className="h-4 w-3/4 bg-gray-300" />
                </div>
              ))
            : finalCategories.map((category) => {
                const isActive = selectedTab === category._id
                return (
                  <motion.button
                    key={category._id}
                    onClick={() => setSelectedTab(category._id)}
                    whileHover={{ scale: 1.04, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    layout // Enable layout animations for smooth transitions
                    transition={{ type: "spring", stiffness: 400, damping: 25 }} // Smoother transition
                    className={`snap-center rounded-xl transition-all duration-300 ease-in-out border text-sm font-medium
                    flex items-center overflow-hidden
                    ${isMobile ? "gap-2 px-3 py-2 w-[120px]" : "gap-3 px-5 py-3 w-[180px]"}
                    ${
                      isActive
                        ? "bg-white shadow-lg border-black border-2 text-purple-700"
                        : "bg-white/70 border border-gray-200 hover:bg-white/90 backdrop-blur-md text-gray-800"
                    }
                  `}
                  >
                    <div className={`relative ${isMobile ? "w-6 h-6" : "w-8 h-8"} flex-shrink-0`}>
                      <Image
                        src={category.imageUrl || "/placeholder.svg?height=48&width=48&query=category icon"} // Fallback to placeholder
                        alt={category.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className={`text-gray-900 ${isMobile ? "text-xs" : "text-sm"} leading-tight truncate`}>
                      {category.name}
                    </span>
                  </motion.button>
                )
              })}
        </div>
      </div>
    </div>
  )
}

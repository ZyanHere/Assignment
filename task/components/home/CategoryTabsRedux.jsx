"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useHome } from "@/lib/hooks/useHome"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

export default function CategoryTabsRedux() {
  const scrollContainerRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

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

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      const progress = scrollLeft / (scrollWidth - clientWidth)
      setScrollProgress(progress)
    }
  }

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const finalCategories = Array.isArray(categories)
    ? [{ _id: "all", name: "All", imageUrl: "/home/assets/all_logo.svg?height=48&width=48" }, ...categories]
    : [{ _id: "all", name: "All", imageUrl: "/home/assets/all_logo.svg?height=48&width=48" }]

  useEffect(() => {
    const currentIndex = finalCategories.findIndex((cat) => cat._id === selectedTab)
    setActiveIndex(currentIndex >= 0 ? currentIndex : 0)
  }, [selectedTab, finalCategories])

  if (categoriesError) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-center">
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6">
          <div className="text-red-600 font-medium">Failed to load categories</div>
          <div className="text-red-500 text-sm mt-1">Please try again later</div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="mt-6 relative">
      {/* Gradient Overlays for Mobile */}
      {isMobile && needsScrolling && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
        </>
      )}

      {/* Desktop Scroll Buttons */}
      {!isMobile && needsScrolling && (
        <>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-xl p-3 rounded-full shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-xl p-3 rounded-full shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </motion.button>
        </>
      )}

      {/* Scroll Progress Indicator for Mobile */}
      {isMobile && needsScrolling && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-200 rounded-full overflow-hidden z-10">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            style={{ width: `${scrollProgress * 100}%` }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        </div>
      )}

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={`overflow-x-auto no-scrollbar w-full ${isMobile ? "px-4 py-3" : "px-12 py-4"}`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitScrollbar: { display: "none" },
        }}
      >
        <div
          className={`flex whitespace-nowrap min-w-fit snap-x snap-mandatory ${isMobile ? "gap-3 pb-4" : "gap-4 pb-2"}`}
        >
          {categoriesLoading
            ? // Enhanced Loading State
              Array.from({ length: 5 }).map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-2xl flex items-center gap-3 shadow-sm border border-gray-100 ${
                    isMobile ? "w-[110px] px-3 py-3" : "w-[160px] px-4 py-4"
                  }`}
                >
                  <Skeleton
                    className={`rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 ${
                      isMobile ? "w-7 h-7" : "w-8 h-8"
                    }`}
                  />
                  <Skeleton
                    className={`bg-gradient-to-r from-gray-200 to-gray-300 ${isMobile ? "h-3 w-12" : "h-4 w-16"}`}
                  />
                </motion.div>
              ))
            : finalCategories.map((category, index) => {
                const isActive = selectedTab === category._id
                const isAdjacent = Math.abs(index - activeIndex) === 1

                return (
                  <motion.button
                    key={category._id}
                    onClick={() => setSelectedTab(category._id)}
                    whileHover={{
                      scale: isMobile ? 1.02 : 1.05,
                      y: isMobile ? -2 : -4,
                    }}
                    whileTap={{
                      scale: 0.98,
                      y: isMobile ? 1 : 2,
                    }}
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      layout: { duration: 0.3 },
                    }}
                    className={`snap-center rounded-2xl transition-all duration-500 ease-out border text-sm font-medium flex items-center overflow-hidden relative group ${
                      isMobile ? "gap-2 px-3 py-3 w-[110px]" : "gap-3 px-4 py-4 w-[160px]"
                    } ${
                      isActive
                        ? "bg-gradient-to-br from-white via-purple-50 to-pink-50 shadow-xl border-purple-200 text-purple-700 shadow-purple-100/50"
                        : isAdjacent
                          ? "bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-purple-200 backdrop-blur-sm text-gray-700 shadow-md hover:shadow-lg"
                          : "bg-white/80 border-gray-150 hover:border-gray-300 backdrop-blur-sm text-gray-600 shadow-sm hover:shadow-md"
                    }`}
                  >
                    {/* Active State Sparkle Effect */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute top-1 right-1"
                        >
                          <Sparkles className="w-3 h-3 text-purple-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Gradient Background Animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                      animate={isActive ? { opacity: 0.1 } : { opacity: 0 }}
                    />

                    <div className={`relative flex-shrink-0 ${isMobile ? "w-7 h-7" : "w-8 h-8"}`}>
                      <motion.div
                        animate={isActive ? { rotate: [0, 5, -5, 0] } : { rotate: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="w-full h-full"
                      >
                        <Image
                          src={category.imageUrl || "/placeholder.svg?height=48&width=48&query=category icon"}
                          alt={category.name}
                          fill
                          className="object-contain"
                        />
                      </motion.div>
                    </div>

                    <motion.span
                      className={`leading-tight truncate font-medium ${isMobile ? "text-xs" : "text-sm"} ${
                        isActive ? "text-purple-700" : "text-gray-700 group-hover:text-gray-900"
                      }`}
                      animate={isActive ? { fontWeight: 600 } : { fontWeight: 500 }}
                    >
                      {category.name}
                    </motion.span>

                    {/* Active State Bottom Border */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </motion.button>
                )
              })}
        </div>
      </div>

      {/* Mobile Scroll Hint */}
      {isMobile && needsScrolling && !categoriesLoading && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none"
        >
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="flex items-center gap-1"
          >
            <span>Swipe</span>
            <ChevronRight className="w-3 h-3" />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

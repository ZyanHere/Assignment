"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useHome } from "@/lib/hooks/useHome"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

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
    <div className="mt-8 relative">
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
        className={`overflow-x-auto no-scrollbar w-full ${isMobile ? "px-4 py-8" : "px-12 py-10"}`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitScrollbar: { display: "none" },
        }}
      >
        <div
          className={`flex whitespace-nowrap min-w-fit snap-x snap-mandatory ${isMobile ? "gap-8 pb-8" : "gap-12 pb-6"}`}
        >
          {categoriesLoading
            ? // Enhanced Loading State
              Array.from({ length: 5 }).map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex flex-col items-center ${isMobile ? "w-24" : "w-32"}`}
                >
                  {/* 3D Plate Skeleton */}
                  <div className="relative mb-4">
                    {/* Plate Base */}
                    <Skeleton
                      className={`rounded-full bg-gradient-to-br from-gray-200 to-gray-300 ${
                        isMobile ? "w-20 h-20" : "w-28 h-28"
                      }`}
                      style={{
                        boxShadow: `
                          0 8px 16px rgba(0, 0, 0, 0.1),
                          0 4px 8px rgba(0, 0, 0, 0.06),
                          inset 0 1px 0 rgba(255, 255, 255, 0.1)
                        `
                      }}
                    />
                    {/* Image Skeleton */}
                    <Skeleton
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-br from-gray-300 to-gray-400 ${
                        isMobile ? "w-12 h-12" : "w-16 h-16"
                      }`}
                    />
                  </div>
                  <Skeleton
                    className={`bg-gradient-to-r from-gray-200 to-gray-300 rounded ${isMobile ? "h-3 w-16" : "h-4 w-20"}`}
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
                      scale: 1.05,
                      y: -6,
                      rotateX: -5,
                    }}
                    whileTap={{
                      scale: 0.98,
                      y: -2,
                    }}
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      layout: { duration: 0.3 },
                    }}
                    className={`snap-center flex flex-col items-center group relative ${
                      isMobile ? "w-24" : "w-32"
                    }`}
                    style={{
                      perspective: "1000px",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* 3D Plate Container */}
                    <div className="relative mb-4">
                      {/* Plate Shadow/Base */}
                      <motion.div
                        animate={
                          isActive
                            ? {
                                boxShadow: [
                                  "0 12px 32px rgba(147, 51, 234, 0.25), 0 8px 16px rgba(147, 51, 234, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.1), inset 0 -2px 4px rgba(147, 51, 234, 0.1)",
                                  "0 16px 40px rgba(147, 51, 234, 0.3), 0 12px 20px rgba(147, 51, 234, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.15), inset 0 -2px 4px rgba(147, 51, 234, 0.15)",
                                  "0 12px 32px rgba(147, 51, 234, 0.25), 0 8px 16px rgba(147, 51, 234, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.1), inset 0 -2px 4px rgba(147, 51, 234, 0.1)",
                                ],
                                y: [0, -3, 0],
                                rotateX: [0, -2, 0],
                              }
                            : {
                                boxShadow: isAdjacent
                                  ? "0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.05)"
                                  : "0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 2px rgba(255, 255, 255, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.03)",
                                y: 0,
                                rotateX: 0,
                              }
                        }
                        transition={{
                          duration: 2.5,
                          repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                          ease: "easeInOut",
                        }}
                        className={`rounded-full transition-all duration-500 ${
                          isMobile ? "w-20 h-20" : "w-28 h-28"
                        } ${
                          isActive
                            ? "bg-gradient-to-br from-purple-50 via-white to-pink-50 border-2 border-purple-200/50"
                            : isAdjacent
                              ? "bg-gradient-to-br from-gray-50 via-white to-gray-100 border border-gray-200/70"
                              : "bg-gradient-to-br from-gray-50 via-white to-gray-50 border border-gray-150/50"
                        }`}
                        style={{
                          transform: "rotateX(15deg)",
                          transformStyle: "preserve-3d",
                        }}
                      />

                      {/* Inner Plate Rim */}
                      <motion.div
                        animate={
                          isActive
                            ? {
                                boxShadow: [
                                  "inset 0 2px 8px rgba(147, 51, 234, 0.1), inset 0 -1px 4px rgba(255, 255, 255, 0.2)",
                                  "inset 0 3px 12px rgba(147, 51, 234, 0.15), inset 0 -1px 4px rgba(255, 255, 255, 0.3)",
                                  "inset 0 2px 8px rgba(147, 51, 234, 0.1), inset 0 -1px 4px rgba(255, 255, 255, 0.2)",
                                ],
                              }
                            : {
                                boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.05), inset 0 -1px 2px rgba(255, 255, 255, 0.1)",
                              }
                        }
                        transition={{
                          duration: 2.5,
                          repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                          ease: "easeInOut",
                        }}
                        className={`absolute top-1 left-1 right-1 bottom-1 rounded-full ${
                          isActive
                            ? "bg-gradient-to-br from-purple-25 to-white"
                            : "bg-gradient-to-br from-gray-25 to-white"
                        }`}
                        style={{
                          transform: "rotateX(15deg)",
                        }}
                      />

                      {/* Image sitting on the plate */}
                      <motion.div
                        animate={
                          isActive
                            ? {
                                y: [-1, -4, -1],
                                rotateY: [0, 5, -5, 0],
                                scale: [1, 1.05, 1],
                                filter: [
                                  "drop-shadow(0 4px 8px rgba(147, 51, 234, 0.2))",
                                  "drop-shadow(0 6px 12px rgba(147, 51, 234, 0.3))",
                                  "drop-shadow(0 4px 8px rgba(147, 51, 234, 0.2))",
                                ],
                              }
                            : {
                                y: 0,
                                rotateY: 0,
                                scale: 1,
                                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
                              }
                        }
                        transition={{
                          duration: 3,
                          repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                          ease: "easeInOut",
                        }}
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                          isMobile ? "w-12 h-12" : "w-16 h-16"
                        }`}
                        style={{
                          transform: "translateX(-50%) translateY(-50%) rotateX(5deg)",
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={category.imageUrl || "/placeholder.svg?height=64&width=64&query=category icon"}
                            alt={category.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </motion.div>

                      {/* Active State Sparkle Effects */}
                      <AnimatePresence>
                        {isActive && (
                          <>
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ 
                                opacity: [0, 1, 0], 
                                scale: [0, 1, 0],
                                rotate: [0, 180, 360],
                                y: [-2, -6, -2],
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                              className="absolute -top-2 -right-2 z-10"
                            >
                              <Sparkles className="w-5 h-5 text-purple-400" />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ 
                                opacity: [0, 1, 0], 
                                scale: [0, 1, 0],
                                rotate: [360, 180, 0],
                                y: [2, 6, 2],
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: 1.25,
                              }}
                              className="absolute -bottom-2 -left-2 z-10"
                            >
                              <Sparkles className="w-4 h-4 text-pink-400" />
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>

                      {/* Ambient Glow for Active State */}
                      {isActive && (
                        <motion.div
                          animate={{
                            opacity: [0.2, 0.4, 0.2],
                            scale: [1, 1.3, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-blue-400/20 blur-xl -z-10"
                        />
                      )}
                    </div>

                    {/* Category Name */}
                    <motion.span
                      className={`text-center leading-tight font-medium transition-all duration-300 ${
                        isMobile ? "text-sm" : "text-base"
                      } ${
                        isActive 
                          ? "text-purple-700 font-semibold" 
                          : isAdjacent
                            ? "text-gray-700 group-hover:text-gray-900"
                            : "text-gray-600 group-hover:text-gray-800"
                      }`}
                      animate={
                        isActive
                          ? {
                              y: [0, -2, 0],
                              textShadow: [
                                "0 1px 2px rgba(147, 51, 234, 0.1)",
                                "0 2px 4px rgba(147, 51, 234, 0.2)",
                                "0 1px 2px rgba(147, 51, 234, 0.1)",
                              ],
                            }
                          : { 
                              y: 0,
                              textShadow: "none",
                            }
                      }
                      transition={{
                        duration: 2.5,
                        repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                        ease: "easeInOut",
                      }}
                    >
                      {category.name}
                    </motion.span>

                    {/* Active State Bottom Indicator */}
                    <motion.div
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ 
                        scaleX: isActive ? 1 : 0, 
                        opacity: isActive ? 1 : 0,
                        boxShadow: isActive 
                          ? "0 2px 8px rgba(147, 51, 234, 0.3)"
                          : "none"
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
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

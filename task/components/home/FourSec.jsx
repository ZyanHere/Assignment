"use client"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { ChevronRight, Sparkles, ArrowRight, Play, Calendar, Utensils, Hotel } from "lucide-react"

export default function FourSec() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const scrollRef = useRef(null)
  const x = useMotionValue(0)
  const background = useTransform(x, [-100, 0, 100], ["#f8fafc", "#fef7ff", "#f0f9ff"])

  const items = [
    {
      img: "/home/hero1/stay.png?height=192&width=300",
      label: "Stay",
      link: "/home/hotel",
      icon: Hotel,
      gradient: "from-blue-500 to-cyan-500",
      description: "Luxury accommodations",
      color: "blue",
    },
    {
      img: "/home/hero1/movie.png?height=192&width=300",
      label: "Movie",
      link: "/home/movie",
      icon: Play,
      gradient: "from-purple-500 to-pink-500",
      description: "Entertainment experiences",
      color: "purple",
    },
    {
      img: "/home/hero1/buffet.png?height=192&width=300",
      label: "Buffet",
      link: "/home/buffet",
      icon: Utensils,
      gradient: "from-orange-500 to-red-500",
      description: "Culinary delights",
      color: "orange",
    },
    {
      img: "/home/hero1/event.png?height=192&width=300",
      label: "Event",
      link: "/home/event",
      icon: Calendar,
      gradient: "from-green-500 to-emerald-500",
      description: "Special occasions",
      color: "green",
    },
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, items.length])

  // Scroll to active item
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const containerWidth = container.clientWidth
      let itemWidth

      // Calculate item width based on screen size
      if (window.innerWidth >= 1024) {
        // Desktop: 25% - 12px gap
        itemWidth = containerWidth * 0.25 - 12
      } else if (window.innerWidth >= 768) {
        // Tablet: 50% - 8px gap
        itemWidth = containerWidth * 0.5 - 8
      } else if (window.innerWidth >= 640) {
        // Small tablet: 45vw
        itemWidth = window.innerWidth * 0.45
      } else {
        // Mobile: 70vw
        itemWidth = window.innerWidth * 0.7
      }

      const gap = window.innerWidth >= 768 ? 16 : 16
      const scrollPosition = activeIndex * (itemWidth + gap)

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }
  }, [activeIndex])

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const containerWidth = container.clientWidth
      let itemWidth

      if (window.innerWidth >= 1024) {
        itemWidth = containerWidth * 0.25 - 12
      } else if (window.innerWidth >= 768) {
        itemWidth = containerWidth * 0.5 - 8
      } else if (window.innerWidth >= 640) {
        itemWidth = window.innerWidth * 0.45
      } else {
        itemWidth = window.innerWidth * 0.7
      }

      const gap = 16
      const scrollLeft = container.scrollLeft
      const newIndex = Math.round(scrollLeft / (itemWidth + gap))

      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < items.length) {
        setActiveIndex(newIndex)
        setIsAutoPlaying(false)
      }
    }
  }

  useEffect(() => {
    const handleResize = () => {
      // Recalculate scroll position when screen size changes
      if (scrollRef.current) {
        setTimeout(() => {
          // Use setTimeout to ensure DOM has updated
          const container = scrollRef.current
          if (container) {
            const containerWidth = container.clientWidth
            let itemWidth

            if (window.innerWidth >= 1024) {
              itemWidth = containerWidth * 0.25 - 12
            } else if (window.innerWidth >= 768) {
              itemWidth = containerWidth * 0.5 - 8
            } else if (window.innerWidth >= 640) {
              itemWidth = window.innerWidth * 0.45
            } else {
              itemWidth = window.innerWidth * 0.7
            }

            const gap = 16
            const scrollPosition = activeIndex * (itemWidth + gap)

            container.scrollTo({
              left: scrollPosition,
              behavior: "smooth",
            })
          }
        }, 100)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [activeIndex])

  return (
    <motion.div style={{ backgroundColor: background }} className="relative py-8 overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Header Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="px-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Explore Services
            </h2>
            <p className="text-gray-600 mt-1">Discover amazing experiences</p>
          </div>

          {/* Auto-play Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-2 rounded-full transition-all duration-300 ${
              isAutoPlaying ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-600"
            }`}
          >
            <motion.div
              animate={{ rotate: isAutoPlaying ? 360 : 0 }}
              transition={{ duration: 2, repeat: isAutoPlaying ? Infinity : 0, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mb-6 px-4">
        {items.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setActiveIndex(index)
              setIsAutoPlaying(false)
            }}
            className="relative h-1 bg-gray-200 rounded-full overflow-hidden"
            style={{ width: index === activeIndex ? "32px" : "16px" }}
            animate={{ width: index === activeIndex ? "32px" : "16px" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`h-full bg-gradient-to-r ${items[index].gradient} rounded-full`}
              initial={{ width: "0%" }}
              animate={{
                width: index === activeIndex ? "100%" : "0%",
                opacity: index === activeIndex ? 1 : 0.5,
              }}
              transition={{
                duration: index === activeIndex && isAutoPlaying ? 4 : 0.3,
                ease: "linear",
              }}
            />
          </motion.button>
        ))}
      </div>

      {/* Main Content */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 sm:gap-4 px-4 w-full overflow-x-auto flex-nowrap snap-x snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, index) => {
          const Icon = item.icon
          const isActive = index === activeIndex
          const isHovered = hoveredIndex === index

          return (
            <Link
              key={index}
              href={item.link}
              className="min-w-[70vw] sm:min-w-[45vw] md:min-w-[calc(50%-8px)] lg:min-w-[calc(25%-12px)] flex-shrink-0 snap-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                layout
                whileHover={{
                  scale: 1.02,
                  y: -8,
                  rotateY: 5,
                }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  y: isActive ? -4 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  layout: { duration: 0.3 },
                }}
                className="h-full relative group cursor-pointer"
              >
                {/* Glassmorphism Card */}
                <div
                  className={`
                  relative h-full rounded-3xl overflow-hidden
                  bg-white/80 backdrop-blur-xl border border-white/20
                  shadow-xl hover:shadow-2xl transition-all duration-500
                  ${isActive ? "shadow-purple-200/50" : ""}
                `}
                >
                  {/* Gradient Border Animation */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    animate={{ opacity: isActive ? 0.1 : 0 }}
                  />

                  {/* Image Section */}
                  <div className="relative w-full h-32 sm:h-36 md:h-44 lg:h-48 overflow-hidden rounded-t-3xl">
                    <motion.div
                      animate={{ scale: isHovered ? 1.1 : 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-full h-full"
                    >
                      <Image
                        src={item.img || "/placeholder.svg?height=192&width=300&query=service image"}
                        alt={item.label}
                        fill
                        className="object-cover"
                      />
                    </motion.div>

                    {/* Floating Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{
                        scale: isActive ? 1 : 0.8,
                        rotate: isActive ? 0 : -90,
                        y: isHovered ? -5 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className={`absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-white/20`}
                    >
                      <Icon className={`w-5 h-5 text-${item.color}-600`} />
                    </motion.div>

                    {/* Gradient Overlay */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent`}
                      animate={{ opacity: isHovered ? 1 : 0.6 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Sparkle Effects */}
                    <AnimatePresence>
                      {isActive && (
                        <>
                          {Array.from({ length: 3 }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                                x: [0, Math.random() * 40 - 20],
                                y: [0, Math.random() * 40 - 20],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut",
                              }}
                              className="absolute top-1/2 left-1/2 w-2 h-2"
                            >
                              <Sparkles className="w-full h-full text-white" />
                            </motion.div>
                          ))}
                        </>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-5 md:p-6 relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className={`w-full h-full bg-gradient-to-br ${item.gradient}`} />
                    </div>

                    <div className="relative z-10">
                      {/* Label */}
                      <motion.h3
                        animate={{
                          scale: isActive ? 1.05 : 1,
                          color: isHovered
                            ? `rgb(${item.color === "blue" ? "59, 130, 246" : item.color === "purple" ? "147, 51, 234" : item.color === "orange" ? "249, 115, 22" : "34, 197, 94"})`
                            : "#1f2937",
                        }}
                        className="font-bold text-xl md:text-2xl text-gray-900 mb-2 tracking-wide"
                      >
                        {item.label}
                      </motion.h3>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-gray-600 text-sm mb-4"
                      >
                        {item.description}
                      </motion.p>

                      {/* Action Button */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-gray-700 group-hover:text-purple-600 transition-colors duration-300"
                      >
                        <span className="text-sm font-medium">Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.gradient} opacity-0 blur-xl -z-10`}
                    animate={{ opacity: isHovered ? 0.3 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>

      {/* Bottom Navigation Hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center mt-6 md:hidden"
      >
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span>Swipe to explore</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

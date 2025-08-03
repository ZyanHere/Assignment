"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import StoreCard from "./StoreCard"
import Image from "next/image"
import { MapPin, Star, ChevronRight } from "lucide-react"

const StoreCarousel = ({ vendorId, name, location, logo, distance, products }) => {
  const showCarousel = products.length > 4

  return (
    <motion.div
      className="w-full max-w-[1500px] mx-auto mt-6 mb-16 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-6 shadow-xl">
        {/* Store Heading */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href={`/stores/${vendorId}`} className="flex items-center gap-4 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 p-0.5 shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <Image
                    src={logo || "/placeholder.svg"}
                    alt={`${name} Logo`}
                    className="w-full h-full object-cover"
                    width={64}
                    height={64}
                  />
                </div>
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Star className="w-3 h-3 text-white fill-white" />
              </motion.div>
            </motion.div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  {name}
                </h2>
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ x: 5 }}
                >
                  <ChevronRight className="w-5 h-5 text-blue-500" />
                </motion.div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">{location}</span>
                <span className="text-sm">•</span>
                <span className="text-sm font-medium text-green-600">{distance} away</span>
              </div>
            </div>
          </Link>

          <motion.div
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{products.length} Products</span>
          </motion.div>
        </motion.div>

        {/* Mobile Scroll */}
        <div className="flex overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory sm:hidden -mx-2 px-2 pb-2">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-64 snap-start"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StoreCard product={product} storeName={name} />
            </motion.div>
          ))}
        </div>

        {/* Desktop Carousel */}
        <div className="hidden sm:block">
          <Carousel className="relative">
            {showCarousel && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <CarouselPrevious className="-left-4 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-blue-500 to-purple-500 border-0 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg" />
              </motion.div>
            )}

            <CarouselContent>
              {products.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[80%] sm:basis-[50%] md:basis-[33.33%] lg:basis-[25%] xl:basis-[19.23%]"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <StoreCard product={product} storeName={name} />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {showCarousel && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <CarouselNext className="-right-4 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-blue-500 to-purple-500 border-0 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg" />
              </motion.div>
            )}
          </Carousel>
        </div>
      </div>
    </motion.div>
  )
}

export default StoreCarousel

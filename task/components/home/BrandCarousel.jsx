"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import ProductCard from "./ProductCard"

// Helper to chunk arrays
function chunkArray(array, size) {
  const chunked = []
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size))
  }
  return chunked
}

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
}

const BrandCarousel = ({ data = [], loading = false }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (loading) {
    return (
      <div className="flex gap-3 overflow-x-auto p-4 md:p-6">
        {isMobile ? (
          <div className="grid grid-cols-2 gap-3 w-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[260px] w-[170px] rounded-lg flex-shrink-0" />
            ))}
          </div>
        ) : (
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[260px] w-[170px] rounded-lg flex-shrink-0" />
          ))
        )}
      </div>
    )
  }

  const mappedProducts = data.map((p) => {
    const variant = p.variants?.[0] || {}
    const basePrice = variant?.price?.base_price || 0
    const salePrice = variant?.price?.sale_price || basePrice

    return {
      ...p,
      id: p._id,
      name: p.name,
      brand: p.brand,
      seller: p.vendor_store_id?.store_name || "Unknown Seller",
      discountedPrice: salePrice,
      originalPrice: basePrice,
      image:
        variant?.images?.[0]?.url ||
        p.images?.[0]?.url ||
        "/placeholder.svg?height=120&width=170",
      weight:
        p.attributes?.find((a) => a.name?.toLowerCase() === "weight")?.value ||
        "1 unit",
      time: p.timing?.end_date || null,
      discount:
        basePrice && salePrice && basePrice > 0
          ? Math.round(((basePrice - salePrice) / basePrice) * 100)
          : 0,
      variants: p.variants || [],
      category: p.category,
      subcategory: p.subcategory,
    }
  })

  return (
    <Carousel className="w-full mx-auto p-4 md:p-6">
      <CarouselContent className="-ml-1">
        {isMobile
          ? chunkArray(mappedProducts, 4).map((chunk, idx) => (
              <CarouselItem key={idx} className="pl-2 basis-full">
                <div className="grid grid-cols-2 gap-3">
                  {chunk.map((product, i) => (
                    <motion.div
                      key={product.id}
                      className="w-full flex justify-center"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={i}
                      variants={cardVariants}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              </CarouselItem>
            ))
          : mappedProducts.map((product, i) => (
              <CarouselItem
                key={product.id}
                className="pl-2 basis-full xs:basis-1/2 sm:basis-1/3 md:basis-1/5 lg:basis-1/6 xl:basis-1/8"
              >
                <motion.div
                  className="p-1"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={cardVariants}
                >
                  <ProductCard product={product} />
                </motion.div>
              </CarouselItem>
            ))}
      </CarouselContent>

      <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 -left-8 h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200" />
      <CarouselNext className="absolute top-1/2 -translate-y-1/2 -right-8 h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200" />
    </Carousel>
  )
}

export default BrandCarousel

"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

export default function StoreSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="pl-4 pr-4 pb-12 mx-auto w-full max-w-[1700px] relative z-10">
        {/* Breadcrumb */}
        <motion.div
          className="mt-8 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-xl p-4">
            <Skeleton className="h-8 w-[200px] bg-gradient-to-r from-blue-200 to-purple-200" />
          </div>
        </motion.div>

        {/* Banner */}
        <motion.div
          className="relative w-full mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl p-6">
            <Skeleton className="w-full h-[300px] rounded-xl bg-gradient-to-br from-blue-200 to-purple-200" />
          </div>
        </motion.div>

        {/* Store Sections */}
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, storeIndex) => (
            <motion.div
              key={storeIndex}
              className="backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl p-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: storeIndex * 0.2 }}
            >
              {/* Store Header */}
              <div className="flex items-center gap-4 mb-6">
                <Skeleton className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-200 to-purple-200" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg" />
                  <Skeleton className="h-4 w-24 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg" />
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 5 }).map((_, productIndex) => (
                  <motion.div
                    key={productIndex}
                    className="backdrop-blur-sm bg-white/40 border border-white/20 rounded-xl p-4 space-y-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: storeIndex * 0.2 + productIndex * 0.1,
                    }}
                  >
                    <Skeleton className="w-full h-32 rounded-xl bg-gradient-to-br from-blue-200 to-purple-200" />
                    <Skeleton className="h-4 w-full bg-gradient-to-r from-blue-200 to-purple-200 rounded" />
                    <Skeleton className="h-3 w-3/4 bg-gradient-to-r from-blue-200 to-purple-200 rounded" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-16 bg-gradient-to-r from-green-200 to-emerald-200 rounded" />
                      <Skeleton className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-200 to-purple-200" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

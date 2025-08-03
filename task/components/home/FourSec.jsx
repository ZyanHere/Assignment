"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function FourSec() {
  const items = [
    { img: "/home/hero1/stay.png?height=192&width=300", label: "Stay", link: "/home/hotel" },
    { img: "/home/hero1/movie.png?height=192&width=300", label: "Movie", link: "/home/movie" },
    { img: "/home/hero1/buffet.png?height=192&width=300", label: "Buffet", link: "/home/buffet" },
    { img: "/home/hero1/event.png?height=192&width=300", label: "Event", link: "/home/event" },
  ]

  return (
    <div className="flex gap-4 px-4 py-6 w-full overflow-x-auto flex-nowrap snap-x snap-mandatory bg-white  no-scrollbar">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className="min-w-[70vw] md:min-w-[calc(25%-12px)] flex-shrink-0 rounded-2xl overflow-hidden bg-white cursor-pointer transition-all duration-300 ease-in-out snap-center group"
        >
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full flex flex-col rounded-2xl border border-black hover:border-purple-200"
          >
            {/* Image section */}
            <div className="relative w-full h-32 sm:h-40 md:h-48 overflow-hidden">
              <Image
                src={item.img || "/placeholder.svg"}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            {/* Label */}
            <div className="p-4 flex-grow flex items-center justify-center">
              <span className="font-bold text-lg md:text-xl text-gray-900 block text-center tracking-wide group-hover:text-yellow-500 transition-colors duration-300">
                {item.label}
              </span>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}

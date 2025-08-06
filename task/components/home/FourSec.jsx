"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, ArrowRight, Play, Calendar, Utensils, Hotel, MapPin, Users, Clock } from 'lucide-react';

export default function FourSecImproved() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const items = [
    {
      img: "/home/hero1/stay2.png",
      label: "Stay",
      link: "/home/hotel",
      icon: Hotel,
      gradient: "from-blue-500 to-cyan-500",
      description: "Luxury accommodations",
      color: "blue",
    },
    {
      img: "/home/hero1/movies2.png",
      label: "Movie",
      link: "/home/movie",
      icon: Play,
      gradient: "from-purple-500 to-pink-500",
      description: "Entertainment experiences",
      color: "purple",
    },
    {
      img: "/home/hero1/buffet2.png",
      label: "Buffet",
      link: "/home/buffet",
      icon: Utensils,
      gradient: "from-orange-500 to-red-500",
      description: "Culinary delights",
      color: "orange",
    },
    {
      img: "/home/hero1/event2.png",
      label: "Event",
      link: "/home/event",
      icon: Calendar,
      gradient: "from-green-500 to-emerald-500",
      description: "Special occasions",
      color: "green",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-[700px]">
      {/* Refined Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-100/30 to-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-pink-100/30 to-orange-100/30 rounded-full blur-2xl"></div>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch gap-12 p-8 lg:p-12 min-h-[700px]">
        {/* Left Side - Services Grid (55%) */}
        <div className="w-full lg:w-[55%] space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-4">
              Explore Services
            </h2>
            <p className="text-gray-600 text-xl max-w-md">
              Curated experiences for every moment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((item, index) => {
              const Icon = item.icon;
              const isHovered = hoveredIndex === index;
              return (
                <Link
                  key={index}
                  href={item.link}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="h-full relative group cursor-pointer"
                  >
                    <div className="relative h-full rounded-3xl overflow-hidden bg-white/90 backdrop-blur-xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                      <div className="relative w-full h-40 overflow-hidden">
                        <Image
                          src={item.img || "/placeholder.svg"}
                          alt={item.label}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        
                        <motion.div
                          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Icon className={`w-5 h-5 text-${item.color}-600`} />
                        </motion.div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-bold text-xl text-gray-900 mb-2">{item.label}</h3>
                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-2 text-purple-600 font-medium"
                        >
                          <span>Explore</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Side - Enhanced Hero (45%) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full lg:w-[45%] flex flex-col justify-center"
        >
          <div className="relative">
            {/* Main Hero Content */}
            <div className="relative bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/30">
              
              {/* Typography */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <h3 className="text-3xl lg:text-4xl xl:text-5xl font-light leading-tight text-gray-800 mb-6">
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent font-semibold">
                    Discover hidden gems
                  </span>{' '}
                  <span className="text-gray-700">
                    across categories — from{' '}
                  </span>
                  <span className="relative inline-block font-semibold text-gray-900">
                    hotels
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    />
                  </span>{' '}
                  <span className="text-gray-700">
                    to delightful{' '}
                  </span>
                  <span className="relative inline-block font-semibold text-gray-900">
                    concerts
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                    />
                  </span>
                  <span className="text-gray-700">.</span>
                </h3>
              </motion.div>

              {/* Feature Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-4 mb-8"
              >
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="p-2 rounded-full bg-purple-100">
                    <MapPin className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="font-medium">50+ Cities Worldwide</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="p-2 rounded-full bg-pink-100">
                    <Users className="w-4 h-4 text-pink-600" />
                  </div>
                  <span className="font-medium">Trusted by 100K+ Users</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium">24/7 Customer Support</span>
                </div>
              </motion.div>

              {/* Enhanced Image */}
              

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="mt-6 grid grid-cols-3 gap-4 text-center"
              >
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">1000+</div>
                  <div className="text-xs text-gray-600">Experiences</div>
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">50+</div>
                  <div className="text-xs text-gray-600">Cities</div>
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">4.9★</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

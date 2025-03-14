import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  "grocery/grocery-banner.png",
  "grocery/grocery-banner.png",
  "grocery/grocery-banner.png",
  "grocery/grocery-banner.png",
  "grocery/grocery-banner.png",
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
 
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl">
        <div
          className="flex w-full h-full transition-transform ease-in-out duration-500 rounded-2xl"
          style={{ transform: `translateX(-${currentIndex * 90}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-[90%] h-full object-cover flex-shrink-0 rounded-2xl mr-4"
            />
          ))}
        </div>
      </div>

      <div className="flex space-x-12 mt-8">
        {images.map((_, index) => (
          <motion.div
            key={index}
            className={
              currentIndex === index
                ? "w-30 h-8 bg-blue-500 rounded-full"
                : "w-8 h-8 bg-gray-400 rounded-full"
            }
            animate={{ scale: currentIndex === index ? 1.2 : 1 }}
          />
        ))}
      </div>
    </div>
  );
}


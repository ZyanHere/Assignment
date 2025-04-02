import { useState, useEffect } from "react";

const images = [
  "/home/fashion/fashion-banner.jpg",
  "/home/fashion/fashion-banner2.jpg",
  "/home/fashion/fashion-banner3.jpg",
  "/home/fashion/fashion-banner5.jpg",
  "/home/fashion/fashion-banner6.jpg",
];


export default function ElecBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full" role="region" aria-label="Promotional banner">
      <div className="relative w-full h-[200px] md:h-[300px] lg:h-[350px] overflow-hidden rounded-2xl">
        <div
          className="flex w-full h-full transition-transform ease-in-out duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 80}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-[80%] h-full object-cover flex-shrink-0 rounded-md mr-4"
            />
          ))}
        </div>
      </div>
    </div>
  );
}


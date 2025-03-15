import { useState, useEffect } from "react";

const images = [
  "home/grocery/grocery-banner.png",
  "home/grocery/grocery-banner.png",
  "home/grocery/grocery-banner.png",
  "home/grocery/grocery-banner.png",
  "home/grocery/grocery-banner.png",
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center ">
      <div className="relative w-full h-[200px] md:h-[300px] lg:h-[350px] overflow-hidden rounded-2xl">
        <div
          className="flex w-full h-full transition-transform ease-in-out duration-500 rounded-2xl"
          style={{ transform: `translateX(-${currentIndex * 80}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-[80%] h-full object-cover flex-shrink-0 rounded-2xl mr-4"
            />
          ))}
        </div>
      </div>
    </div>
  );
}


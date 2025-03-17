"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const StoreSlugBanner = ({ name, location, banner }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 1,
    seconds: 23,
  });

  // Countdown Timer Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(interval);
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full p-10">
      {/* Store Banner Image */}
      <Image
        src={banner}
        alt={`${name} Store`}
        width={1200}
        height={500}
        className="w-full h-auto rounded-lg object-contain"
      />

      {/* Bottom Deal Section */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[80%] h-[200px] bg-[#EECB9F] p-10 rounded-2xl shadow-lg flex flex-col justify-around">
        {/* Timer Section */}
        <div className="flex gap-1 text-center">
          <div className="bg-white px-2 py-1 rounded-md text-black font-bold text-2xl">
            {String(timeLeft.hours).padStart(2, "0")}
          </div>
          <p className="text-xs text-gray-600">hours</p>
          <div className="bg-white px-2 py-1 rounded-md text-black font-bold text-2xl">
            {String(timeLeft.minutes).padStart(2, "0")}
          </div>
          <p className="text-xs text-gray-600">minutes</p>
          <div className="bg-white px-2 py-1 rounded-md text-black font-bold text-2xl">
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
          <p className="text-xs text-gray-600">seconds</p>
        </div>

        {/* Store Info */}
        <div className="flex justify-between mt-4">
          <div className="text-black font-semibold">
            <p className="text-[34px]">{name}</p>
            <p className="text-2xl opacity-80">{location}</p>
          </div>

          {/* Deal Button */}
          <div className="mt-4">
            <button className="bg-white text-black text-[40px] font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-200">
              Grab Deal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSlugBanner;

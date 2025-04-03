"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import useTimer from "@/lib/hooks/useTimer";

const StoreBanner = () => {
  const initialDuration = 3 * 60 * 60 + 1 * 60 + 23; // 3h 1m 23s in seconds
  const [endTime, setEndTime] = useState(null);
  
  useEffect(() => {
    // Set end time only once when component mounts
    setEndTime(Date.now() + initialDuration * 1000);
  }, []);

  const timeLeft = useTimer(endTime);

  return (
    <div className="relative w-full p-10">
      <Image
        src="/store/pentaloon.png"
        alt="Pantaloons Store"
        width={1200}
        height={500}
        className="w-full h-auto rounded-lg object-contain"
        priority
      />

      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[80%] h-[200px] bg-[#EECB9F] p-10 rounded-2xl shadow-lg flex flex-col justify-around">
        {endTime && !timeLeft.expired ? (
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
        ) : (
          <div className="text-center text-red-500 font-bold">
            {timeLeft.expired ? "Deal Expired!" : "Loading timer..."}
          </div>
        )}

        <div className="flex justify-between mt-4">
          <div className="text-black font-semibold">
            <p className="text-[34px]">Pantaloons</p>
            <p className="text-2xl opacity-80">2.9 km, Ambience Mall, Gurgaon</p>
          </div>

          <div className="mt-4">
            <button 
              className="bg-white text-black text-[40px] font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition-all"
              disabled={timeLeft.expired || !endTime}
            >
              {timeLeft.expired ? "Deal Expired" : "Grab Deal"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreBanner;
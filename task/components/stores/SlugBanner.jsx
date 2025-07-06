"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import useTimer from "@/lib/hooks/useTimer";

const StoreSlugBanner = ({ name, location, banner }) => {
  /* demo timer: 3 h 1 m 23 s */
  const initialDuration = 3 * 60 * 60 + 1 * 60 + 23;
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    setEndTime(Date.now() + initialDuration * 1000);
  }, []);

  const timeLeft = useTimer(endTime);

  return (
    <div className="relative w-full">
     
      <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
        <Image
          src={banner}
          alt={`${name} banner`}
          width={1920}
          height={640}
          className="w-full h-auto"
          priority
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      
      <div
        className="
          absolute bottom-0
          translate-y-[35%] sm:translate-y-25%
          left-1/2 -translate-x-1/2

          w-[80%]           
          sm:w-[80%]        
          md:w-[80%]
          lg:w-[80%]        
          xl:w-[80%]        
        "
      >
        <div className="bg-[#EECB9F] backdrop-blur-sm rounded-xl p-2 sm:p-3 sm:py-5 md:p-4 lg:p-8 shadow-xl">
          {/* ----- timer ----- */}
          {endTime && !timeLeft.expired ? (
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1 sm:mb-3">
              {/* hours */}
              <div className="bg-white px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-2 rounded-md text-black font-bold text-[11px] sm:text-sm md:text-base lg:text-lg">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <p className="text-[9px] sm:text-xs md:text-sm text-gray-600">hours</p>

              
              <div className="bg-white px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-2 rounded-md text-black font-bold text-[11px] sm:text-sm md:text-base lg:text-lg">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <p className="text-[9px] sm:text-xs md:text-sm text-gray-600">minutes</p>

              
              <div className="bg-white px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-2 rounded-md text-black font-bold text-[11px] sm:text-sm md:text-base lg:text-lg">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <p className="text-[9px] sm:text-xs md:text-sm text-gray-600">seconds</p>
            </div>
          ) : (
            <div className="text-left mb-1 sm:mb-3">
              <span className="text-[10px] sm:text-sm md:text-base font-semibold text-red-500">
                {timeLeft.expired ? "Deal Expired!" : "Loading timer..."}
              </span>
            </div>
          )}

          
          <div className="flex items-center justify-between gap-1.5 sm:gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-xs sm:text-base md:text-lg lg:text-2xl font-bold text-black truncate">
                {name}
              </h3>
              <p className="text-[9px] sm:text-sm md:text-base text-black opacity-80 truncate">
                {location}
              </p>
            </div>

            <button
              className={`
                px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-5 lg:py-3
                text-[10px] sm:text-sm md:text-base lg:text-2xl xl:text-3xl
                font-semibold rounded-lg shadow-md transition-all
                whitespace-nowrap flex-shrink-0
                ${
                  timeLeft.expired
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-white text-black hover:bg-gray-100 active:scale-95 hover:shadow-lg"
                }
              `}
              disabled={timeLeft.expired}
            >
              {timeLeft.expired ? "Deal Expired" : "Grab Deal"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSlugBanner;

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
    <div className="relative overflow-hidden w-full p-2 sm:p-3 md:p-6 lg:p-8 xl:p-10">
      <Image
        src="/store/pentaloon.png"
        alt="Pantaloons Store"
        width={1200}
        height={700}
        className="w-full  rounded-lg object-contain"
        priority
      />

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[80%] sm:w-[85%] md:w-[80%] min-h-[0%] bg-[#EECB9F] p-2 sm:p-3 md:p-6 lg:p-8 xl:p-10 rounded-xl sm:rounded-2xl shadow-lg flex flex-col justify-between">
        {endTime && !timeLeft.expired ? (
          <div className="flex flex-wrap items-center justify-start gap-x-1 gap-y-1 sm:gap-x-2 md:gap-x-3 flex-shrink-0">
            <div className="bg-white px-1 py-1 sm:px-2 sm:py-1 md:px-3 md:py-2 rounded-md text-black font-bold text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-600 flex-shrink-0">hours</p>

            <div className="bg-white px-1 py-1 sm:px-2 sm:py-1 md:px-3 md:py-2 rounded-md text-black font-bold text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-600 flex-shrink-0">minutes</p>

            <div className="bg-white px-1 py-1 sm:px-2 sm:py-1 md:px-3 md:py-2 rounded-md text-black font-bold text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-600 flex-shrink-0">seconds</p>
          </div>

        ) : (
          <div className="text-center text-red-500 font-bold text-[10px] sm:text-xs md:text-sm lg:text-base">
            {timeLeft.expired ? "Deal Expired!" : "Loading timer..."}
          </div>
        )}

        <div className="flex flex-row justify-between items-center mt-1 sm:mt-2 md:mt-4 gap-2 flex-shrink-0">
          <div className="text-black font-semibold min-w-0 flex-1">
            <p className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl leading-tight">Pantaloons</p>
            <p className="text-[8px] sm:text-[10px] md:text-sm lg:text-base xl:text-lg opacity-80 leading-tight">2.9 km, Ambience Mall, Gurgaon</p>
          </div>

          <div className="flex-shrink-0">
            <button 
              className="bg-white text-black text-[8px] sm:text-[10px] md:text- lg:text-xl xl:text-2xl font-semibold px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-5 lg:py-3 xl:px-6 xl:py-3 rounded-lg shadow-md hover:bg-gray-200 transition-all whitespace-nowrap"
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


//different css, not allowed
// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import useTimer from "@/lib/hooks/useTimer";

// const StoreBanner = () => {
//   // 3 h 1 m 23 s
//   const initialDuration = 3 * 60 * 60 + 1 * 60 + 23;
//   const [endTime, setEndTime] = useState(null);

//   useEffect(() => {
//     setEndTime(Date.now() + initialDuration * 1000);
//   }, []);

//   const { hours, minutes, seconds, expired } = useTimer(endTime);

//   return (
    
//     <section className="relative w-full overflow-hidden rounded-xl shadow-lg">
//       {/* Background image – fill mode keeps to keepit responsive */}
//       <Image
//         src="/store/pentaloon.png"
//         alt="Pantaloons store front"
//         fill
//         priority
//         className="object-cover"
//       />
//       {/* Dark overlay so text is readable */}
//       <div className="absolute inset-0 bg-black/40" />

      
//       <div className="relative z-10 flex flex-col gap-6 px-4 py-8 sm:py-12 sm:px-8 lg:flex-row lg:items-center">
        
//         <div className="flex items-center gap-1 text-white">
//           {expired ? (
//             <p className="text-lg font-semibold">Deal expired</p>
//           ) : (
//             <>
//               <TimeBox value={hours} label="hrs" />
//               <TimeBox value={minutes} label="min" />
//               <TimeBox value={seconds} label="sec" />
//             </>
//           )}
//         </div>

      
//         <div className="flex-1 text-white">
//           <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">
//             Pantaloons
//           </h2>
//           <p className="text-sm sm:text-base opacity-90">
//             2.9 km · Ambience Mall, Gurgaon
//           </p>
//         </div>

       
//         <button
//           disabled={expired || !endTime}
//           className="w-full sm:w-auto bg-yellow-400/90 hover:bg-yellow-300 active:bg-yellow-400 text-black font-semibold rounded-lg px-6 py-3 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           {expired ? "Deal expired" : "Grab deal"}
//         </button>
//       </div>
//     </section>
//   );
// };

// /* ----------------------------- */
// /* Small helper for each time unit */
// const TimeBox = ({ value, label }) => (
//   <div className="text-center">
//     <div className="bg-white text-black rounded-md px-2 py-1 text-lg sm:text-2xl font-bold tabular-nums leading-none">
//       {String(value).padStart(2, "0")}
//     </div>
//     <span className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-300">
//       {label}
//     </span>
//   </div>
// );

// export default StoreBanner;

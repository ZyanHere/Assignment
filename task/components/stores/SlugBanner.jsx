"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import useTimer from "@/lib/hooks/useTimer"

const SlugBanner = ({
  bannerUrl,
  storeName,
  fullAddress,
  duration = 3 * 60 * 60 + 60 + 23,
}) => {
  const [endTime, setEndTime] = useState(0)

  useEffect(() => {
    // Set once when component mounts
    setEndTime(Date.now() + duration * 1000)
  }, [duration])

  const { hours, minutes, seconds, expired } = useTimer(endTime)

  const formatTime = (time) => time.toString().padStart(2, "0")

  if (!endTime) return null // or loader until endTime is ready

  return (
    // <div className="w-full mx-auto overflow-hidden rounded-2xl shadow-md">
     <div>
      {/* <div className="bg-slate-800 px-6 py-4 relative">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl md:text-3xl font-bold italic">{storeName || "Store"}</h1>
          <div className="text-gray-300 text-sm font-medium text-right hidden sm:block">
            <div>ARTISAN</div>
            <div>PANTRY</div>
          </div>
        </div>
      </div> */}

      {/* Store Image with Overlay */}
      <div className="relative overflow-hidden w-full sm:p-3 md:p-6 lg:p-8 xl:p-10 h-auto">
        <div
          className="h-48 md:h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerUrl || "/fallback/banner.jpg"})` }}
        >
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[80%] sm:w-[85%] md:w-[80%] min-h-[0%] bg-[#EECB9F]   rounded-xl sm:rounded-2xl shadow-lg flex flex-col justify-between">
            <div className="bg-lime-200/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg">
              <div className="flex items-center justify-between flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-2xl md:text-3xl font-bold text-slate-800">{formatTime(hours)}</span>
                    <span className="text-xl md:text-2xl font-bold text-slate-800 mx-1">:</span>
                    <span className="text-2xl md:text-3xl font-bold text-slate-800">{formatTime(minutes)}</span>
                    <span className="text-xl md:text-2xl font-bold text-slate-800 mx-1">:</span>
                    <span className="text-2xl md:text-3xl font-bold text-slate-800">{formatTime(seconds)}</span>
                  </div>

                  <div className="flex items-center gap-8 text-xs md:text-sm text-slate-600 mb-3">
                    <span>hours</span>
                    <span>minutes</span>
                    <span>seconds</span>
                  </div>

                  <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-1">{storeName}</h2>
                  <p className="text-sm md:text-base text-slate-600">{fullAddress}</p>
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-4">
                  <Button
                    className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-3 rounded-xl font-semibold text-sm md:text-base"
                    disabled={expired}
                  >
                    {expired ? "Deal Expired" : "Grab Deal"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlugBanner

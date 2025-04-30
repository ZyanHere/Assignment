"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LocationInfo() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col items-center justify-center px-10 relative">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute left-6 top-6 text-yellow-600 text-2xl"
        >
          ←
        </button>

        {/* Title */}
        <h2 className="text-[28px] font-semibold mb-6">Location Information</h2>

        {/* Map Placeholder with Marker and Text */}
        <div className="relative w-[90%] h-[350px] rounded-lg overflow-hidden shadow-md bg-gray-200">
          <Image
            src="/auth-asset/map-placeholder.png" // Replace with actual static map image if needed
            alt="Map"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[100%] text-center">
            <div className="bg-black text-white text-xs p-1 rounded mb-1 shadow">
              Order will be delivered here
            </div>
            <div className="text-[24px] font-bold text-purple-600">
              Bengaluru
            </div>
          </div>
        </div>

        {/* Address Card with Confirm Button */}
        <div className="w-[90%] bg-white p-4 rounded-xl mt-6 shadow-md border">
          <p className="font-bold text-lg">KG Halli</p>
          <p className="text-gray-600 text-sm mt-1">
            Ashok Nagar, D’ Souza Layout, KG Halli, Bengaluru
          </p>
          <button
            onClick={() => alert("Confirm clicked")}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 mt-4 rounded-lg"
          >
            Confirm & Continue
          </button>
        </div>
      </div>

      {/* Right Side Background Illustration */}
      <div className="hidden md:block w-1/2 shrink-0 rounded-l-[40px] relative">
        <Image
          src="/auth-asset/hero-bg.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="rounded-l-[40px]"
        />
      </div>
    </div>
  );
}

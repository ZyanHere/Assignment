"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setAutoLocationSuccess, setLocationFailure, setLocationStart } from "@/lib/redux/location/locationSlice";

export default function Location() {
  const dispatch = useDispatch();
  const router = useRouter();
  // Function to get user location
  const handleLocationAccess = () => {
    dispatch(setLocationStart());
    
    if (!navigator.geolocation) {
      dispatch(setLocationFailure("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData = {
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          address: "Auto-detected location"
        };
        dispatch(setAutoLocationSuccess(locationData));
        router.push("/");
      },
      (error) => {
        const errorMessage = error.code === error.PERMISSION_DENIED 
          ? "Location access denied" 
          : "Error getting location";
        dispatch(setLocationFailure(errorMessage));
        if (error.code === error.PERMISSION_DENIED) {
          router.push("/manual-location");
        }
      }
    );
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col justify-center items-center max-w-[458px] mx-auto h-screen">
        {/* Location Icon */}
        <div className="w-[152px] h-[152px] bg-yellow-100 rounded-full flex items-center justify-center">
          <img
            src="/auth-asset/location-1.svg"
            alt="Location Icon"
            className="w-[71px] h-[102px]"
          />
        </div>

        {/* Location Prompt */}
        <h2 className="text-4xl font-semibold text-black mt-6">
          What is Your Location?
        </h2>
        <p className="text-[#8A8888] text-[14px] mt-6 text-center">
          We need to know your location in order to suggest nearby services
        </p>

        {/* Allow Location Button */}
        <button
          className="bg-yellow-400 font-medium w-full py-2 mt-[51px] rounded-3xl shadow-2xl hover:bg-yellow-500"
          onClick={handleLocationAccess}
        >
          Allow Location Access
        </button>

        {/* Enter Manually */}
        <p
          className="text-[#ecbe08] text-[18px] mt-[30px] cursor-pointer hover:underline"
          onClick={() => router.push("/auth/manual-location")}
        >
          Enter Location Manually
        </p>
      </div>

      {/* Right Side */}
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

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

    // navigator.geolocation.getCurrentPosition(
    //   async (position) => {
    //     const { latitude, longitude } = position.coords;

    //     try {
    //       const apiKey = 'YOUR_OPENCAGE_API_KEY'; // Replace with real key
    //       const response = await fetch(
    //         `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
    //       );

    //       const data = await response.json();
    //       const result = data.results[0];
    //       const comp = result.components;

    //       const city =
    //         comp.city || comp.town || comp.village || 'Unknown';

    //       const fullAddress =
    //         result.formatted ||
    //         `${comp.suburb || ''}, ${comp.city || comp.town || comp.village || ''}`;

    //       const locationData = {
    //         coordinates: {
    //           lat: latitude,
    //           lng: longitude,
    //         },
    //         address: fullAddress,
    //         city: city,
    //       };

    //       dispatch(setAutoLocationSuccess(locationData));
    //       router.push('/loc-info');
    //     } catch (error) {
    //       dispatch(setLocationFailure('Failed to get location details'));
    //       toast.error('Could not resolve location from coordinates');
    //     }
    //   },
    //   (error) => {
    //     const errorMessage =
    //       error.code === error.PERMISSION_DENIED
    //         ? 'Location access denied'
    //         : 'Error getting location';
    //     dispatch(setLocationFailure(errorMessage));
    //     toast.error(errorMessage);
    //     if (error.code === error.PERMISSION_DENIED) {
    //       router.push('/manual-location');
    //     }
    //   }
    // );
  };

  return (
    <div className="flex min-h-screen bg-white flex-col lg:flex-row">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col justify-center items-center max-w-[458px] mx-auto h-screen px-4 sm:px-6 lg:px-8">
        {/* Location Icon */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-[152px] lg:h-[152px] bg-yellow-100 rounded-full flex items-center justify-center">
          <Image
            src="/auth-asset/location-1.svg"
            alt="Location Icon"
            width={71}
            height={102}
            className="w-12 h-16 sm:w-16 sm:h-20 lg:w-[71px] lg:h-[102px]"
          />
        </div>

        {/* Location Prompt */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black mt-4 sm:mt-6 text-center">
          What is Your Location?
        </h2>
        <p className="text-base text-[#8A8888] mt-4 sm:mt-6 text-center max-w-sm">
          We need to know your location in order to suggest nearby services
        </p>

        {/* Allow Location Button */}
        <button
          className="bg-yellow-400 font-medium w-full py-3 sm:py-4 mt-8 sm:mt-12 lg:mt-[51px] rounded-3xl shadow-2xl hover:bg-yellow-500 transition-colors text-base"
          onClick={handleLocationAccess}
        >
          Allow Location Access
        </button>

        {/* Enter Manually */}
        <p
          className="text-[#ecbe08] text-base mt-6 sm:mt-8 lg:mt-[30px] cursor-pointer hover:underline text-center"
          onClick={() => router.push("/auth/manual-location")}
        >
          Enter Location Manually
        </p>
      </div>

      {/* Right Side */}
      <div className="hidden lg:block lg:w-1/2 xl:w-3/5 shrink-0 rounded-l-[40px] relative">
        <Image
          src="/auth-asset/hero-bg.png"
          alt="Background"
          fill
          priority
          className="rounded-l-[40px] object-cover"
        />
      </div>
    </div>
  );
}

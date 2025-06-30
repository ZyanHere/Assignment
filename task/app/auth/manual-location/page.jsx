"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function Location() {
  const [location, setLocation] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  // Function to get user location and update Redux
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Reverse geocode coordinates to get city name
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
          )
            .then((res) => res.json())
            .then((data) => {
              const city = data.city || data.locality || "Unknown Location";
              setLocation(city);
            });
        },
        () => {
          alert("Error getting location. Please enter manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Handle confirmation and Redux storage
  const handleConfirmation = () => {
    if (!location.trim()) {
      alert("Please enter or detect a location first");
      return;
    }

    dispatch(
      setManualLocation({
        address: location,
        coordinates: null,
      })
    );

    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-start items-center px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          {/* Header with Back Button */}
          <div className="flex items-center mb-6 sm:mb-8 md:mb-10">
            <button 
              onClick={() => router.back()}
              className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <img
                src="/auth-asset/back button.svg"
                alt="Back"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
              />
            </button>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-black ml-2 sm:ml-4 md:ml-6 lg:ml-8 leading-tight">
              What is Your Location?
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full mb-4 sm:mb-6">
            <div className="relative w-full">
              {/* Search Icon */}
              <img
                src="/auth-asset/search.svg"
                alt="Search"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 opacity-60"
              />

              {/* Input Field */}
              <input
                type="text"
                placeholder="Search location"
                className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 sm:py-3 text-sm sm:text-base placeholder-gray-500 placeholder-opacity-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Use My Location Button */}
          <button
            onClick={getCurrentLocation}
            className="flex items-center space-x-2 text-yellow-500 cursor-pointer mb-4 sm:mb-6 hover:text-yellow-600 transition-colors w-full"
          >
            <Image
              src="/auth-asset/back button.svg"
              alt="Location"
              width={28}
              height={28}
              className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0"
            />
            <span className="text-xs sm:text-sm md:text-base">Use my current location</span>
          </button>

          {/* Search Results */}
          <div className="w-full">
            <hr className="w-full border-gray-300 mb-2" />
            <p className="text-gray-500 text-xs sm:text-sm">Search Result</p>
          </div>

          {/* Confirmation Button */}
          <div className="w-full mt-4 sm:mt-6">
            <button
              onClick={handleConfirmation}
              className="w-full bg-yellow-400 text-white py-2 sm:py-3 rounded-lg hover:bg-yellow-500 transition-colors font-medium text-sm sm:text-base"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="hidden md:block w-1/2 shrink-0 rounded-l-[40px] relative">
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

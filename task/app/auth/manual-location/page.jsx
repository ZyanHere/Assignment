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
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`)
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
  
  dispatch(setManualLocation({
    address: location,
    coordinates: null 
  }));
  
  router.push("/");
};

  return (
    <div className="flex h-screen bg-white">
      {/* Left Side */}
      <div className="w-1/2 flex flex-col justify-top items-start mt-[180px] max-w-[537px] mx-auto h-screen">
        <div className="flex items-center mb-16">
          <button onClick={() => router.back()}>
            <img
              src="/auth-asset/back button.svg"
              alt="Location Icon"
              className="w-[41px] h-[41px]"
            />
          </button>

          <h2 className="text-4xl font-medium text-black ml-[54px] ">
            What is Your Location?
          </h2>
        </div>

        {/* Search Input */}
        <div className="relative w-full mb-[26px]">
          <div className="relative w-[380px] ml-22">
            {/* Search Icon (SVG from Public Folder) */}
            <img
              src="/auth-asset/search.svg" 
              alt="Search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-60"
            />

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search location"
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-lg placeholder-gray-500 placeholder-opacity-100"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        {/* Use My Location */}
        <button
          onClick={getCurrentLocation}
          className="flex items-center space-x-2 text-yellow-500 cursor-pointer mb-[26px] ml-22"
        >
          <img
              src="/auth-asset/location-icon.svg"
              alt="Location Icon"
              className="w-[34px] h-[34px]"
            />
          <span>Use my current location</span>
        </button>

        {/* Search Results */}
        <div className="w-[380px] ml-22">
        <hr className="w-full border-gray-300 mb-2" />
        <p className="text-gray-500">Search Result</p>
        </div>
        
      </div>

      {/* Add confirmation button below existing content */}
      <div className="w-[380px] ml-22 mt-8">
          <button
            onClick={handleConfirmation}
            className="w-full bg-yellow-400 text-white py-3 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Confirm Location
          </button>
      </div>

      {/* Right Side */}
      <div className="hidden md:block w-1/2  shrink-0 rounded-l-[40px] relative">
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

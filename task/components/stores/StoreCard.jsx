"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import useTimer from "@/lib/hooks/useTimer";

const StoreCard = ({ product, storeName }) => {
  const [added, setAdded] = useState(false);
  const initialDuration = 3 * 60 * 60 + 1 * 60 + 23; // 3h 1m 23s in seconds
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    // Set end time when component mounts
    setEndTime(Date.now() + initialDuration * 1000);
  }, []);

  const timeLeft = useTimer(endTime);

  return (
    <div className="p-7 border rounded-lg shadow-md bg-white max-w-[250px] transition-all hover:shadow-lg">
      {/* Product Image Container */}
      <div className="relative flex items-center justify-center w-full h-[192px] bg-blue-50 rounded-xl p-4 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          width={237}
          height={177}
          className="w-full h-auto object-contain"
        />

        {/* Add to Cart Button */}
        <Button
          onClick={() => setAdded(!added)}
          className={`absolute -bottom-2 right-2 w-[63px] h-[33px] border font-medium rounded-md transition-all ${
            added 
              ? "bg-green-100 border-green-400 text-green-600"
              : "bg-white border-blue-400 text-blue-500 hover:bg-blue-50"
          }`}
        >
          {added ? "✓" : "ADD"}
        </Button>
      </div>

      {/* Product Details */}
      <div className="mt-2 space-y-2">
        <p className="text-lg font-semibold truncate">{product.name}</p>
        <p className="text-sm text-gray-600">{product.category}</p>
        <p className="text-sm text-gray-600">{product.weight}</p>
        <p className="text-xs text-gray-500">By {storeName}</p>

        {/* Timer Display */}
        {endTime && !timeLeft.expired && (
          <div className="pt-2">
            <div className="text-lg text-black tracking-widest flex justify-between items-center w-full">
              <span className="bg-gray-100 px-2 py-1 rounded">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="mx-1">:</span>
              <span className="bg-gray-100 px-2 py-1 rounded">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="mx-1">:</span>
              <span className="bg-gray-100 px-2 py-1 rounded">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
            <div className="text-[10px] text-gray-500 flex justify-between mt-1">
              <span>HRS</span>
              <span>MIN</span>
              <span>SEC</span>
            </div>
          </div>
        )}

        {/* Price Section */}
        <div className="pt-2">
          <p className="text-green-600 text-sm font-semibold">
            {product.discount}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold">₹{product.price}</p>
            <p className="text-gray-500 text-sm line-through">
              ₹{product.mrp}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
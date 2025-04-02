"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const ProductCard = ({ product }) => {
  const [timeLeft, setTimeLeft] = useState(product.initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: secs.toString().padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <div className="pb-2">
      <div className="w-[180px] p-3 border border-blue-200 rounded-lg shadow-sm">
        {/* Product Image */}
        <div className="bg-blue-50 p-2 rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            width={150}
            height={100}
            className="mx-auto"
          />
        </div>

        {/* Product Details */}
        <h3 className="font-bold text-sm mt-2">{product.name}</h3>
        <p className="text-xs text-gray-500">({product.brand})</p>
        <p className="text-xs text-gray-500">{product.weight}</p>
        <p className="text-xs text-gray-500">By {product.seller}</p>

        {/* Timer */}
        <div className="flex flex-col items-center mt-2">
          {/* Time values with colons */}
          <div className="flex items-center justify-center gap-1 text-blue-700 text-sm font-medium">
            <span>{hours}</span>
            <span>:</span>
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
          </div>

          {/* Labels */}
          <div className="flex items-center justify-center gap-6 text-gray-500 text-xs mt-1">
            <span className="w-6 text-center">hours</span>
            <span className="w-6 text-center">min</span>
            <span className="w-6 text-center">sec</span>
          </div>
        </div>

        {/* Price Details */}
        <p className="text-sm text-blue-700 font-semibold mt-1">
          {product.discount}% OFF
        </p>
        <p className="text-xs text-gray-400 line-through">
          MRP: ₹{product.originalPrice}
        </p>
        <p className="text-sm font-bold">₹{product.discountedPrice}</p>

        {/* Add Button */}
        <Button
          variant="outline"
          className="w-full mt-2 text-blue-700 border-blue-200"
        >
          ADD
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

"use client";
import { useState } from "react";
import Image from "next/image";
import useTimer from "@/lib/hooks/useTimer";
import Sidebar from "@/components/home/sidebar";
import Header from "@/components/home/Header";

export default function ProductClient({ product }) {
  const [selectedWeight, setSelectedWeight] = useState(0);
  const timeLeft = product.details?.timerEnd
    ? useTimer(product.details.timerEnd)
    : null;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <Header />
        <div className="max-w-4xl mx-auto p-6">
          {/* Product Header Section */}
          <div className="flex gap-6 mb-8">
            <div className="w-1/2 bg-blue-50 rounded-xl p-4">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="object-contain w-full h-auto"
              />
            </div>

            {/* Product Details */}
            <div className="w-1/2 space-y-4">
              <h1 className="text-3xl font-bold">{product.name}</h1>

              {/* Price Section */}
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-green-600">
                  ₹{product.price}
                </span>
                <span className="text-gray-400 line-through">
                  ₹{product.mrp}
                </span>
                <span className="text-red-500 font-medium">
                  {product.discount}
                </span>
              </div>

              {/* Timer */}
              {timeLeft && !timeLeft.expired && (
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex gap-2 justify-center text-xl font-bold">
                    <span>{String(timeLeft.hours).padStart(2, "0")}</span>:
                    <span>{String(timeLeft.minutes).padStart(2, "0")}</span>:
                    <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>HOURS</span>
                    <span>MINUTES</span>
                    <span>SECONDS</span>
                  </div>
                </div>
              )}

              {/* Add to Cart Section */}
              <button className="w-full py-3 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-600 transition">
                ADD TO CART
              </button>
            </div>
          </div>

          {/* Product Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-gray-600">
              {product.details?.description || "No description available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

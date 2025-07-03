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
        <div className="flex gap-8 p-6 bg-white rounded-lg shadow-md">
          <div className="relative w-80 h-80 rounded-lg overflow-hidden bg-green-200">
            <Image
              src={product.image}
              alt={product.name}
              height={300}
              width={300}
              objectFit="cover"
              className="mt-6 ml-4"
            />
          </div>

        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-800">{product.category}</p>
          <p className="text-lg font-semibold">
            MRP: <span className="line-through">{product.mrp}</span>{' '}
            <span className="text-green-600">₹{product.price}</span>
          </p>
        </div>

        </div>
      </div>
    </div>
  );
}


 {/* Timer */}
          {/* {timeLeft && !timeLeft.expired && (
                <div className="bg-gray-100 p-2 rounded-lg">
                  <div className="flex gap-2 justify-center text-xl font-bold">
                    <span>{String(timeLeft.hours).padStart(2, "0")}</span>:
                    <span>{String(timeLeft.minutes).padStart(2, "0")}</span>:
                    <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>HOURS</span>
                    <span>MINUTES</span>
                    <span>SECONDS</span>
                  </div>
                </div>
              )} */}
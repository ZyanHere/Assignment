"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";

const CategoryCard = ({ image, name, weight, store, discount, mrp, price }) => {
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-col items-start gap-3 w-[230px] h-[390px] border rounded-2xl shadow-sm p-4">
      {/* Product Image */}
      <div className="relative flex items-center justify-center w-[194.287px] h-[192.804px] bg-blue-50 rounded-xl p-6">
        <Image
          src={image}
          alt={name}
          width={148}
          height={90}
          className="w-[148px] h-[90px] object-contain"
        />

        {/* Add Button */}
        <Button
          onClick={() => setAdded(!added)}
          className="absolute bottom-2 right-10 transform translate-y-1/2 translate-x-1/2 w-[53px] h-[33px] border border-blue-400 text-blue-400 font-medium rounded-md hover:bg-blue-100 transition bg-white shadow-md"
        >
          {added ? "✓" : "ADD"}
        </Button>

        {/* Discount Badge */}
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          {discount}
        </span>
      </div>

      {/* Product Name */}
      <h3 className="text-lg font-bold">{name}</h3>

      {/* Weight & Store Name */}
      <p className="text-black text-md">{weight}</p>
      <p className="text-black text-md">By {store}</p>

      {/* Timer */}
      <p className="text-lg text-black mt-1 tracking-widest flex justify-between  w-[150px] mx-auto">
          <span>03</span> : <span>01</span> : <span>23</span>
        </p>
        <p className="text-[10px] flex justify-between w-[150px] mx-auto tracking-wider">
          <span>hours</span> <span>minutes</span> <span>seconds</span>
        </p>

      {/* Price Section */}
      <div className="flex items-center gap-2">
        <p className="text-gray-400 line-through text-sm">{mrp}</p>
        <p className="text-lg font-bold">{price}</p>
      </div>
    </div>
  );
};

export default CategoryCard;

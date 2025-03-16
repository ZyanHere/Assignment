import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";

const StoreCard = ({ product, storeName }) => {
  const [added, setAdded] = useState(false);

  return (
    <div className="p-7 border rounded-lg shadow-md bg-white max-w-[250px]">
      <div className="relative flex items-center justify-center w-[194.287px] h-[192.804px] bg-blue-50 rounded-xl p-6">
        <Image
          src={product.image}
          alt={product.name}
          width={237}
          height={177}
          className="w-full h-24 object-contain"
        />

        <Button
          onClick={() => setAdded(!added)}
          className="absolute bottom-2 right-10 transform translate-y-1/2 translate-x-1/2 w-[63px] h-[33px] border border-blue-400 text-blue-400 font-medium rounded-md hover:bg-blue-100 transition bg-white shadow-md"
        >
          {added ? "✓" : "ADD"}
        </Button>
      </div>

      {/* Product Details */}
      <div className="mt-2">
        <p className="text-lg font-semibold">{product.name}</p>
        <p>{product.category}</p>
        <p>{product.weight}</p>
        <p className="text-gray-500 text-sm">By {storeName}</p>

        {/* Timer */}
        <p className="text-lg text-black mt-1 tracking-widest flex justify-between  w-[150px] mx-auto">
          <span>03</span> : <span>01</span> : <span>23</span>
        </p>
        <p className="text-[10px] flex justify-between w-[150px] mx-auto tracking-wider">
          <span>hours</span> <span>minutes</span> <span>seconds</span>
        </p>

        {/* Discount & Price */}
        <p className="text-green-500 text-sm font-semibold mt-2">{product.discount}</p>
        <p className="text-gray-500 text-xs line-through">MRP: ₹{product.mrp}</p>
        <p className="text-lg font-bold">₹{product.price}</p>
      </div>
    </div>
  );
};

export default StoreCard;

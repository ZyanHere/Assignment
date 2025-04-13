"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useCart } from "@/lib/contexts/cart-context"; 

const ProCard = ({ id, imageSrc, name, price, stockStatus }) => {
  const { addToCart, cart } = useCart();

  // Check if item is already in cart
  const isInCart = cart.some(item => item.id === id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart({
        id,
        name,
        price,
        image: imageSrc,
      });
    }
  };

  return (
    <div className="flex flex-col items-left justify-left gap-3 w-[230px] h-[388px] border rounded-2xl shadow-sm p-4">
      <div className="relative flex items-center justify-center w-full h-[192px] bg-blue-50 rounded-xl p-6">
        <Image
          src={imageSrc}
          alt={name}
          width={148}
          height={90}
          className="w-[148px] h-[90px] object-contain"
        />

        <Button
          onClick={handleAddToCart}
          className={`absolute bottom-2 right-10 transform translate-y-1/2 translate-x-1/2 w-[53px] h-[33px] border font-medium rounded-md hover:bg-blue-100 transition shadow-md
            ${isInCart ? "bg-green-50 text-green-500 border-green-400" : "bg-white text-blue-400 border-blue-400"}`}
          aria-label={isInCart ? "Added to cart" : "Add to cart"}
        >
          {isInCart ? "✓" : "ADD"}
        </Button>
      </div>

      <p className={`text-sm ${
        stockStatus?.toLowerCase().includes("few") ? "text-red-500" :
        stockStatus?.toLowerCase().includes("fresh") ? "text-green-500" : "text-orange-500"
      }`}>
        {stockStatus || "Unavailable"}
      </p>

      <div className="w-full">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-600 text-sm">(100% Natural & Farm Fresh)</p>
      </div>

      <div className="flex text-yellow-500 text-lg">
        ★★★★☆
      </div>

      <p className="text-lg font-bold">Rs {price}</p>
    </div>
  );
};

export default ProCard;

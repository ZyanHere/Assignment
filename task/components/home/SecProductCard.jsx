"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useCart } from "@/lib/contexts/cart-context";

const ProCard = ({
  id,
  imageSrc = "/placeholder.png",
  name = "Unnamed Product",
  price = "N/A",
  stockStatus = "Unavailable",
}) => {
  const { addToCart, cart } = useCart();

  // Check if item is already in cart
  const isInCart = id ? cart.some((item) => item.id === id) : false;

  const handleAddToCart = () => {
    if (!isInCart && id) {
      addToCart({
        id,
        name,
        price,
        image: imageSrc,
      });
    }
  };

  const getStockColor = () => {
    const lower = stockStatus.toLowerCase();
    if (lower.includes("few")) return "text-red-500";
    if (lower.includes("fresh")) return "text-green-500";
    return "text-orange-500";
  };

  return (
    <div
      className="flex flex-col items-left justify-left gap-3 w-[230px] h-[388px] border rounded-2xl shadow-sm p-4"
      role="group"
      aria-label={`Product card for ${name}`}
    >
      <div className="relative flex items-center justify-center w-full h-[192px] bg-blue-50 rounded-xl p-6">
        <Image
          src={imageSrc}
          alt={name || "Product image"}
          width={148}
          height={90}
          className="w-[148px] h-[90px] object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/fallback.png";
          }}
        />

        <Button
          onClick={handleAddToCart}
          disabled={!id}
          className={`absolute bottom-2 right-10 transform translate-y-1/2 translate-x-1/2 w-[53px] h-[33px] border font-medium rounded-md hover:bg-blue-100 transition shadow-md
            ${isInCart ? "bg-green-50 text-green-500 border-green-400" : "bg-white text-blue-400 border-blue-400"}`}
          aria-label={isInCart ? "Item added to cart" : "Add item to cart"}
        >
          {isInCart ? "✓" : "ADD"}
        </Button>
      </div>

      <p className={`text-sm ${getStockColor()}`}>
        {stockStatus}
      </p>

      <div className="w-full">
        <h3 className="text-lg font-bold truncate">{name}</h3>
        <p className="text-gray-600 text-sm">(100% Natural & Farm Fresh)</p>
      </div>

      <div className="flex text-yellow-500 text-lg" aria-label="Product rating">
        ★★★★☆
      </div>

      <p className="text-lg font-bold">
        {price !== "N/A" ? `Rs ${price}` : "Price unavailable"}
      </p>
    </div>
  );
};

export default ProCard;

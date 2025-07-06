// components/StoreCard.jsx
"use client";
import { useCart } from "@/lib/contexts/cart-context";
import useTimer from "@/lib/hooks/useTimer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const StoreCard = ({ product, storeName }) => {
  const [endTime, setEndTime] = useState(null);
  const { addToCart, cart } = useCart();
  const timeLeft = useTimer(endTime);

  useEffect(() => {
    setEndTime(Date.now() + (3 * 60 * 60 + 1 * 60 + 23) * 1000);
  }, []);

  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isInCart) {
      addToCart({
        id: product.id,
        name: product.name,
        brand: storeName,
        price: product.price,
        mrp: product.mrp,
        image: product.image,
        category: product.category,
      });
    }
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="block hover:shadow-lg transition-all"
    >
      <div className="p-7 border rounded-lg shadow-md bg-white w-full h-full cursor-pointer">

        <div className="relative h-[192px] bg-blue-50 rounded-xl p-4 mb-4 w-full">

          <Image
            src={product.image}
            alt={product.name}
            fill
            className="cursor-pointer object-contain rounded-lg"
          />
          <Button
            onClick={handleAddToCart}
            className={`absolute bottom-2 right-2 w-[40px] h-[23px] border font-medium rounded-md ${
              isInCart
                ? "bg-green-100 border-green-400 text-green-600"
                : "bg-white border-blue-400 text-blue-500 hover:bg-blue-50"
            }`}
          >
            {isInCart ? "✓" : "ADD"}
          </Button>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold truncate">{product.name}</p>
          <p className="text-sm text-gray-600">{product.category}</p>
          <p className="text-xs text-gray-500">By {storeName}</p>
          {timeLeft && !timeLeft.expired && (
            <div className="pt-2 flex justify-between text-lg font-bold">
              <span>{String(timeLeft.hours).padStart(2, "0")}</span>
              <span>:</span>
              <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
              <span>:</span>
              <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
            </div>
          )}
          <div className="pt-2 flex items-center gap-2">
            <p className="text-lg font-bold">₹{product.price}</p>
            <p className="text-gray-500 text-sm line-through">
              ₹{product.mrp}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;


"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import useTimer from "@/lib/hooks/useTimer";
import { useCart } from "@/lib/contexts/cart-context";

const CategoryCard = ({ image, name, weight, store, discount, mrp, price, time, id }) => {
  const timeLeft = useTimer(time);
  const { addToCart, cart } = useCart();

  // Check if this specific product is already in the cart by its unique ID
  const isInCart = cart.some(item => item.id === id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart({
        id,
        name,
        brand: store,
        price,
        mrp,
        image,
        weight
      });
    }
  };

  return (
    <div className="flex flex-col items-start gap-3 w-[230px] h-[390px] border rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="relative flex items-center justify-center w-[194.287px] h-[192.804px] bg-blue-50 rounded-xl p-6">
        <Image
          src={image}
          alt={name}
          width={148}
          height={90}
          className="w-[148px] h-[90px] object-contain"
        />

        <Button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-10 transform translate-y-1/2 translate-x-1/2 w-[53px] h-[33px] border border-blue-400 text-blue-400 font-medium rounded-md hover:bg-blue-100 transition bg-white shadow-md"
        >
          {isInCart ? "✓" : "ADD"}
        </Button>

        {discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            {discount}% OFF
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-black text-md">{weight}</p>
      <p className="text-black text-md">By {store}</p>

      {/* Timer Section */}
      <div className="mt-2 w-full">
        {timeLeft.expired ? (
          <div className="text-center text-red-500 text-sm font-medium">
            Offer Expired
          </div>
        ) : (
          <div className="flex justify-center gap-3 text-sm bg-gray-100 p-2 rounded">
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-xs text-gray-500">hours</span>
            </div>
            <span className="text-lg">:</span>
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-xs text-gray-500">minutes</span>
            </div>
            <span className="text-lg">:</span>
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-xs text-gray-500">seconds</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <p className="text-gray-400 line-through text-md">₹{mrp}</p>
        <p className="text-lg font-bold">₹{price}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import useTimer from "@/lib/hooks/useTimer";
import { useCart } from "@/lib/contexts/cart-context";

const ProductCard = ({ product }) => {
  const timeLeft = useTimer(product.time);
  const { addToCart, cart } = useCart();

  // Check if this specific product is already in the cart by its unique ID
  const isInCart = cart.some(item => item.id === product.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart({
        id: product.id,
        name: product.name,
        brand: product.brand,
        seller: product.seller,
        price: product.discountedPrice,
        mrp: product.originalPrice,
        image: product.image,
        weight: product.weight
      });
    }
  };

  return (
    <div className="pb-2 group">
      <div className="w-full p-3 border rounded-xl  hover:shadow-lg transition-all duration-300 bg-white shadow-sm border-b border-yellow-500">
        <div className="relative bg-blue-50 p-2 rounded-xl h-[120px] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain transition-transform group-hover:scale-105"
          />
        </div>

        <h3 className="font-bold text-sm mt-2 line-clamp-1">{product.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-1">({product.brand})</p>
        <p className="text-xs text-gray-500">{product.weight}</p>
        <p className="text-xs text-gray-500 line-clamp-1">
          By {product.seller}
        </p>

        <div className="mt-2">
          {timeLeft.expired ? (
            <div className="text-center text-red-500 text-xs font-medium py-2">
              Offer Expired
            </div>
          ) : (
            <div className="flex flex-col items-center bg-gray-100 rounded p-1">
              <div className="flex items-center justify-center gap-1 text-blue-700 text-sm font-medium">
                <span>{String(timeLeft.hours).padStart(2, "0")}</span>
                <span>:</span>
                <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span>:</span>
                <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-gray-500 text-[10px] mt-1">
                <span className="w-6 text-center">hours</span>
                <span className="w-6 text-center">min</span>
                <span className="w-6 text-center">sec</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-2">
          <p className="text-sm text-blue-700 font-semibold">
            {product.discount}% OFF
          </p>
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-400 line-through">
              ₹{product.originalPrice}
            </p>
            <p className="text-sm font-bold text-green-600">
              ₹{product.discountedPrice}
            </p>
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          variant="outline"
          className={`w-full mt-3 font-bold tracking-wide border-blue-200 ${
            isInCart ? "text-green-500" : "text-yellow-600"
          }`}
        >
          {isInCart ? "✓ Added" : "ADD TO CART"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
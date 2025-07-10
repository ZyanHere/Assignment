"use client";
import { useCart } from "@/lib/contexts/cart-context";
import useTimer from "@/lib/hooks/useTimer";
import Image from "next/image";
import { Button } from "../ui/button";

const ProductCard = ({ product }) => {
  const timeLeft = useTimer(product.time);
  const { addToCart, cart } = useCart();

  // Check if this specific product is already in the cart by its unique ID
  const isInCart = cart.some((item) => item.id === product.id);

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
        weight: product.weight || "1 unit",
      });
    }
  };

  return (
    <div className="pb-2 group">
      <div className="w-full p-3 border rounded-xl hover:shadow-lg transition-all duration-300 bg-white shadow-sm">
        <div className="relative flex items-center justify-center w-full h-[142px] bg-blue-50 rounded-xl p-6">
          <Image
            src={product.image}
            alt={product.name || "Product image"}
            width={158}
            height={100}
            className="w-[148px] h-[90px] object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback.png";
            }}
          />

          <Button
            onClick={handleAddToCart}
            disabled={!product.id}
            className={`absolute bottom-2 right-10 transform translate-y-1/2 translate-x-1/2 w-[53px] h-[33px] border font-medium rounded-md hover:bg-blue-100 transition shadow-md
              ${
                isInCart
                  ? "bg-green-50 text-green-500 border-green-400"
                  : "bg-white text-blue-400 border-blue-400"
              }`}
            aria-label={isInCart ? "Item added to cart" : "Add item to cart"}
          >
            {isInCart ? "✓" : "ADD"}
          </Button>
        </div>

        <h3 className="font-bold text-sm mt-2 line-clamp-1">{product.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-1">({product.brand})</p>
        <p className="text-xs text-gray-500">{product.weight || "1 unit"}</p>
        <p className="text-xs text-gray-500 line-clamp-1">
          By {product.seller}
        </p>

        

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
      </div>
    </div>
  );
};

export default ProductCard;

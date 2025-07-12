"use client";
import { useCart } from "@/lib/contexts/cart-context";
import useTimer from "@/lib/hooks/useTimer";
import Image from "next/image";
import { Button } from "../ui/button";
import { useProduct } from "@/lib/contexts/productContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const timeLeft = useTimer(product.time);
  const { addToCart, cart = [] } = useCart();
  const { setSelectedProduct, setSelectedVariant } = useProduct();
  const router = useRouter();
  // Check if this specific product is already in the cart by its unique ID
  const isInCart = cart.some((item) => item.id === product.variants[0]?._id);
  console.log(isInCart);
  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart({
        id: product.variants[0]._id,
        variant: product.variants,
        product,
        price: product.variants[0].price.base_price,
        sale_price: product.variants[0].price.sale_price,
        stock: product.variants[0].stock.quantity,
        sku: product.variants[0].sku,
      });
      toast.success('Added to Cart successfully');
    }
  };

  const handleItemClick = () => {
    setSelectedProduct(product);
    setSelectedVariant(product.variants[0])
    router.push(`/product/${product.id}`);
  }

  const canAdd = product?.variants && product.variants?.length > 0

  // handle add to wishlist
  const [favorites, setFavorites] = useState({});

  const handleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  return (
    <div className="pb-2 group" onClick={handleItemClick}>
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
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart()
            }}
            disabled={!product.id}
            className={`absolute bottom-2 right-10 transform translate-y-1/2 translate-x-1/2 px-3 py-1.5 border font-medium rounded-md hover:bg-blue-100 transition shadow-md
              ${isInCart
                ? "bg-green-50 text-green-500 border-green-400"
                : "bg-white text-blue-400 border-blue-400"
              }`}
            aria-label={isInCart ? "Item added to cart" : "Add item to cart"}
          >
            {!canAdd ? "Out of stock" : isInCart ? "Added" : "ADD"}
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleFavorite(product.id);
            }}
            className="absolute -top-1 -right-2 p-1 rounded-full bg-white/20 hover:bg-gray-100 shadow"
            aria-label="Add to wishlist"
          >
            <Heart className={`w-5 h-5 ${favorites[product.id] ? "fill-red-500" : "text-gray-500"
              }`} />
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

"use client";
import React, { useMemo } from "react";
import { useCart } from "@/lib/contexts/cart-context";
import useTimer from "@/lib/hooks/useTimer";
import Image from "next/image";
import { Button } from "../ui/button";
import { useProduct } from "@/lib/contexts/productContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProductCard = React.memo(({ product }) => {
  const timeLeft = useTimer(product.time);
  const { addToCart, isInCart, getItemQuantity, isProductLoading: isCartLoading } = useCart();
  const { setSelectedProduct, setSelectedVariant } = useProduct();
  const router = useRouter();
  
  // Memoize cart-related values to prevent unnecessary re-renders
  const variantId = product.variants[0]?._id;
  const cartItemQuantity = useMemo(() => getItemQuantity(variantId), [getItemQuantity, variantId]);
  const isProductInCart = useMemo(() => isInCart(variantId), [isInCart, variantId]);
  const isLoading = useMemo(() => isCartLoading(variantId), [isCartLoading, variantId]);

  const handleAddToCart = async () => {
    if (!isProductInCart && product.variants?.[0]) {
      try {
        await addToCart({
          id: product.variants[0]._id,
          variant: product.variants,
          product,
          price: product.variants[0].price.base_price,
          sale_price: product.variants[0].price.sale_price,
          stock: product.variants[0].stock.quantity,
          sku: product.variants[0].sku,
        });
        toast.success('Added to Cart successfully');
      } catch (error) {
        toast.error(error.message || 'Failed to add to cart');
      }
    } else if (isProductInCart) {
      toast.info('Item already in cart');
    }
  };

  const handleItemClick = () => {
    setSelectedProduct(product);
    setSelectedVariant(product.variants[0])
    router.push(`/product/${product._id || product.id}`);
  }

  const canAdd = product?.variants && product.variants?.length > 0 && product.variants[0]?.stock?.quantity > 0;

  // Memoize button text to prevent unnecessary re-renders
  const buttonText = useMemo(() => {
    if (!canAdd) return "Out of stock";
    if (isLoading) return "Adding...";
    if (isProductInCart) return `Added (${cartItemQuantity})`;
    return "ADD";
  }, [canAdd, isLoading, isProductInCart, cartItemQuantity]);

  // Memoize button className to prevent unnecessary re-renders
  const buttonClassName = useMemo(() => {
    const baseClass = "absolute bottom-2 right-10 transform translate-y-1/2 translate-x-1/2 px-3 py-1.5 border font-medium rounded-md hover:bg-blue-100 transition shadow-md";
    return `${baseClass} ${
      isProductInCart
        ? "bg-green-50 text-green-500 border-green-400"
        : "bg-white text-blue-400 border-blue-400"
    }`;
  }, [isProductInCart]);

  return (
    <div className="pb-2 group" onClick={handleItemClick}>
      <div className="w-full p-2 border rounded-xl hover:shadow-lg transition-all duration-300 bg-white shadow-sm ">
        <div className="relative flex items-center justify-center w-full h-[142px] bg-blue-50 rounded-xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.name || "Product image"}
            width={300}
            height={200}
            className="w-full h-full object-cover"
            quality={90}
            priority={false}
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
            disabled={!canAdd || isLoading}
            className={buttonClassName}
            aria-label={isProductInCart ? "Item added to cart" : "Add item to cart"}
          >
            {buttonText}
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
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;

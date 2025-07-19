"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "../home/ui2/button";
import { useCart } from "@/lib/contexts/cart-context";
import { useRouter } from "next/navigation";
import { useProduct } from "@/lib/contexts/productContext";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/hooks/useAuth";

const StoreCard = React.memo(({ product, storeName }) => {
  const { addToCart, isInCart, getItemQuantity, isProductLoading } = useCart();
  const { setSelectedProduct } = useProduct();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => setImageError(true);

  const handleItemClick = () => {
    setSelectedProduct(product);
    router.push(`/product/${product._id || product.id}`);
  };

  const imgSrc = !imageError && product.image
    ? product.image
    : "/placeholder-image.jpg";

  const price = product.price ?? 0;
  const original = product.mrp ?? 0;

  const discount = original > price
    ? Math.round(((original - price) / original) * 100)
    : 0;

  const stockQty = product.stock ?? null;
  const canAdd = stockQty == null || stockQty > 0;

  const isProductInCart = useMemo(() => isInCart(product.id), [isInCart, product.id]);
  const cartItemQuantity = useMemo(() => getItemQuantity(product.id), [getItemQuantity, product.id]);
  const isLoading = useMemo(() => isProductLoading(product.id), [isProductLoading, product.id]);

  const buttonText = useMemo(() => {
    if (isLoading) return "...";
    if (isProductInCart) return `${cartItemQuantity}`;
    if (canAdd) return "ADD";
    return "OUT";
  }, [isLoading, isProductInCart, cartItemQuantity, canAdd]);

  const buttonClassName = useMemo(() => {
    const base = "absolute -bottom-2 right-4 text-xs w-[53px] h-[33px] font-medium rounded-md border transition shadow-md";
    if (isProductInCart) {
      return `${base} bg-green-50 text-green-500 border-green-400`;
    } else if (canAdd) {
      return `${base} bg-white text-blue-400 border-blue-400 hover:bg-blue-100`;
    } else {
      return `${base} bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed`;
    }
  }, [isProductInCart, canAdd]);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Login to add products');
      router.push('/auth/login');
      return;
    }
    if (!canAdd || isProductInCart) return;

    try {
      await addToCart({
        id: product.id,
        name: product.name,
        brand: storeName,
        price,
        mrp: original,
        image: product.image,
        category: product.category,
      });
      toast.success("Added to Cart successfully");
    } catch (error) {
      toast.error(error.message || "Failed to add to cart");
    }
  };

  return (
    <Card
  className="w-full max-w-sm min-h-[420px] flex flex-col justify-between rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
  onClick={handleItemClick}
>
  {/* Image Section */}
  <CardHeader className=" relative">
    <img
      src={imgSrc}
      alt={product.name}
      onError={handleImageError}
      className="w-full h-48 object-contain rounded-xl"
    />
    <Button
      className={buttonClassName + " flex items-center justify-center text-base leading-none font-mono"}
      onClick={handleAddToCart}
      disabled={!canAdd || isLoading}
    >
      <span className="block w-full text-center">{buttonText}</span>
    </Button>
  </CardHeader>

  {/* Content Section with reserved space */}
  <CardContent className="px-4 flex flex-col gap-1 flex-grow min-h-[120px] justify-between">
    <CardTitle className="text-sm font-bold truncate">{product.name}</CardTitle>
    {/* Category */}
    {product.category ? (
      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded w-fit">{product.category}</span>
    ) : <div className="h-5 text-xs text-gray-400 flex items-center">No category</div>}
    <p className="text-xs text-gray-500">By {storeName}</p>
    {/* Discount */}
    {discount > 0 ? (
      <p className="text-sm text-blue-700 font-semibold">{discount}% OFF</p>
    ) : <div className="h-5 text-xs text-gray-400 flex items-center">20%</div>}
    {/* Price */}
    <div className="flex items-center gap-2 min-h-[24px]">
      {original > price ? (
        <p className="text-xs text-gray-400 line-through">₹{original}</p>
      ) : <div className="w-10 text-xs text-gray-400 flex items-center">30</div>}
      <p className="text-sm font-bold text-green-600">{price ? `₹${price}` : <span className="text-xs text-gray-400">No price</span>}</p>
    </div>
    {/* Rating */}
    <div className="flex items-center gap-2 min-h-[20px]">
      <Star className="text-yellow-300 fill-yellow-300" height={16} width={16} />
      <p className="text-xs font-medium text-gray-500">{product.rating?.average || 0} ({product.rating?.count || 0})</p>
    </div>
    {/* Stock (with fallback space) */}
    {stockQty != null ? (
      <p className="mt-1 text-xs text-muted-foreground">Stock: {stockQty > 0 ? `${stockQty} available` : "Out of Stock"}</p>
    ) : <div className="mt-1 h-[16px] text-xs text-gray-400 flex items-center">No stock info</div>}
  </CardContent>
</Card>

  );
});

StoreCard.displayName = "StoreCard";

export default StoreCard;

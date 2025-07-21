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
import Image from "next/image";

const StoreCard = React.memo(({ product, storeName }) => {
  const { addToCart, isInCart, getItemQuantity, isProductLoading } = useCart();
  const { setSelectedProduct, setSelectedVariant } = useProduct();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  console.log(product);
  const variantData = product?.variants[0];

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => setImageError(true);

  const handleItemClick = () => {
    setSelectedProduct(product);
    setSelectedVariant(variantData);
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
  const canAdd = variantData && (stockQty == null || stockQty > 0);

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
        id: variantData._id,
        variant: variantData,
        product,
        price: original,
        sale_price: price,
        stock: stockQty,
        sku: variantData.sku,
      });
      toast.success("Added to Cart successfully");
    } catch (error) {
      toast.error(error.message || "Failed to add to cart");
    }
  };

  return (
    <Card
      className="w-[240px] rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleItemClick}
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
    ) : <span className="bg-gray-100 text-gray-400 text-xs font-medium px-2 py-1 rounded w-fit">No category</span>}
    <p className="text-xs text-gray-500">By {storeName || <span className='text-gray-400'>Unknown Store</span>}</p>
    {/* Discount */}
    {discount > 0 ? (
      <p className="text-sm text-blue-700 font-semibold">{discount}% OFF</p>
    ) : <span className="bg-gray-100 text-gray-400 text-xs font-medium px-2 py-1 rounded w-fit">No discount</span>}
    {/* Price */}
    <div className="flex items-center gap-2 min-h-[24px]">
      {original > price ? (
        <p className="text-xs text-gray-400 line-through">₹{original}</p>
      ) : <span className="text-xs text-gray-400 line-through">₹100</span>}
      <p className="text-sm font-bold text-green-600">₹{price || 100}</p>
    </div>
    {/* Rating */}
    <div className="flex items-center gap-2 min-h-[20px]">
      <Star className="text-yellow-300 fill-yellow-300" height={16} width={16} />
      <p className="text-xs font-medium text-gray-500">{product.rating?.average || 0} ({product.rating?.count || 0})</p>
    </div>
    {/* Stock (with fallback space) */}
    {stockQty != null ? (
      <p className="mt-1 text-xs text-muted-foreground">Stock: {stockQty > 0 ? `${stockQty} available` : <span className='text-red-500 font-semibold'>No stock</span>}</p>
    ) : <span className="mt-1 text-xs text-red-500 font-semibold">No stock</span>}
  </CardContent>
</Card>


  );
});

StoreCard.displayName = "StoreCard";

export default StoreCard;

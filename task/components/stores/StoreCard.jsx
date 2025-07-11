"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { Button } from "../home/ui2/button";
import { useCart } from "@/lib/contexts/cart-context";
import { useRouter } from "next/navigation";
import { useProduct } from "@/lib/contexts/productContext";
import { useState } from "react";

export default function StoreCard({ product, storeName }) {
  const { addToCart, cart } = useCart();
  const router = useRouter();
  const { setSelectedProduct } = useProduct();
  const [imageError, setImageError] = useState(false);

  // Navigate into product detail
  const handleItemClick = () => {
    setSelectedProduct(product);
    router.push(`/product/${product.id}`);
  };

  // Pricing & discount
  const price    = product.price  ?? 0;
  const original = product.mrp    ?? 0;
  const discount = original > price
    ? Math.round((original - price) / original * 100)
    : 0;

  // Stock & cart
  const stockQty = product.stock ?? null;
  const isInCart = cart.some((item) => item.id === product.id);
  const canAdd   = stockQty == null || stockQty > 0;

  // Image fallback
  const imgSrc   = !imageError && product.image
    ? product.image
    : "/placeholder-image.jpg";

  const handleImgError = () => setImageError(true);

  // Button text
  let btnText = "ADD";
  if (!canAdd) btnText = "OUT OF STOCK";
  else if (isInCart) btnText = "✓";

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!canAdd || isInCart) return;
    addToCart({
      id:       product.id,
      name:     product.name,
      brand:    storeName,
      price,
      mrp:      original,
      image:    product.image,
      category: product.category
    });
  };

  return (
    <Card
      className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
      onClick={handleItemClick}
    >
      <CardHeader className="p-4 relative">
        <img
          src={imgSrc}
          alt={product.name}
          onError={handleImgError}
          className="w-full h-48 object-contain rounded-xl"
        />
        <Button
          className="absolute -bottom-12 right-2 text-xs"
          onClick={handleAddToCart}
          disabled={!canAdd}
        >
          {btnText}
        </Button>
      </CardHeader>

      <CardContent className="space-y-2 px-4 pb-4">
        <CardTitle className="text-lg font-bold truncate">
          {product.name}
        </CardTitle>

        {/* Category & Rating */}
        <div className=" items-center gap-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
            {product.category}
          </span>
          <div className="flex items-center mt-2">
            <Star className="text-yellow-300 fill-current" size={16} />
            <span className="text-sm text-gray-600 ml-1">
              {product.rating?.average ?? 0} ({product.rating?.count ?? 0})
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">By {storeName}</p>

        {/* Pricing & Discount */}
        <div className="mt-2 flex items-baseline gap-2">
          {original > price && (
            <p className="text-sm text-muted-foreground line-through">
              ₹{original}
            </p>
          )}
          <p className="text-lg font-semibold">₹{price}</p>
          {discount > 0 && (
            <span className="text-sm text-red-600 font-bold">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Stock */}
        {stockQty != null && (
          <p className="mt-2 text-xs text-muted-foreground">
            Stock: {stockQty > 0 ? `${stockQty} available` : "Out of Stock"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

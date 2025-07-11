"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "../home/ui2/button";
import { useCart } from "@/lib/contexts/cart-context";
import { useRouter } from "next/navigation";
import { useProduct } from "@/lib/contexts/productContext";

export default function ProductCard({ product }) {
  const { addToCart, cart } = useCart();
  const router = useRouter();
  const { setSelectedProduct, setSelectedVariant } = useProduct();
  const [imageError, setImageError] = useState(false);

  const handleItemClick = () => {
    setSelectedProduct(product);
    setSelectedVariant(product.variants[0]);
    router.push(`/product/${product.id}`);
  };

  const getVariantData = () => {
    const variant = product?.variants?.[0];
    if (!variant) return null;

    const price = variant?.price?.base_price || variant.base_price || 100;
    const sale_price = variant?.price?.sale_price || variant.sale_price || 0;

    return {
      variant,
      price,
      sale_price,
      stock: variant.stock?.quantity || variant.available_quantity || 0,
      sku: variant.sku || "N/A",
    };
  };

  const getImageUrl = () => {
    if (!product.images || product.images.length === 0 || imageError) {
      return "/placeholder-image.jpg";
    }
    const primaryImage = product.images.find((img) => img.is_primary) || product.images[0];
    return primaryImage?.url || "/placeholder-image.jpg";
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const data = getVariantData();

    if (data?.variant) {
      addToCart({
        id: data.variant._id,
        variant: data.variant,
        product,
        price: data.price,
        sale_price: data.sale_price,
        stock: data.stock,
        sku: data.sku,
      });
    } else {
      console.warn("No variant available for this product");
    }
  };

  const imageUrl = getImageUrl();
  const variantData = getVariantData();

  const displayPrice =
    variantData?.sale_price > 0 ? variantData.sale_price : variantData?.price || 100;
  const originalPrice = variantData?.sale_price > 0 ? variantData.price : null;
  const canAddToCart = variantData?.variant && variantData.stock > 0;

  // Discount Percentage
  const discount = originalPrice
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
    : 0;

  return (
    <Card
      className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleItemClick}
    >
      <CardHeader className="p-3">
        <div className="relative flex items-center justify-center w-full h-[142px] bg-blue-50 rounded-xl p-4">
          <img
            src={imageUrl}
            alt={product.name}
            onError={handleImageError}
            className="w-[148px] h-[90px] object-contain"
          />
          <Button
            className={`absolute bottom-2 right-4 text-xs w-[53px] h-[33px] font-medium rounded-md border transition shadow-md
              ${
                canAddToCart
                  ? "bg-white text-blue-400 border-blue-400 hover:bg-blue-100"
                  : "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
              }`}
            onClick={handleAddToCart}
            disabled={!canAddToCart}
            aria-label={canAddToCart ? "Add to cart" : "Out of stock"}
          >
            {canAddToCart ? "ADD" : "OUT"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 space-y-2">
        <CardTitle className="text-sm font-bold line-clamp-1">
          {variantData?.variant?.variant_name || product.name}
        </CardTitle>
        <p className="text-xs text-gray-500 line-clamp-1">({product.brand})</p>
        <p className="text-xs text-gray-500">
          By {product.vendor_store_id?.store_name || "Last Minute Deal"}
        </p>

        {discount > 0 && (
          <p className="text-sm text-blue-700 font-semibold">{discount}% OFF</p>
        )}

        <div className="flex items-center gap-2">
          {originalPrice && (
            <p className="text-xs text-gray-400 line-through">₹{originalPrice}</p>
          )}
          <p className="text-sm font-bold text-green-600">₹{displayPrice}</p>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <Star className="text-yellow-300 fill-yellow-300" height={16} width={16} />
          <p className="text-xs font-medium text-gray-500">
            {product.rating?.average || 0} ({product.rating?.count || 0})
          </p>
        </div>

        <p className="text-xs text-gray-400">
          Stock: {variantData?.stock > 0 ? `${variantData.stock} available` : "Out of Stock"}
        </p>
      </CardContent>
    </Card>
  );
}

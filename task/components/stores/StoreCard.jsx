"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // use common button
import { Heart, Star } from "lucide-react";
import { useCart } from "@/lib/contexts/cart-context";
import { useProduct } from "@/lib/contexts/productContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useWishlist } from "@/lib/hooks/useWishlist";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const StoreCard = ({
  product,
  storeName,
  showBrand = true,
  showSeller = true,
  showWishlist = true,
  showRating = true,
}) => {
  const router = useRouter();
  const { setSelectedProduct, setSelectedVariant } = useProduct();
  const { isAuthenticated } = useAuth();
  const { addToCart, isInCart, getItemQuantity, isProductLoading } = useCart();
  const { data: session } = useSession();
  const { addItem, removeItem, isInWishlist } = useWishlist();

  const [imageError, setImageError] = useState(false);
  const variantData = product?.variants?.[0];
  const productId = product?._id || product?.id;

  const imgSrc =
    !imageError && product?.image ? product.image : "/placeholder-image.jpg";
  const price = variantData?.price?.sale_price ?? product.price ?? 0;
  const original = variantData?.price?.base_price ?? product.mrp ?? 0;
  const discount =
    original > price ? Math.round(((original - price) / original) * 100) : 0;
  const stockQty = variantData?.stock?.quantity ?? product.stock ?? null;
  const canAdd = variantData && (stockQty == null || stockQty > 0);

  const itemKey = variantData?._id || productId;
  const isProductInCart = useMemo(() => isInCart(itemKey), [isInCart, itemKey]);
  const cartItemQuantity = useMemo(
    () => getItemQuantity(itemKey),
    [getItemQuantity, itemKey]
  );
  const isLoading = useMemo(
    () => isProductLoading(itemKey),
    [isProductLoading, itemKey]
  );
  const inWishlist = useMemo(
    () => isInWishlist(productId),
    [isInWishlist, productId]
  );

  // Add to cart
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Login to add products");
      router.push("/auth/login");
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

  // Wishlist toggle
  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    if (!session?.user?.token) {
      toast.error("Please login to save items to wishlist");
      return;
    }
    try {
      if (isInWishlist(productId)) {
        await removeItem(productId);
        toast.success("Removed from wishlist");
      } else {
        await addItem(productId);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update wishlist");
    }
  };

  // Navigate
  const handleItemClick = () => {
    setSelectedProduct(product);
    setSelectedVariant(variantData);
    router.push(`/product/${product._id || product.id}`);
  };

  const buttonText = useMemo(() => {
    if (!canAdd) return "Out of stock";
    if (isLoading) return "Adding...";
    if (isProductInCart) return `✓`;
    return "ADD";
  }, [canAdd, isLoading, isProductInCart, cartItemQuantity]);

  const buttonClassName = useMemo(() => {
    return `absolute bottom-2 right-10 -mr-3 transform translate-y-1/2 translate-x-1/2 w-[53px] h-[33px] border font-medium rounded-md transition shadow-md ${
      isProductInCart
        ? "bg-green-50 text-green-500 border-green-400"
        : "bg-white text-blue-400 border-blue-400 hover:bg-blue-100"
    }`;
  }, [isProductInCart]);

  return (
    <div className="pb-2 group" onClick={handleItemClick}>
      <div className="w-full p-2 border rounded-xl hover:shadow-lg transition-all duration-300 bg-white shadow-sm flex flex-col justify-between min-h-[320px]">
        {/* Image & Wishlist */}
        <div className="relative w-full flex flex-col items-center"> 
          <div className="relative flex items-center justify-center w-full h-[142px] bg-blue-50 rounded-xl overflow-hidden">
            {/* Wishlist Heart Button */}
            {showWishlist && (
              <button
                onClick={handleWishlistToggle}
                className={`absolute top-2 right-2 z-10 p-1 rounded-full shadow-md transition ${
                  inWishlist
                    ? "bg-white/60 text-red-500"
                    : "bg-white/60 text-gray-600 hover:text-red-500"
                }`}
                aria-label={
                  inWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <Heart
                  className="w-5 h-5"
                  fill={inWishlist ? "currentColor" : "none"}
                />
              </button>
            )}

            {/* Product Image */}
            <Image
              src={imgSrc}
              alt={product?.name || "Product image"}
              width={300}
              height={200}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={!canAdd || isLoading}
            className={buttonClassName}
          >
            {buttonText}
          </Button>
        </div>

        {/* Product Info */}
        <h3 className="font-bold text-sm mt-2 line-clamp-1">
          {product?.name || <span className="text-gray-400">No name</span>}
        </h3>
        {showBrand && (
          <p className="text-xs text-gray-500 line-clamp-1">
            ({product?.brand || <span className="text-gray-400">No brand</span>}
            )
          </p>
        )}
        {product?.weight && (
          <p className="text-xs text-gray-500">{product.weight}</p>
        )}
        {showSeller && (
          <p className="text-xs text-gray-500 line-clamp-1">
            By{" "}
            {storeName || product?.seller || (
              <span className="text-gray-400">Unknown Seller</span>
            )}
          </p>
        )}

        {/* Price & Discount */}
        <div className="mt-2 min-h-[40px] flex flex-col justify-between">
          {discount > 0 ? (
            <p className="text-sm text-blue-700 font-semibold">
              {discount}% OFF
            </p>
          ) : (
            <span className="text-xs text-green-600 font-medium">Best Price</span>
          )}
          <div className="flex items-center gap-2 min-h-[20px]">
            {original > price && (
              <p className="text-xs text-gray-400 line-through">₹{original}</p>
            )}
            <p className="text-sm font-bold text-green-600">₹{price || 100}</p>
          </div>
        </div>

        {/* Rating */}
        {showRating && (
          <div className="flex items-center gap-2 mt-1">
            <Star
              className="text-yellow-300 fill-yellow-300"
              height={16}
              width={16}
            />
            <p className="text-xs font-medium text-gray-500">
              {product?.rating?.average || 0} ({product?.rating?.count || 0})
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

StoreCard.displayName = "StoreCard";
export default StoreCard;

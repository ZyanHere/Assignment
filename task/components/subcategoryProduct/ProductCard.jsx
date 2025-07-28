"use client";
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Heart } from "lucide-react";
import { Button } from "../home/ui2/button";
import { useCart } from "@/lib/contexts/cart-context";
import { useRouter } from "next/navigation";
import { useProduct } from "@/lib/contexts/productContext";
import Image from "next/image";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/hooks/useAuth";
import { useSession } from "next-auth/react";
import { useWishlist } from "@/lib/hooks/useWishlist";

const ProductCard = React.memo(({ product }) => {
  const { addToCart, isInCart, getItemQuantity, isProductLoading: isCartLoading } = useCart();
  const router = useRouter();
  const { setSelectedProduct, setSelectedVariant } = useProduct();
  const [imageError, setImageError] = useState(false);
  const { isAuthenticated } = useAuth();
  const { data: session } = useSession();
  const {
    addItem,
    removeItem,
    isInWishlist,
    isProductLoading
  } = useWishlist();

  const handleItemClick = () => {
    setSelectedProduct(product);
    setSelectedVariant(product.variants[0]);
    router.push(`/product/${product._id || product.id}`);
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

  const handleImageError = (e) => {
    e.currentTarget.src = "/fallback.png";
    setImageError(true);
  };


  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Login to add products');
      router.push('/auth/login');
      return;
    }
    const data = getVariantData();

    if (data?.variant && !isInCart(data.variant._id)) {
      try {
        await addToCart({
          id: data.variant._id,
          variant: data.variant,
          product,
          price: data.price,
          sale_price: data.sale_price,
          stock: data.stock,
          sku: data.sku,
        });
        toast.success('Added to Cart successfully');
      } catch (error) {
        toast.error(error.message || 'Failed to add to cart');
      }
    } else if (isInCart(data.variant._id)) {
      toast.info('Item already in cart');
    } else {
      console.warn("No variant available for this product");
    }
  };

  const productId = product?.id || product?._id
  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    if (!session?.user?.token) {
      toast.error('Please login to save items to wishlist');
      return;
    }

    try {
      if (isInWishlist(productId)) {
        await removeItem(productId);
        toast.success('Removed from wishlist');
      } else {
        await addItem(productId);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update wishlist');
    }
  };

  const inWishlist = useMemo(() => isInWishlist(productId), [isInWishlist, productId]);

  const imageUrl = getImageUrl();
  const variantData = getVariantData();

  const displayPrice =
    variantData?.sale_price > 0 ? variantData.sale_price : variantData?.price || 100;
  const originalPrice = variantData?.sale_price > 0 ? variantData.price : null;
  const canAddToCart = variantData?.variant && variantData.stock > 0;

  // Memoize cart-related values to prevent unnecessary re-renders
  const variantId = variantData?.variant?._id;
  const isProductInCart = useMemo(() => isInCart(variantId), [isInCart, variantId]);
  const cartItemQuantity = useMemo(() => getItemQuantity(variantId), [getItemQuantity, variantId]);
  const isLoading = useMemo(() => isCartLoading(variantId), [isCartLoading, variantId]);

  // Discount Percentage
  const discount = originalPrice
    ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
    : 0;

  // Memoize button text to prevent unnecessary re-renders
  const buttonText = useMemo(() => {
    if (isLoading) return "...";
    if (isProductInCart) return `${cartItemQuantity}`;
    if (canAddToCart) return "ADD";
    return "OUT";
  }, [isLoading, isProductInCart, cartItemQuantity, canAddToCart]);

  // Memoize button className to prevent unnecessary re-renders
  const buttonClassName = useMemo(() => {
    const baseClass = "absolute -bottom-1.5 right-4 text-xs w-[53px] h-[33px] font-medium rounded-md border transition shadow-md";
    if (isProductInCart) {
      return `${baseClass} bg-green-50 text-green-500 border-green-400`;
    } else if (canAddToCart) {
      return `${baseClass} bg-white text-blue-400 border-blue-400 hover:bg-blue-100`;
    } else {
      return `${baseClass} bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed`;
    }
  }, [isProductInCart, canAddToCart]);

  return (
    <Card
      className="w-[240px] rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleItemClick}
    >
      <CardHeader className="">
        <div className="relative flex items-center justify-center w-full h-[161px] bg-blue-50 rounded-xl overflow-hidden">
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 z-10 p-1 rounded-full shadow-md transition ${inWishlist ? "bg-white/60 text-red-500" : "bg-white/60 text-gray-600 hover:text-red-500"
              }`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className="w-5 h-5" fill={inWishlist ? "currentColor" : "none"} />
          </button>
          <Image
            src={imageUrl}
            alt={product.name}
            onError={handleImageError}
            height={300}
            width={300}
            className="w-full h-full object-cover"
            quality={90}
            priority={false}

          />
          <Button
            className={buttonClassName}
            onClick={handleAddToCart}
            disabled={!canAddToCart || isLoading}
            aria-label={isProductInCart ? "Item in cart" : canAddToCart ? "Add to cart" : "Out of stock"}
          >
            {buttonText}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 space-y-2 min-h-[120px] flex flex-col justify-between">
        <CardTitle className="text-sm font-bold line-clamp-1">{variantData?.variant?.variant_name || product.name || <span className='text-gray-400'>No name</span>}</CardTitle>
        <p className="text-xs text-gray-500 line-clamp-1">({product.brand || <span className='text-gray-400'>No brand</span>})</p>
        <p className="text-xs text-gray-500">By {product.vendor_store_id?.store_name || <span className='text-gray-400'>Unknown Seller</span>}</p>
        <p className="text-sm text-blue-700 font-semibold min-h-[20px]">{discount > 0 ? `${discount}% OFF` : <span className=' text-green-400 px-2 py-1 rounded'>Best Price</span>}</p>
        <div className="flex items-center gap-2 min-h-[20px]">
          {originalPrice ? <p className="text-xs text-gray-400 line-through">₹{originalPrice}</p> : <span className='text-gray-400'>₹100</span>}
          <p className="text-sm font-bold text-green-600">{displayPrice ? `₹${displayPrice}` : <span className='text-gray-400'>₹100</span>}</p>
        </div>
        <div className="flex items-center gap-2 mt-1 min-h-[20px]">
          <Star className="text-yellow-300 fill-yellow-300" height={16} width={16} />
          <p className="text-xs font-medium text-gray-500">{product.rating?.average || 0} ({product.rating?.count || 0})</p>
        </div>
        <p className="text-xs text-red-500 font-semibold mt-1">{variantData?.stock === 0 ? 'No stock' : ''}</p>
      </CardContent>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;

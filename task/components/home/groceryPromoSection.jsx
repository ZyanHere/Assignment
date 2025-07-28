"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchComprehensiveHomeData, fetchProductsByCategory } from "@/lib/redux/home/homeSlice"; // Update this path
import { useCart } from "@/lib/contexts/cart-context";
import useTimer from "@/lib/hooks/useTimer";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useWishlist } from "@/lib/hooks/useWishlist";
import { Heart } from "lucide-react";
import { useProduct } from "@/lib/contexts/productContext";

const GroceryPromoSection = () => {
  const dispatch = useDispatch();
  const {
    categories,
    productsByCategory,
    homeDataLoading,
    productsLoading
  } = useSelector(state => state.home);

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchComprehensiveHomeData());
  }, [dispatch]);

  // Find Fruits and Vegetables category
  const fruitsVegCategory = categories.find(cat =>
    cat.name?.toLowerCase().includes('fruits') && cat.name?.toLowerCase().includes('vegetables') ||
    cat.name?.toLowerCase().includes('fruit') ||
    cat.name?.toLowerCase().includes('vegetable') ||
    cat.name?.toLowerCase() === 'produce' ||
    cat.name?.toLowerCase() === 'fresh'
  );

  const categoryId = fruitsVegCategory?._id || fruitsVegCategory?.id;

  // Fetch products for Fruits and Vegetables category
  useEffect(() => {
    if (categoryId && !productsByCategory[categoryId] && !productsLoading[categoryId]) {
      dispatch(fetchProductsByCategory(categoryId));
    }
  }, [categoryId, productsByCategory, productsLoading, dispatch]);

  // Get products for the category
  const categoryProducts = categoryId ? (productsByCategory[categoryId] || []) : [];
  //console.log('Category Products:', categoryProducts);

  // Normalize product data to match the component structure
  const mappedProducts = categoryProducts.length > 0
    ? categoryProducts.slice(0, 3).map((p) => {
      const variant = p.variants?.[0] || {};
      const basePrice = variant?.price?.base_price || p.price || p.originalPrice || 0;
      const salePrice = variant?.price?.sale_price || p.salePrice || p.discountedPrice || basePrice;

      return {
        id: p._id || p.id || `product-${Math.random()}`,
        name: p.name || p.title || "Unknown Product",
        brand: p.brand || p.manufacturer || "Fresh",
        seller: p.vendor_store_id?.store_name || p.seller || "Local Store",
        discountedPrice: salePrice,
        originalPrice: basePrice,
        image: variant?.images?.[0]?.url || p.images?.[0]?.url || p.image || p.imageUrl || "/fallback.png",
        weight: p.attributes?.find((attr) => attr.name?.toLowerCase() === "weight")?.value ||
          p.weight || p.unit || "1 kg",
        time: p.timing?.end_date || new Date(Date.now() + 12 * 60 * 60 * 1000),
        discount: basePrice && salePrice
          ? Math.round(((basePrice - salePrice) / basePrice) * 100)
          : Math.floor(Math.random() * 30) + 10, // Random discount 10-40% if not available
        variants: p.variants || [],
        category: p.category
      };
    })
    : [];

  // Check if we have no data
  const hasNoData = !homeDataLoading &&
    (!categoryId || !productsLoading[categoryId]) &&
    mappedProducts.length === 0;

  // Show loading state
  if (homeDataLoading || (categoryId && productsLoading[categoryId])) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-3xl p-4 sm:p-6 lg:p-8" style={{ background: "#F5FBF5" }}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8">
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border">
                    <div className="bg-gray-200 rounded-xl h-24 sm:h-28 lg:h-32 mb-3 animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 w-full sm:w-[300px] lg:w-[320px]">
              <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show "No data present" message
  if (hasNoData) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-3xl p-4 sm:p-6 lg:p-8" style={{ background: "#F5FBF5" }}>
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <p className="text-gray-500 text-lg font-medium mb-2">No data present</p>
              <p className="text-gray-400 text-sm">
                {!fruitsVegCategory
                  ? "Fruits & Vegetables category not found"
                  : "No products available in this category"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="rounded-3xl p-4 sm:p-6 lg:p-8" style={{ background: "#F5FBF5" }}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8">
          {/* Left - Product Cards Section */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {mappedProducts.map((product, index) => (
                <ProductCardMini key={product.id || index} product={product} />
              ))}
            </div>
          </div>

          {/* Right - Promo */}
          <div className="flex-shrink-0 flex flex-col justify-center items-center lg:items-end text-center lg:text-right w-full sm:w-[300px] lg:w-[320px]">
            <div className="mb-4">
              <p className="font-medium mb-2 text-sm sm:text-base" style={{ color: "#B6349A" }}>
                Get 10% OFF On Fresh Produce
              </p>
              <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-gray-900 leading-snug">
                Fresh Fruits & Vegetables!
              </h2>
            </div>

            <div className="flex justify-center lg:justify-end gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">100+</div>
                <div className="text-xs sm:text-sm text-gray-600">Fresh Items</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">30</div>
                <div className="text-xs sm:text-sm text-gray-600">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">25%</div>
                <div className="text-xs sm:text-sm text-gray-600">Up to offers</div>
              </div>
            </div>

            <Button
              className="cursor-pointer text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-medium flex items-center gap-2 transition w-full sm:w-auto"
              style={{ backgroundColor: "#A02B84" }}
              onClick={() => {
                // Navigate to fruits and vegetables category
                console.log('Navigate to category:', fruitsVegCategory?.name);
              }}
            >
              Shop Now
              <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Debug info - remove in production */}

      </div>
    </div>
  );
};

// Mini Product Card Component
const ProductCardMini = ({ product }) => {

  // const timeLeft = useTimer(product.time);
  const { addToCart, isInCart, getItemQuantity, isProductLoading: isCartLoading } = useCart();
  const variantId = product.variants[0]?._id;
  const cartItemQuantity = useMemo(() => getItemQuantity(variantId), [getItemQuantity, variantId]);
  const isProductInCart = useMemo(() => isInCart(variantId), [isInCart, variantId]);
  const isLoading = useMemo(() => isCartLoading(variantId), [isCartLoading, variantId]);
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const canAdd = product?.variants && product.variants?.length > 0 && product.variants[0]?.stock?.quantity > 0;
  const { setSelectedProduct, setSelectedVariant } = useProduct();

  const { data: session } = useSession();
  const {
    addItem,
    removeItem,
    isInWishlist,
    isProductLoading
  } = useWishlist();

  // Memoize button text to prevent unnecessary re-renders
  const buttonText = useMemo(() => {
    if (!canAdd) return "Out of stock";
    if (isLoading) return "Adding...";
    if (isProductInCart) return `Added (${cartItemQuantity})`;
    return "ADD";
  }, [canAdd, isLoading, isProductInCart, cartItemQuantity]);

  // Memoize button className to prevent unnecessary re-renders
  const buttonClassName = useMemo(() => {
    const baseClass = "absolute bottom-3 right-10 transform translate-y-1/2 translate-x-1/2 px-3 py-1.5 border font-medium rounded-md hover:bg-blue-100 transition shadow-md";
    return `${baseClass} ${isProductInCart
      ? "bg-green-50 text-green-500 border-green-400"
      : "bg-white text-blue-400 border-blue-400"
      }`;
  }, [isProductInCart]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Login to add products');
      router.push('/auth/login');
      return;
    }
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

  const handleItemClick = () => {
    setSelectedProduct(product);
    setSelectedVariant(product.variants[0])
    router.push(`/product/${product._id || product.id}`);
  }


  // const timeLeftCount = timeLeft ? timeLeft.hours * 60 + timeLeft.minutes : 0;

  const imageSrc =
    product.image && typeof product.image === "string" && product.image.trim() !== ""
      ? product.image
      : "/fallback.png";

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border" onClick={handleItemClick}>
      {/* Product Image */}
      <div className="relative bg-gray-50 rounded-xl h-24 sm:h-28 lg:h-32 flex items-center justify-center mb-3">
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 z-10 p-1 rounded-full shadow-md transition ${inWishlist ? "bg-white/60 text-red-500" : "bg-white/60 text-gray-600 hover:text-red-500"
            }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className="w-5 h-5" fill={inWishlist ? "currentColor" : "none"} />
        </button>
        <Image
          src={imageSrc}
          alt={product.name || "Product image"}
          width={80}
          height={60}
          className="object-contain max-w-full max-h-full"
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

      {/* Product Info */}
      <div className="text-center">
        <h3 className="font-semibold text-xs sm:text-sm text-gray-900 mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mb-2">({product.brand})</p>

        <div className="mb-3">
          <p className="text-xs sm:text-sm font-semibold text-green-600 mb-1">
            {product.discount}% OFF
          </p>
          {/* <p className="text-xs text-orange-500">
            {Math.max(timeLeftCount, 120)} Min Left
          </p> */}
        </div>

        <div className="mb-3">
          <p className="text-xs text-gray-400 line-through">
            MRP: ₹{product.originalPrice}
          </p>
          <p className="text-xs sm:text-sm font-bold text-gray-900">
            ₹{product.discountedPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroceryPromoSection;
"use client";

import { useCart } from "@/lib/contexts/cart-context";
import useTimer from "@/lib/hooks/useTimer";
import Image from "next/image";
import { Button } from "../ui/button";

const GroceryPromoSection = ({ products = [] }) => {
  // Normalize product data to match BrandCarousel structure
  const mappedProducts = products.length > 0 ? products.slice(0, 3).map((p) => {
    const variant = p.variants?.[0] || {};
    const basePrice = variant?.price?.base_price || 0;
    const salePrice = variant?.price?.sale_price || basePrice;

    return {
      id: p._id || `fallback-${Math.random()}`, // Ensure unique ID
      name: p.name || "Unknown Product",
      brand: p.brand || "Unknown Brand",
      seller: p.vendor_store_id?.store_name || "Unknown Seller",
      discountedPrice: salePrice,
      originalPrice: basePrice,
      image: variant?.images?.[0]?.url || p.images?.[0]?.url || "/fallback.png",
      weight:
        p.attributes?.find((attr) => attr.name?.toLowerCase() === "weight")?.value ||
        "1 unit",
      time: p.timing?.end_date || null,
      discount:
        basePrice && salePrice
          ? Math.round(((basePrice - salePrice) / basePrice) * 100)
          : 0,
    };
  }) : [
    {
      id: "fallback-1",
      name: "Macbook Pro",
      brand: "Apple",
      seller: "Apple Store",
      originalPrice: 75000,
      discountedPrice: 67460,
      discount: 20,
      image: "/images/macbook.jpg", // Ensure this exists in /public/images
      weight: "1 unit",
      time: new Date(Date.now() + 12 * 60 * 60 * 1000),
    },
    {
      id: "fallback-2",
      name: "Headphone",
      brand: "Sony",
      seller: "Sony Store",
      originalPrice: 3300,
      discountedPrice: 2690,
      discount: 20,
      image: "/images/headphone.jpg", // Ensure this exists in /public/images
      weight: "1 unit",
      time: new Date(Date.now() + 12 * 60 * 60 * 1000),
    },
    {
      id: "fallback-3",
      name: "Macbook Pro",
      brand: "Apple",
      seller: "Apple Store",
      originalPrice: 18400,
      discountedPrice: 14400,
      discount: 20,
      image: "/images/macbook.jpg", // Ensure this exists in /public/images
      weight: "1 unit",
      time: new Date(Date.now() + 12 * 60 * 60 * 1000),
    },
  ];

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
                Get 10% OFF On Your First Order
              </p>
              <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-gray-900 leading-snug">
                Order Now Your Grocery!
              </h2>
            </div>

            <div className="flex justify-center lg:justify-end gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">1k+</div>
                <div className="text-xs sm:text-sm text-gray-600">Items</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">20</div>
                <div className="text-xs sm:text-sm text-gray-600">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">30%</div>
                <div className="text-xs sm:text-sm text-gray-600">Up to offers</div>
              </div>
            </div>

            <Button
              className="cursor-pointer text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-medium flex items-center gap-2 transition w-full sm:w-auto"
              style={{ backgroundColor: "#A02B84" }}
            >
              Order Now
              <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mini Product Card Component
const ProductCardMini = ({ product }) => {
  const timeLeft = useTimer(product.time);
  const { addToCart, cart } = useCart();
  const isInCart = cart.some((item) => item.id === product.id);

  // Debug logs
  console.log("🧪 ProductCardMini:", product);
  console.log("Image source:", product.image);

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

  const timeLeftCount = timeLeft ? timeLeft.hours * 60 + timeLeft.minutes : 0;

  const imageSrc =
    product.image && typeof product.image === "string" && product.image.trim() !== ""
      ? product.image
      : "/fallback.png";

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 border">
      {/* Product Image */}
      <div className="relative bg-gray-50 rounded-xl h-24 sm:h-28 lg:h-32 flex items-center justify-center mb-3">
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
          onClick={handleAddToCart}
          disabled={!product.id}
          className={`absolute bottom-2 right-2 transform translate-y-1/2 translate-x-1/2 w-[48px] sm:w-[53px] h-[30px] sm:h-[33px] border font-medium rounded-md hover:bg-blue-100 transition shadow-md
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

      {/* Product Info */}
      <div className="text-center">
        <h3 className="font-semibold text-xs sm:text-sm text-gray-900 mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mb-2">({product.brand})</p>

        <div className="mb-3">
          <p className="text-xs sm:text-sm font-semibold text-blue-600 mb-1">
            {product.discount}% OFF
          </p>
          <p className="text-xs text grips-orange-500">
            {timeLeftCount} Min Left
          </p>
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
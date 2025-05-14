"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import useTimer from "@/lib/hooks/useTimer";
import { useCart } from "@/lib/contexts/cart-context";

const ProductCard = ({ product }) => {
  const timeLeft = useTimer(product.time);
  const { addToCart, cart } = useCart();

  // Check if this specific product is already in the cart by its unique ID
  const isInCart = cart.some(item => item.id === product.id);

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
        weight: product.weight
      });
    }
  };

  return (
    <div className="pb-2 group">
      <div className="w-full p-3 border rounded-xl  hover:shadow-lg transition-all duration-300 bg-white shadow-sm ">
        <div className="relative bg-blue-50 p-2 rounded-xl h-[120px] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain transition-transform group-hover:scale-105"
          />
        </div>

        <h3 className="font-bold text-sm mt-2 line-clamp-1">{product.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-1">({product.brand})</p>
        <p className="text-xs text-gray-500">{product.weight}</p>
        <p className="text-xs text-gray-500 line-clamp-1">
          By {product.seller}
        </p>

        <div className="mt-2">
          {timeLeft.expired ? (
            <div className="text-center text-red-500 text-xs font-medium py-2">
              Offer Expired
            </div>
          ) : (
            <div className="flex flex-col items-center bg-gray-100 rounded p-1">
              <div className="flex items-center justify-center gap-1 text-blue-700 text-sm font-medium">
                <span>{String(timeLeft.hours).padStart(2, "0")}</span>
                <span>:</span>
                <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span>:</span>
                <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-gray-500 text-[10px] mt-1">
                <span className="w-6 text-center">hours</span>
                <span className="w-6 text-center">min</span>
                <span className="w-6 text-center">sec</span>
              </div>
            </div>
          )}
        </div>

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

        <Button
          onClick={handleAddToCart}
          variant="outline"
          className={`w-full mt-3 font-bold tracking-wide border-blue-200 ${
            isInCart ? "text-green-500" : "text-yellow-600"
          }`}
        >
          {isInCart ? "✓ Added" : "ADD TO CART"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;



// "use client";

// import Image from "next/image";
// import { Button } from "../ui/button";
// import useTimer from "@/lib/hooks/useTimer";
// import { useCart } from "@/lib/contexts/cart-context";

// const ProductCard = ({ 
//   product,
//   variant = "default", // 'default' | 'fashion' | 'electronics' | 'gift'
//   showTimer = true,
//   showBrand = true,
//   showSeller = true,
//   showWeight = true,
//   imageSize = "medium" // 'small' | 'medium' | 'large'
// }) => {
//   // Destructure product with defaults
//   const {
//     id = "",
//     name = "Unnamed Product",
//     brand = "Generic",
//     seller = "Unknown Seller",
//     image = "/placeholder.png",
//     weight = "",
//     originalPrice = 0,
//     discountedPrice = 0,
//     discount = 0,
//     time = 0,
//     tag, // For electronics
//     gender, // For fashion/gifts
//     stockStatus = "Available"
//   } = product || {};

//   const timeLeft = useTimer(time || 0);
//   const { addToCart, cart } = useCart();
//   const isInCart = id ? cart.some(item => item.id === id) : false;

//   // Handle different image dimensions based on size prop
//   const imageDimensions = {
//     small: { width: 148, height: 90 },
//     medium: { width: 180, height: 180 },
//     large: { width: 200, height: 200 }
//   };

//   // Stock status color coding
//   const getStockColor = () => {
//     const lower = stockStatus.toLowerCase();
//     if (lower.includes("few")) return "text-red-500";
//     if (lower.includes("fresh") || lower.includes("available")) return "text-green-500";
//     return "text-orange-500";
//   };

//   // Get appropriate description based on variant
//   const getDescription = () => {
//     switch (variant) {
//       case "electronics":
//         return tag || "Electronics";
//       case "fashion":
//         return gender ? `For ${gender.toLowerCase()}` : "Unisex";
//       case "gift":
//         return gender ? `For ${gender.toLowerCase()}` : "Memorable Gifting Experience";
//       default:
//         return "100% Natural & Farm Fresh"; // Default for grocery items
//     }
//   };

//   const handleAddToCart = () => {
//     if (!isInCart && id) {
//       addToCart({
//         id,
//         name,
//         brand,
//         seller,
//         price: discountedPrice,
//         mrp: originalPrice,
//         image,
//         weight,
//         ...(variant === "electronics" && { category: "electronics" }),
//         ...(variant === "fashion" && { category: "fashion" })
//       });
//     }
//   };

//   return (
//     <div className="pb-2 group">
//       <div
//         className={`w-full p-3 border rounded-xl hover:shadow-lg transition-all duration-300 bg-white shadow-sm ${
//           variant === "fashion" ? "h-[388px]" : "h-[400px]"
//         }`}
//         role="group"
//         aria-label={`${variant} product card for ${name}`}
//       >
//         {/* Product Image */}
//         <div className={`relative bg-blue-50 rounded-xl overflow-hidden ${
//           imageSize === "small" ? "h-[120px] p-2" : "h-[192px] p-6"
//         }`}>
//           <Image
//             src={image}
//             alt={name}
//             fill
//             className="object-contain transition-transform group-hover:scale-105"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "/fallback.png";
//             }}
//           />

//           {/* Add to Cart Button - Position varies by image size */}
//           <Button
//             onClick={handleAddToCart}
//             variant="outline"
//             disabled={!id}
//             className={`absolute ${
//               imageSize === "small" ? "bottom-2 right-10" : "bottom-1 right-10"
//             } transform translate-y-1/2 translate-x-1/2 w-[53px] h-[33px] border font-medium rounded-md hover:bg-blue-100 transition shadow-md ${
//               isInCart ? "bg-green-50 text-green-500 border-green-400" 
//                       : "bg-white text-blue-400 border-blue-400"
//             }`}
//             aria-label={isInCart ? "Remove from cart" : "Add to cart"}
//           >
//             {isInCart ? "✓" : "ADD"}
//           </Button>
//         </div>

//         {/* Stock Status (shown for fashion/electronics variants) */}
//         {(variant === "fashion" || variant === "electronics") && (
//           <p className={`text-sm ${getStockColor()}`}>
//             {stockStatus}
//           </p>
//         )}

//         {/* Product Info */}
//         <div className="w-full">
//           <h3 className="text-lg font-bold truncate">{name}</h3>
//           {showBrand && <p className="text-xs text-gray-500 line-clamp-1">({brand})</p>}
//           {showWeight && weight && <p className="text-xs text-gray-500">{weight}</p>}
//           {showSeller && <p className="text-xs text-gray-500 line-clamp-1">By {seller}</p>}
//           <p className="text-gray-600 text-sm">{getDescription()}</p>
//         </div>

//         {/* Rating (static for now) */}
//         <div className="flex text-yellow-500 text-lg" aria-label="Product rating">
//           ★★★★☆
//         </div>

//         {/* Timer (shown for default/grocery variants) */}
//         {showTimer && variant === "default" && (
//           <div className="mt-2">
//             {timeLeft.expired ? (
//               <div className="text-center text-red-500 text-xs font-medium py-2">
//                 Offer Expired
//               </div>
//             ) : (
//               <div className="flex flex-col items-center bg-gray-100 rounded p-1">
//                 <div className="flex items-center justify-center gap-1 text-blue-700 text-sm font-medium">
//                   <span>{String(timeLeft.hours).padStart(2, "0")}</span>
//                   <span>:</span>
//                   <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
//                   <span>:</span>
//                   <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
//                 </div>
//                 <div className="flex items-center justify-center gap-4 text-gray-500 text-[10px] mt-1">
//                   <span className="w-6 text-center">hours</span>
//                   <span className="w-6 text-center">min</span>
//                   <span className="w-6 text-center">sec</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Pricing */}
//         <div className="mt-2">
//           {discount > 0 && (
//             <p className="text-sm text-blue-700 font-semibold">
//               {discount}% OFF
//             </p>
//           )}
//           <div className="flex items-center gap-2">
//             {originalPrice > 0 && originalPrice !== discountedPrice && (
//               <p className="text-xs text-gray-400 line-through">
//                 ₹{originalPrice}
//               </p>
//             )}
//             <p className="text-lg font-bold text-green-600">
//               {discountedPrice ? `₹${discountedPrice}` : "Price unavailable"}
//             </p>
//           </div>
//         </div>

//         {/* Add to Cart Button (alternative for default variant) */}
//         {variant === "default" && (
//           <Button
//             onClick={handleAddToCart}
//             variant="outline"
//             disabled={!id}
//             className={`w-full mt-3 font-bold tracking-wide border-blue-200 ${
//               isInCart ? "text-green-500" : "text-yellow-600"
//             }`}
//           >
//             {isInCart ? "✓ Added" : "ADD TO CART"}
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
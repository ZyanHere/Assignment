// "use client";

// import { useCart } from "@/lib/contexts/cart-context";
// import useTimer from "@/lib/hooks/useTimer";
// import Image from "next/image";
// import { Button } from "../../../components/ui/button";

// const FruitsCard = ({ product }) => {
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
//   } = product || {};

//   const timeLeft = useTimer(time || 0);
//   const { addToCart, cart } = useCart();

//   const isInCart = id ? cart.some((item) => item.id === id) : false;

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
//       });
//     }
//   };

//   return (
//     <div className="pb-2 group">
//       <div
//         className="w-full p-3 border rounded-xl hover:shadow-lg transition-all duration-300 bg-white shadow-sm"
//         role="group"
//         aria-label={`Fruits product card for ${name}`}
//       >
//         <div className="relative bg-blue-50 p-2 rounded-xl h-[120px] overflow-hidden">
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
//         </div>

//         <h3 className="font-bold text-sm mt-2 line-clamp-1">{name}</h3>
//         <p className="text-xs text-gray-500 line-clamp-1">({brand})</p>
//         <p className="text-xs text-gray-500">{weight}</p>
//         <p className="text-xs text-gray-500 line-clamp-1">By {seller}</p>

//         <div className="mt-2">
//           {timeLeft.expired ? (
//             <div className="text-center text-red-500 text-xs font-medium py-2">
//               Offer Expired
//             </div>
//           ) : (
//             <div className="flex flex-col items-center bg-gray-100 rounded p-1">
//               <div className="flex items-center justify-center gap-1 text-blue-700 text-sm font-medium">
//                 <span>{String(timeLeft.hours).padStart(2, "0")}</span>
//                 <span>:</span>
//                 <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
//                 <span>:</span>
//                 <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
//               </div>
//               <div className="flex items-center justify-center gap-4 text-gray-500 text-[10px] mt-1">
//                 <span className="w-6 text-center">hours</span>
//                 <span className="w-6 text-center">min</span>
//                 <span className="w-6 text-center">sec</span>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="mt-2">
//           <p className="text-sm text-blue-700 font-semibold">
//             {discount ? `${discount}% OFF` : "No discount"}
//           </p>
//           <div className="flex items-center gap-2">
//             <p className="text-xs text-gray-400 line-through">
//               {originalPrice ? `₹${originalPrice}` : ""}
//             </p>
//             <p className="text-sm font-bold text-green-600">
//               {discountedPrice ? `₹${discountedPrice}` : "Price unavailable"}
//             </p>
//           </div>
//         </div>

//         <Button
//           onClick={handleAddToCart}
//           variant="outline"
//           disabled={!id}
//           className={`w-full mt-3 font-bold tracking-wide border-blue-200 ${
//             isInCart ? "text-green-500" : "text-yellow-600"
//           }`}
//           aria-label={isInCart ? "Already in cart" : "Add to cart"}
//         >
//           {isInCart ? "✓ Added" : "ADD TO CART"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default FruitsCard;

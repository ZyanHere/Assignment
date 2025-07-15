// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { Button } from "../../../components/ui/button";

// const FashionCard = ({
//   imageSrc = "/placeholder.png",
//   name = "Unnamed Product",
//   price = "N/A",
//   stockStatus = "Unavailable",
//   gender = "unisex",
// }) => {
//   const [added, setAdded] = useState(false);

//   const getStockColor = () => {
//     const lower = stockStatus.toLowerCase();
//     if (lower.includes("few")) return "text-red-500";
//     if (lower.includes("fresh")) return "text-green-500";
//     return "text-orange-500";
//   };

//   return (
//     <div
//       className="flex flex-col items-left justify-left gap-3 w-[230px] h-[388px] border rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow"
//       role="group"
//       aria-label={`Fashion card for ${name}`}
//     >
//       <div className="relative flex items-center justify-center w-full h-[192px] bg-blue-50 rounded-xl p-6">
//         <Image
//           src={imageSrc}
//           alt={name}
//           width={180}
//           height={180}
//           className="w-full h-full object-contain"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = "/fallback.png";
//           }}
//         />

//         <Button
//           onClick={() => setAdded(!added)}
//           className={`absolute bottom-1 right-10 transform translate-y-1/2 translate-x-1/2 w-[53px] h-[33px] border font-medium rounded-md hover:bg-blue-100 transition shadow-md
//             ${added ? "bg-green-50 text-green-500 border-green-400" : "bg-white text-blue-400 border-blue-400"}`}
//           aria-label={added ? "Remove from cart" : "Add to cart"}
//         >
//           {added ? "✓" : "ADD"}
//         </Button>
//       </div>

//       <p className={`text-sm ${getStockColor()}`}>
//         {stockStatus}
//       </p>

//       <div className="w-full">
//         <h3 className="text-lg font-bold truncate">{name}</h3>
//         <p className="text-gray-600 text-sm">For {gender.toLowerCase()}</p>
//       </div>

//       <div className="flex text-yellow-500 text-lg" aria-label="Product rating">
//         ★★★★☆
//       </div>

//       <p className="text-lg font-bold">
//         {price !== "N/A" ? `Rs ${price}` : "Price unavailable"}
//       </p>
//     </div>
//   );
// };

// export default FashionCard;

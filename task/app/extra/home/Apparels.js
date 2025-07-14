// // "use client";

// // import useSWR from "swr";
// // import ApparelsCard from "./ApparelsCard";
// // import { Skeleton } from "../ui/skeleton";
// // import { Button } from "../ui/button";
// // import { fetcher } from "@/lib/api";

// // const ApparelsTabContent = () => {
// //   const { data: products, error, isLoading, mutate } = useSWR(
// //     "/lmd/api/v1/products/Apparels",
// //     fetcher
// //   );

// //   if (isLoading) {
// //     return (
// //       <div className="p-6 lg:px-16">
// //         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
// //           {Array.from({ length: 10 }).map((_, i) => (
// //             <Skeleton key={i} className="w-full h-[350px] rounded-xl" />
// //           ))}
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     console.error("Failed to fetch Apparels products:", error);
// //     return (
// //       <div className="text-center py-10">
// //         <p className="text-red-500 mb-4">Failed to load Apparels products.</p>
// //         <Button onClick={() => mutate()} className="bg-blue-500 text-white">
// //           Retry
// //         </Button>
// //       </div>
// //     );
// //   }

// //   const safeProducts = Array.isArray(products)
// //     ? products.filter((p) => p && p.id && p.name && p.discountedPrice && p.originalPrice && p.image)
// //     : [];

// //   return (
// //     <div className="p-6 lg:px-16">
// //       <div
// //         className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 max-h-[80vh] overflow-y-auto pr-2"
// //         role="region"
// //         aria-label="Apparels products"
// //       >
// //         {safeProducts.map((product) => (
// //           <ApparelsCard key={product.id} product={product} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ApparelsTabContent;

// "use client";

// import { fetcher } from "@/lib/api";
// import useSWR from "swr";
// import ApparelsCard from "../../../components/home/ApparelsCard";
// import { Button } from "../../../components/ui/button";
// import { Skeleton } from "../../../components/ui/skeleton";

// const ApparelsTabContent = () => {
//   const { data: products, error, isLoading, mutate } = useSWR(
//     "/lmd/api/v1/products/Apparels",
//     fetcher
//   );

//   if (isLoading) {
//     return (
//       <div className="p-3 sm:p-4 md:p-6 lg:px-16 lg:py-6">
//         <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
//           {Array.from({ length: 12 }).map((_, i) => (
//             <Skeleton
//               key={i}
//               className="w-full h-[280px] xs:h-[320px] sm:h-[350px] md:h-[380px] lg:h-[400px] rounded-xl bg-gray-200 animate-pulse"
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     console.error("Failed to fetch Apparels products:", error);
//     return (
//       <div className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-4">
//         <div className="text-center max-w-md">
//           <div className="mb-4">
//             <svg
//               className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-400 mb-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//           </div>
//           <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
//             Oops! Something went wrong
//           </h3>
//           <p className="text-sm sm:text-base text-gray-600 mb-6">
//             Failed to load Apparels products. Please try again.
//           </p>
//           <Button
//             onClick={() => mutate()}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-medium transition-colors duration-200"
//           >
//             Try Again
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const safeProducts = Array.isArray(products)
//     ? products.filter((p) => p && p.id && p.name && p.discountedPrice && p.originalPrice && p.image)
//     : [];

//   if (safeProducts.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4">
//         <div className="text-center max-w-md">
//           <div className="mb-6">
//             <svg
//               className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-gray-300"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
//               />
//             </svg>
//           </div>
//           <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
//             No Products Found
//           </h3>
//           <p className="text-sm sm:text-base text-gray-500">
//             We could not find any apparel products at the moment. Check back later!
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-3 sm:p-4 md:p-6 lg:px-16 lg:py-6">
//       {/* Products Counter - Hidden on mobile to save space */}
//       <div className="hidden sm:flex justify-between items-center mb-4 md:mb-6">
//         <h2 className="text-lg md:text-xl font-semibold text-gray-800">
//           Apparels Collection
//         </h2>
//         <span className="text-sm md:text-base text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
//           {safeProducts.length} {safeProducts.length === 1 ? 'item' : 'items'}
//         </span>
//       </div>

//       {/* Responsive Grid Container */}
//       <div className="relative">
//         <div
//           className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 pr-2"
//           role="region"
//           aria-label="Apparels products grid"
//         >
//           {safeProducts.map((product, index) => (
//             <div
//               key={product.id}
//               className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
//               style={{
//                 animationDelay: `${index * 50}ms`,
//                 animation: 'fadeInUp 0.6s ease-out forwards'
//               }}
//             >
//               <ApparelsCard product={product} />
//             </div>
//           ))}
//         </div>

//         {/* Scroll Indicator for Mobile */}
//         <div className="sm:hidden absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none flex items-end justify-center pb-2">
//           <div className="flex space-x-1">
//             <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
//             <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//             <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//           </div>
//         </div>
//       </div>

//       {/* Floating Action Button for Mobile - Add to Cart All or Filter */}
//       <div className="sm:hidden fixed bottom-6 right-4 z-10">
//         <Button
//           className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
//           aria-label="Filter products"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4V13.414a1 1 0 00-.293-.707L3.293 6.293A1 1 0 013 5.586V4z" />
//           </svg>
//         </Button>
//       </div>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .scrollbar-thin {
//           scrollbar-width: thin;
//         }
        
//         .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
//           background-color: #d1d5db;
//           border-radius: 6px;
//         }
        
//         .scrollbar-track-gray-100::-webkit-scrollbar-track {
//           background-color: #f3f4f6;
//         }
        
//         .scrollbar-thin::-webkit-scrollbar {
//           width: 6px;
//         }
        
//         @media (max-width: 640px) {
//           .scrollbar-thin::-webkit-scrollbar {
//             width: 4px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ApparelsTabContent;

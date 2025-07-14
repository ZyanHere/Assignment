// // "use client";

// // import useSWR from "swr";
// // import FruitsCard from "./FruitsCard";
// // import { Skeleton } from "../ui/skeleton";
// // import { Button } from "../ui/button";
// // import { fetcher } from "@/lib/api";

// // const FruitsTabContent = () => {
// //   const { data: products, error, isLoading, mutate } = useSWR(
// //     "/lmd/api/v1/products/Fruits",
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
// //     console.error("Failed to fetch Fruits products:", error);
// //     return (
// //       <div className="text-center py-10">
// //         <p className="text-red-500 mb-4">Failed to load Fruits products.</p>
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
// //         aria-label="Fruits products"
// //       >
// //         {safeProducts.map((product) => (
// //           <FruitsCard key={product.id} product={product} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default FruitsTabContent;



// "use client";

// import { fetcher } from "@/lib/api";
// import useSWR from "swr";
// import { Button } from "../../../components/ui/button";
// import { Skeleton } from "../../../components/ui/skeleton";
// import FruitsCard from "./FruitsCard";

// const FruitsTabContent = () => {
//   const { data: products, error, isLoading, mutate } = useSWR(
//     "/lmd/api/v1/products/Fruits",
//     fetcher
//   );

//   if (isLoading) {
//     return (
//       <div className="w-full px-2 sm:px-4 lg:px-6 xl:px-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
//           {Array.from({ length: 12 }).map((_, i) => (
//             <div key={i} className="w-full">
//               <Skeleton className="h-48 sm:h-52 md:h-56 lg:h-60 w-full rounded-lg" />
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     console.error("Failed to fetch Fruits products:", error);
//     return (
//       <div className="flex flex-col items-center justify-center min-h-64 px-4 text-center">
//         <div className="max-w-md mx-auto">
//           <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
//             Failed to load Fruits products.
//           </p>
//           <Button
//             onClick={() => mutate()}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 text-sm sm:text-base"
//           >
//             Retry
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const safeProducts = Array.isArray(products)
//     ? products.filter((p) => p && p.id && p.name && p.discountedPrice && p.originalPrice && p.image)
//     : [];

//   return (
//     <div className="w-full px-2 sm:px-4 lg:px-6 xl:px-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
//         {safeProducts.map((product) => (
//           <div key={product.id} className="w-full">
//             <FruitsCard product={product} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FruitsTabContent;
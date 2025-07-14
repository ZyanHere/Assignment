// "use client";

// import { GIFT_PRODUCTS } from "@/data/giftData";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "../../../components/ui/carousel";
// import GiftCard from "./GiftCard";

// const GiftCarousel = ({ category }) => {
//   const products = GIFT_PRODUCTS[category] || [];
//   return (
//     <div className="py-6">
//       <Carousel className="w-full mx-auto">
//         <CarouselContent className="-ml-4 ">
//           {products.map((product) => (
//             <CarouselItem
//               key={`${category}-${product.id}`}
//               className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-[18.5%] flex-shrink-0"
//             >
//               <div className="p-1">
//                 <GiftCard {...product} />
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </div>
//   );
// };

// export default GiftCarousel;

// "use client";

// import { FASHION_PRODUCTS } from "@/data/fashionData";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "../ui/carousel";
// import FashionCard from "./FashionCard";



// const FashionCarousel = ({category}) => {

//   const products = FASHION_PRODUCTS[category] || [];
//   return (
//     <div className="py-6">
//       <Carousel className="w-full mx-auto">
//         <CarouselContent className="-ml-4 ">
//           {products.map((product) => (
//             <CarouselItem
//             key={`${category}-${product.id}`}
//               className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-[18.5%] flex-shrink-0"
//             >
//               <div className="p-1">
//               <FashionCard {...product} />
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

// export default FashionCarousel;



"use client";

import useSWR from "swr";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import FashionCard from "./FashionCard";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { fetcher } from "@/lib/api"; 

const FashionCarousel = ({ category }) => {
  const { data: products, error, isLoading, mutate } = useSWR(
    `/lmd/api/v1/products/fashion?category=${category}`,
    fetcher
  );

  if (isLoading) {
    return (
      <div className="py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-[230px] h-[388px] rounded-2xl" />
        ))}
      </div>
    );
  }

  if (error) {
    console.error("Fashion fetch error:", error);
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">Failed to load {category} products.</p>
        <Button onClick={() => mutate()} className="bg-blue-500 text-white">
          Retry
        </Button>
      </div>
    );
  }

  const safeProducts = Array.isArray(products)
    ? products.filter((p) => p && p.id && p.name && p.price && p.imageSrc && p.gender)
    : [];

  return (
    <div className="py-6" role="region" aria-label={`${category} fashion carousel`}>
      <Carousel className="w-full mx-auto">
        <CarouselContent className="-ml-4" role="list">
          {safeProducts.map((product) => (
            <CarouselItem
              key={`${category}-${product.id}`}
              role="listitem"
              className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-[18.5%] flex-shrink-0"
            >
              <div className="p-1" tabIndex="0" role="group" aria-label={product.name}>
                <FashionCard {...product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious aria-label="Previous products" />
        <CarouselNext aria-label="Next products" />
      </Carousel>
    </div>
  );
};

export default FashionCarousel;

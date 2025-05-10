// "use client";

// import { GROCERY_PRODUCTS } from "@/data/groceryData";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "../ui/carousel";
// import ProCard from "./SecProductCard";

// const SecondCarousel = ({ category }) => {
//   const products = GROCERY_PRODUCTS[category] || [];
//   return (
//     <div className="py-6 ">
//       <Carousel
//         className="w-full mx-auto"
//         opts={{
//           align: "start",
//           slidesToScroll: "auto",
//           dragFree: true,
//         }}
//       >
//         <CarouselContent className="-ml-4 ">
//           {products.map((product) => (
//             <CarouselItem
//               key={`${category}-${product.id}`}
//               className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-[18.5%] flex-shrink-0"
//             >
//               <div className="p-1">
//                 <ProCard {...product} />
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious aria-label="Previous slide" />
//         <CarouselNext aria-label="Next slide" />
//       </Carousel>
//     </div>
//   );
// };

// export default SecondCarousel;


"use client";
import useSWR from "swr";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ProCard from "./SecProductCard";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

const fetcher = (url) => fetch(url).then((res) => res.json());

const SecondCarousel = ({ category }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseUrl}/lmd/api/v1/products/retail?category=${category}`;
  const { data: products, error, isLoading, mutate } = useSWR(url, fetcher);

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
    ? products.filter((p) => p && p.id && p.name && p.price && p.imageSrc)
    : [];

  return (
     <div className="py-6" role="region" aria-label={`${category} carousel`}>
      <Carousel
        className="w-full mx-auto"
        opts={{
          align: "start",
          slidesToScroll: "auto",
          dragFree: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {safeProducts.map((product) => (
            <CarouselItem
              key={`${category}-${product.id}`}
              className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-[18.5%] flex-shrink-0"
            >
              <div className="p-1" tabIndex="0" role="group" aria-label={product.name}>
                <ProCard {...product} />
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

export default SecondCarousel;

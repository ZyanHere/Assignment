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

const fetcher = (url) => fetch(url).then((res) => res.json());

const SecondCarousel = ({ category }) => {
  const { data: products, error, isLoading } = useSWR(
    `http://localhost:4000/lmd/api/v1/products/retail?category=${category}`,
    fetcher
  );

  if (isLoading) return <p>Loading {category}...</p>;
  if (error) return <p>Failed to load {category} products.</p>;

  return (
    <div className="py-6">
      <Carousel
        className="w-full mx-auto"
        opts={{
          align: "start",
          slidesToScroll: "auto",
          dragFree: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={`${category}-${product.id}`}
              className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-[18.5%] flex-shrink-0"
            >
              <div className="p-1">
                <ProCard {...product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default SecondCarousel;

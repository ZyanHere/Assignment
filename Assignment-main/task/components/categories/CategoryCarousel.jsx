"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";
import CategoryCard from "./CategoryCard";

// Sample category products
// const categoryProducts = [
//   {
//     id: 801,
//     name: "Fresh Pear",
//     weight: "100 g",
//     store: "Nature's Basket",
//     discount: "20",
//     mrp: "165",
//     price: "100",
//     time: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
//     image: "/categories/pear.png",
//   },
//   {
//     id: 802,
//     name: "Gooseberry",
//     weight: "100 g",
//     store: "Nature's Basket",
//     discount: "20",
//     mrp: "165",
//     price: "100",
//     time: Date.now() + 12 * 60 * 60 * 1000,
//     image: "/categories/gooseberry.png",
//   },
//   {
//     id: 803,
//     name: "Beetroot",
//     weight: "100 g",
//     store: "Nature's Basket",
//     discount: "20",
//     mrp: "165",
//     price: "100",
//     time: Date.now() + 12 * 60 * 60 * 1000,
//     image: "/categories/beetroot.png",
//   },
//   {
//     id: 804,
//     name: "Exotic Brinjal",
//     weight: "100 g",
//     store: "Nature's Basket",
//     discount: "20",
//     mrp: "165",
//     price: "100",
//     time: Date.now() + 12 * 60 * 60 * 1000,
//     image: "/categories/brinjal.png",
//   },
//   {
//     id: 805,
//     name: "Custard Apple",
//     weight: "100 g",
//     store: "Nature's Basket",
//     discount: "20",
//     mrp: "165",
//     price: "100",
//     time: Date.now() + 12 * 60 * 60 * 1000,
//     image: "/categories/custardapple.png",
//   },
//   {
//     id: 806,
//     name: "Mango",
//     weight: "100 g",
//     store: "Nature's Basket",
//     discount: "20",
//     mrp: "165",
//     price: "100",
//     time: Date.now() + 12 * 60 * 60 * 1000,
//     image: "/categories/mangoes.png",
//   },
//   {
//     id: 807,
//     name: "Exotic Brinjal",
//     weight: "100 g",
//     store: "Nature's Basket",
//     discount: "20",
//     mrp: "165",
//     price: "100",
//     time: Date.now() + 12 * 60 * 60 * 1000,
//     image: "/categories/brinjal.png",
//   },
// ];

const CategoryCarousel = ({ data = [], loading = false }) => {
  if (loading) {
    return (
      <div className="flex gap-4 px-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-[230px] h-[390px] rounded-2xl" />
        ))}
      </div>
    );
  }

  const mappedProducts = data.map((p) => {
    const mrp = p.mrp || 0;
    const sp = p.sellingPrice || 0;

    return {
      id: p._id,
      name: p.productName || "Unnamed",
      weight: p.weight || "1 unit",
      store: p.brand || "Unknown",
      discount: mrp && sp ? Math.round(((mrp - sp) / mrp) * 100) : 0,
      mrp: mrp,
      price: sp,
      image: p.images?.[0] || "/fallback.png",
      time: p.dealEndTime || null,
    };
  });

  return (
    <div className="py-6">
      <Carousel className="w-full mx-auto">
        <CarouselContent className="-ml-4 pr-[12%]">
          {mappedProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-[16.66%] flex-shrink-0"
            >
              <div className="p-1">
                {/* <CategoryCard
                  image={product.image}
                  name={product.name}
                  weight={product.weight}
                  store={product.store}
                  discount={product.discount}
                  mrp={product.mrp}
                  price={product.price}
                  time={product.time}
                /> */}

                <CategoryCard {...product} />
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

export default CategoryCarousel;

// "use client";

// import { useEffect, useState } from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "../ui/carousel";
// import CategoryCard from "./CategoryCard";

// const CategoryCarousel = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true); // Optional: For loading state
//   const [error, setError] = useState(null);     // Optional: For error handling

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("/api/v1/catProd");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setProducts(data);
//       } catch (err) {
//         console.error("Failed to fetch products:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-6">Loading products...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-6 text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="py-6">
//       <Carousel className="w-full mx-auto">
//         <CarouselContent className="-ml-4 pr-[12%]">
//           {products.map((product) => (
//             <CarouselItem
//               key={product.id}
//               className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-[16.66%] flex-shrink-0"
//             >
//               <div className="p-1">
//                 <CategoryCard
//                   image={product.image}
//                   name={product.name}
//                   weight={product.weight}
//                   store={product.store}
//                   discount={product.discount}
//                   mrp={product.mrp}
//                   price={product.price}
//                   time={product.time}
//                   id={product.id}
//                 />
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

// export default CategoryCarousel;

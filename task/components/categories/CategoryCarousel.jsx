"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import CategoryCard from "./CategoryCard";


// Sample category products
const categoryProducts = [
  {
    id: 801,
    name: "Fresh Pear",
    weight: "100 g",
    store: "Nature's Basket",
    discount: "20",
    mrp: "165",
    price: "100",
    time: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
    image: "/categories/pear.png",
  },
  {
    id: 802,
    name: "Gooseberry",
    weight: "100 g",
    store: "Nature's Basket",
    discount: "20",
    mrp: "165",
    price: "100",
    time: Date.now() + 12 * 60 * 60 * 1000,  
    image: "/categories/gooseberry.png",
  },
  {
    id: 803,
    name: "Beetroot",
    weight: "100 g",
    store: "Nature's Basket",
    discount: "20",
    mrp: "165",
    price: "100",
    time: Date.now() + 12 * 60 * 60 * 1000,  
    image: "/categories/beetroot.png",
  },
  {
    id: 804,
    name: "Exotic Brinjal",
    weight: "100 g",
    store: "Nature's Basket",
    discount: "20",
    mrp: "165",
    price: "100",
    time: Date.now() + 12 * 60 * 60 * 1000, 
    image: "/categories/brinjal.png",
  },
  {
    id: 805,
    name: "Custard Apple",
    weight: "100 g",
    store: "Nature's Basket",
    discount: "20",
    mrp: "165",
    price: "100",
    time: Date.now() + 12 * 60 * 60 * 1000, 
    image: "/categories/custardapple.png",
  },
  {
    id: 806,
    name: "Mango",
    weight: "100 g",
    store: "Nature's Basket",
    discount: "20",
    mrp: "165",
    price: "100",
    time: Date.now() + 12 * 60 * 60 * 1000, 
    image: "/categories/mangoes.png",
  },
];

const CategoryCarousel = () => {
  return (
    <div className="py-6">
      <Carousel className="w-full mx-auto">
        <CarouselContent className="-ml-4">
          {categoryProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/5 flex-shrink-0"
            >
              <div className="p-1">
                <CategoryCard
                  image={product.image}
                  name={product.name}
                  weight={product.weight}
                  store={product.store}
                  discount={product.discount}
                  mrp={product.mrp}
                  price={product.price}
                  time={product.time}
                />
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

"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ProCard from "./SecProductCard";

const products = [
  {
    id: 1,
    imageSrc: "/grocery/broccoli.png",
    name: "Broccoli",
    price: "100",
    stockStatus: "Few stock left",
  },
  {
    id: 2,
    imageSrc: "/grocery/broccoli.png",
    name: "Apple",
    price: "150",
    stockStatus: "In stock",
  },
  {
    id: 3,
    imageSrc: "/grocery/broccoli.png",
    name: "Carrot",
    price: "80",
    stockStatus: "Few stock left",
  },
  {
    id: 4,
    imageSrc: "/grocery/broccoli.png",
    name: "Tomato",
    price: "60",
    stockStatus: "In stock",
  },
  {
    id: 5,
    imageSrc: "/grocery/broccoli.png",
    name: "Milk",
    price: "50",
    stockStatus: "Limited stock",
  },
  {
    id: 6,
    imageSrc: "/grocery/broccoli.png",
    name: "Banana",
    price: "120",
    stockStatus: "Fresh stock",
  },
  {
    id: 7,
    imageSrc: "/grocery/broccoli.png",
    name: "Orange",
    price: "130",
    stockStatus: "In stock",
  },
  {
    id: 8,
    imageSrc: "/grocery/broccoli.png",
    name: "Onion",
    price: "90",
    stockStatus: "Few stock left",
  },
  {
    id: 9,
    imageSrc: "/grocery/broccoli.png",
    name: "Grapes",
    price: "200",
    stockStatus: "Fresh stock",
  },
  {
    id: 10,
    imageSrc: "/grocery/broccoli.png",
    name: "Potato",
    price: "40",
    stockStatus: "In stock",
  },
  {
    id: 11,
    imageSrc: "/grocery/broccoli.png",
    name: "Pineapple",
    price: "250",
    stockStatus: "Limited stock",
  },
  {
    id: 12,
    imageSrc: "/grocery/broccoli.png",
    name: "Watermelon",
    price: "300",
    stockStatus: "Fresh stock",
  },
];

const SecondCarousel = () => {
  return (
    <div className="py-6">
      <Carousel className="w-full mx-auto">
        <CarouselContent className="-ml-4 ">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-[18.5%] flex-shrink-0"
            >
              <div className="p-1">
                <ProCard
                  imageSrc={product.imageSrc}
                  name={product.name}
                  price={product.price}
                  stockStatus={product.stockStatus}
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

export default SecondCarousel;

"use client";

import Image from "next/image";
import { useRef } from "react";

const ProductCarousel = ({ title, products }) => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>

      <div className="relative">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          ◀
        </button>

        {/* Product Cards */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto space-x-6 p-4 scrollbar-hide"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[250px] p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={150}
                className="w-full h-[150px] object-contain"
              />
              <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.weight}</p>
              <p className="text-sm text-gray-500">By {product.store}</p>

              {/* Discount Timer */}
              <div className="text-center my-2 text-blue-600">
                03 : 01 : 23 <span className="text-xs text-gray-600">hours minutes seconds</span>
              </div>

              <p className="text-green-500 font-semibold">{product.discount}</p>
              <p className="text-lg font-bold">
                MRP: <span className="line-through text-gray-500">₹{product.originalPrice}</span> ₹{product.price}
              </p>

              <button className="mt-2 w-full border border-blue-500 text-blue-500 font-bold py-1 rounded-md hover:bg-blue-100">
                ADD
              </button>
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;

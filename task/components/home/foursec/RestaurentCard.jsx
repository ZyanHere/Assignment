"use client";
import { useState } from "react";
import Image from "next/image";

const RestaurantCard = ({ img, name, rating, time, price, category, index }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = () => {
    setFavorites((prev) => {
      const updatedFavorites = [...prev];
      updatedFavorites[index] = !updatedFavorites[index];
      return updatedFavorites;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
      <div className="relative">
        <Image
          src={img}
          alt={name}
          width={300}
          height={200}
          className="w-full h-40 object-cover rounded-lg"
        />
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={toggleFavorite}
        >
          <Image
            src={favorites[index] ? "/home/shops/Heart-red.svg" : "/home/shops/Heart.svg"}
            alt="Favorite"
            width={32}
            height={32}
          />
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{category}</p>
        <div className="flex justify-between items-center mt-2 text-gray-700">
          <span className="text-sm">⭐ {rating}</span>
          <span className="text-sm">⏳ {time}</span>
          <span className="text-sm font-semibold">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;

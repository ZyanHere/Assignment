"use client";
import { useState } from "react";

const stores = [
  {
    img: "/home/shops/pantaloons.png",
    name: "Pantaloons",
    distance: "1 Km",
    location: "Pimple Saudagar",
    rating: "4.9",
  },
  {
    img: "/home/shops/basket.png",
    name: "Nature's Basket",
    distance: "1 Km",
    location: "Pimple Saudagar",
    rating: "4.9",
  },
  {
    img: "/home/shops/metro.png",
    name: "Metro",
    distance: "2 Km",
    location: "Pimple Saudagar",
    rating: "4.9",
  },
];

const NearbyStores = () => {
  const [favorites, setFavorites] = useState(Array(stores.length).fill(false));

  const toggleFavorite = (index) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites];
      newFavorites[index] = !newFavorites[index];
      return newFavorites;
    });
  };

  return (
    <section className="p-4 md:p-6 mt-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-black">
        Shops from nearby stores
      </h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {stores.map((store, index) => (
          <div key={index} className="w-full rounded-lg shadow-md overflow-hidden">
            <div className="relative ">
              <img
                src={store.img}
                alt={store.name}
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full">
                <img
                  src="/home/shops/star.svg"
                  alt="Star"
                  className="w-4 h-4"
                />
                <span className="text-sm font-semibold">{store.rating}</span>
              </div>
              <button
                onClick={() => toggleFavorite(index)}
                className="absolute top-3 right-3"
              >
                <img
                  src={
                    favorites[index]
                      ? "/home/shops/Heart-red.svg"
                      : "/home/shops/Heart.svg"
                  }
                  alt="Favorite"
                  className="w-8 h-8"
                />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-black">{store.name}</h3>
              <p className="text-gray-600 text-sm">
                {store.distance} • {store.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NearbyStores;

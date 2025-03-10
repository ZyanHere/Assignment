"use client";
import { useState } from "react";

const stores = [
  {
    img: "/shops/pantaloons.png",
    name: "Pantaloons",
    distance: "1 Km",
    location: "Pimple Saudagar",
    rating: "4.9",
  },
  {
    img: "/shops/basket.png",
    name: "Nature's Basket",
    distance: "1 Km",
    location: "Pimple Saudagar",
    rating: "4.9",
  },
  {
    img: "/shops/metro.png",
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
    <section className="p-6 mt-4">
      <h2 className="text-2xl font-semibold mb-6 text-black">
        Shops from nearby stores
      </h2>
      <div className="ml-24 mr-24 flex justify-between">
        {stores.map((store, index) => (
          <div key={index} className="w-[345px] bg-white rounded-lg shadow-md">
            <div className="relative">
              <img
                src={store.img}
                alt={store.name}
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full">
                <img src="/shops/star.svg" alt="Star" className="w-4 h-4" />
                <span className="text-sm font-semibold">{store.rating}</span>
              </div>
              <button
                onClick={() => toggleFavorite(index)}
                className="absolute top-3 right-3"
              >
                <img
                  src={
                    favorites[index] ? "/shops/Heart-red.svg" : "/shops/Heart.svg"
                  }
                  alt="Favorite"
                  className="w-6 h-6"
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

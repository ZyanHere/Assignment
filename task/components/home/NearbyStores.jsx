"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// const stores = [
//   {
//     id: "pantaloons",
//     img: "/home/shops/pantaloons.png",
//     name: "Pantaloons",
//     distance: "1 Km",
//     location: "Pimple Saudagar",
//     rating: "4.9",
//   },
//   {
//     id: "natures-basket",
//     img: "/home/shops/basket.png",
//     name: "Nature's Basket",
//     distance: "1 Km",
//     location: "Pimple Saudagar",
//     rating: "4.9",
//   },
//   {
//     id: "metro",
//     img: "/home/shops/metro.png",
//     name: "Metro",
//     distance: "2 Km",
//     location: "Pimple Saudagar",
//     rating: "4.9",
//   },
// ];

const NearbyStores = ({stores = []}) => {
  // const [favorites, setFavorites] = useState(() =>
  //   stores.reduce((acc, store) => ({ ...acc, [store.id]: false }), {})
  // );

  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const initialFavorites = stores.reduce((acc, store) => {
      acc[store._id] = false;
      return acc;
    }, {});
    setFavorites(initialFavorites);
  }, [stores]);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  if (!stores.length) return null;

  return (
    <section className="p-4 md:p-6 mt-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-black">
        Shops from nearby stores
      </h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center flex-wrap">
        {stores.map((store) => (
          <div
            key={store._id}
            className="w-full md:w-[300px] rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <Image
                src={store.images?.[0] || "/fallback.png"}
                alt={store.name}
                width={400}
                height={200}
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full">
                <Image
                  src="/home/shops/star.svg"
                  alt="Star"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span className="text-sm font-semibold">4.9</span>
              </div>
              <button
                onClick={() => toggleFavorite(store._id)}
                className="absolute top-3 right-3"
              >
                <Image
                  src={
                    favorites[store._id]
                      ? "/home/shops/Heart-red.svg"
                      : "/home/shops/Heart.svg"
                  }
                  alt="Favorite"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-black">{store.name}</h3>
              <p className="text-gray-600 text-sm">{store.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NearbyStores;
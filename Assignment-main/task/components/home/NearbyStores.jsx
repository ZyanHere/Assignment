"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart } from 'lucide-react';
import useSWR from "swr";
import { useState } from "react";

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
const fetcher = (url) => fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}
).then((res) => res.json()).then((json) => json.data);

const NearbyStores = () => {
  // const [favorites, setFavorites] = useState(() =>
  //   stores.reduce((acc, store) => ({ ...acc, [store.id]: false }), {})
  // );

  const { data, error } = useSWR(`https://lmd-user-2ky8.onrender.com/lmd/api/v1/retail/vendor/public`, fetcher);

  const [favorites, setFavorites] = useState({});

  // useEffect(() => {
  //   const initialFavorites = stores.reduce((acc, store) => {
  //     acc[store._id] = false;
  //     return acc;
  //   }, {});
  //   setFavorites(initialFavorites);
  // }, [stores]);

  // const toggleFavorite = (id) => {
  //   setFavorites((prevFavorites) => ({
  //     ...prevFavorites,
  //     [id]: !prevFavorites[id],
  //   }));
  // };

  //if (!stores.length) return null;

  const handleFavorite = (id) => {

    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  }

  return (
    <section className="p-4 md:p-6 mt-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-black">
        Shops from nearby stores
      </h2>
      <Carousel className="w-full" opts={{ align: "start", loop: false, dragFree: true, }}>
        <CarouselContent className="-ml-4 md:-ml-6">

          {data?.map((store) => (
            <CarouselItem
              key={store._id}
              className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3"
            >
              <div
                className="w-full md:w-[400px] rounded-lg shadow-md overflow-hidden border"
              >
                <div className="relative">
                  <Image
                    src={store.images?.[0] || "/fallback.png"}
                    alt={store.store_name}
                    width={400}
                    height={200}
                    className="w-full h-[200px] object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/20 text-white px-2 py-1 rounded-2xl">
                    <Image
                      src="/home/shops/star.svg"
                      alt="Star"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-semibold">{store.rating}</span>
                  </div>
                  <button
                    className="absolute top-3 right-3 bg-black/20 rounded-full p-2 hover:bg-black/40 transition"
                    onClick={() => handleFavorite(store._id)}
                  >
                    <Heart className={favorites[store._id] ? 'fill-red-500' : 'text-white'} />
                  </button>

                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-black">{store.store_name}</h3>
                  <p className="text-gray-600 text-sm">{store.city}</p>
                </div>
              </div>
            </CarouselItem>

          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-black/10" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/10" />

      </Carousel>

    </section>
  );
};

export default NearbyStores;
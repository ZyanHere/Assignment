"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart } from "lucide-react";
import useSWR from "swr";
import { useState } from "react";
import { fetcher } from "@/lib/api";

const NearbyStores = () => {
  const { data: storeResponse, error } = useSWR(
    `/lmd/api/v1/retail/vendor/public`,
    fetcher
  );

  const stores = storeResponse?.data || [];
  const [favorites, setFavorites] = useState({});

  const handleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="p-4 md:p-6 mt-4">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-black">
        Shops from nearby stores
      </h2>

      <Carousel
        className="w-full overflow-x-visible"
        opts={{ align: "start", loop: false, dragFree: true }}
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {stores?.map((store) => {
            const imageUrl =
              store.images?.carousel?.[0] ||
              store.carouselUrls?.[0] ||
              "/fallback.png";

            return (
              <CarouselItem
                key={store._id}
                className="basis-[100%] sm:basis-[48%] md:basis-[33.33%] lg:basis-[23%]"
              >
                <div className="w-full h-[300px] md:h-[320px] lg:h-[340px] rounded-lg shadow-md overflow-hidden border bg-white">
                  <div className="relative">
                    <Image
                      src={imageUrl}
                      alt={store.store_name || "Store image"}
                      width={400}
                      height={200}
                      className="w-full h-[200px] object-cover rounded-t-lg"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/30 text-white px-2 py-1 rounded-2xl">
                      <Image
                        src="/home/shops/star.svg"
                        alt="Star"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-semibold">
                        {store.rating ?? "0.0"}
                      </span>
                    </div>
                    <button
                      className="absolute top-3 right-3 bg-black/20 rounded-full p-2 hover:bg-black/40 transition"
                      onClick={() => handleFavorite(store._id)}
                      aria-label="Toggle favorite"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites[store._id]
                            ? "fill-red-500 text-red-500"
                            : "text-white"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="h-[40%] p-4">
                    <h3 className="text-lg font-semibold text-black truncate">
                      {store.store_name || "Unnamed Store"}
                    </h3>
                    <p className="text-gray-600 text-sm">{store.city || "—"}</p>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-black/10 hover:bg-black/20" />
        <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-black/10 hover:bg-black/20" />
      </Carousel>
    </section>
  );
};

export default NearbyStores;

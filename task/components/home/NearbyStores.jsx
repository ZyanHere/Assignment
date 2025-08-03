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
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const NearbyStores = () => {
  const { data: storeResponse } = useSWR(
    ["/lmd/api/v1/retail/vendor/public", false],
    ([url, withCredentials]) => fetcher(url, withCredentials)
  );

  const stores = storeResponse?.data || [];
  const [favorites, setFavorites] = useState({});
  const router = useRouter();

  const handleFavorite = (e, id) => {
    e.stopPropagation(); // Prevent route change
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="px-0 md:px-6 mt-4">
      <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-6 text-black px-4 md:px-0">
        Shops from nearby stores
      </h2>

      <Carousel
        className="w-full overflow-x-visible"
        opts={{ align: "start", loop: false, dragFree: true }}
      >
        <CarouselContent className="-ml-4 md:-ml-6 flex gap-3 md:gap-4">
          {stores?.map((store) => {
            const imageUrl =
              store?.images?.carousel?.[0] ||
              store?.carouselUrls?.[0] ||
              "/fallback.png";

            return (
              <CarouselItem
                key={store._id}
                className="basis-[85vw] sm:basis-[48%] md:basis-[33.33%] lg:basis-[23%] max-w-[90vw] sm:max-w-none transition-transform hover:scale-[1.01] duration-300"
                onClick={() => router.push(`/stores/${store.vendor_id}`)}
              >
                <div className="w-full h-[220px] sm:h-[300px] md:h-[320px] lg:h-[340px] rounded-xl shadow-md overflow-hidden border bg-white flex flex-col">
                  {/* Store Image */}
                  <div className="relative h-[130px] sm:h-[200px]">
                    <Image
                      src={imageUrl}
                      alt={store.store_name || "Store image"}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover rounded-t-xl"
                      loading="lazy"
                    />

                    {/* Rating Badge */}
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/40 text-white px-2 py-1 rounded-2xl text-xs sm:text-sm">
                      <Image
                        src="/home/shops/star.svg"
                        alt="Star"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                      <span className="font-semibold">
                        {store.rating ?? "0.0"}
                      </span>
                    </div>

                    {/* Wishlist Icon */}
                    <button
                      className="absolute top-2 right-2 bg-black/30 rounded-full p-2 hover:bg-black/50 transition"
                      onClick={(e) => handleFavorite(e, store._id)}
                      aria-label="Toggle favorite"
                    >
                      <Heart
                        className={cn(
                          "w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200",
                          favorites[store._id]
                            ? "fill-red-500 text-red-500"
                            : "text-white"
                        )}
                      />
                    </button>
                  </div>

                  {/* Store Info */}
                  <div className="flex-1 p-3 sm:p-4 flex flex-col justify-center">
                    <h3 className="text-base sm:text-lg font-semibold text-black truncate">
                      {store.store_name || "Unnamed Store"}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1">
                      {store.city || "—"}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Navigation Arrows */}
        <div className="hidden md:block">
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-black/10 hover:bg-black/20" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-black/10 hover:bg-black/20" />
        </div>
      </Carousel>
    </section>
  );
};

export default NearbyStores;

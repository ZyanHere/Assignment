"use client";

import Image from "next/image";
import Link from "next/link";
import { useHome } from "@/lib/hooks/useHome";

const imageMap = {
  "fruits-and-vegetables": "fruits.png",
  "bakery-and-dairy": "Bakery & Dairy.png",
  "beverages": "Beverages.png",
  "pulses-and-grains": "Pulses & Grains.png",
  "gourmet-and-global": "Gourmet & Global.png",
  "snacks": "Snacks.png",
  "dessert": "Dessert.png",
  "coffee-essentials": "Coffee Essentials.png",
  "instant-noodles": "Instant Noodles.png",
  "frozen-food": "Frozen Food.png",
  "personal-care": "Personal Care.png",
  "oils-and-spices": "Oils & Spices.png",
  "home-care-and-hygiene": "Home Care & Hygiene.png",
  "bath-and-beauty": "Bath & Beauty.png",
  "makeup": "Makeup.png",
  "mens-care": "Men's Care.png",
  "baby-care": "Baby Care.png",
  "cleaning-and-household": "Cleaning & Household.png",
  "kitchenware-and-appliances": "Kitchenware & Appliances.png",
  "frozen-desserts": "Frozen Desserts.png",
  "fashion": "Fashion.png",
  "apparel": "Apparel.png",
  "electronics": "Electronics.png",
  "furniture": "Furniture.png",
};

const Essentials = () => {
  const { categories, categoriesLoading, categoriesError } = useHome();

  if (categoriesLoading) {
    return (
      <section className="px-4 sm:px-6 py-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
          Daily Essentials
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full max-w-[110px] h-[100px] sm:h-[110px] bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="mt-3 h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (categoriesError) {
    return (
      <section className="px-4 sm:px-6 py-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
          Daily Essentials
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm sm:text-base">
            Failed to load categories. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 py-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
        Daily Essentials
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6">
        {categories.map((category, index) => {
          const slug = category.slug;
          const name = category.name;
          const imageFile = imageMap[slug] || "fallback.png";

          return (
            <Link
              key={category._id || index}
              href={`/categories/${slug}`}
              className="group flex flex-col items-center text-center transition-all"
            >
              <div className="bg-blue-100 border border-gray-200 p-3 rounded-xl w-full max-w-[120px] h-[110px] sm:h-[120px] flex items-center justify-center shadow-sm hover:shadow-md hover:border-gray-300 hover:-translate-y-1 transition-all duration-300">
              <div className="relative w-20 h-20">
                <Image
                  src={`/home/essentials/${imageFile}`}
                  alt={name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
                </div>
              </div>
              <span className="mt-2 text-xs sm:text-sm md:text-base font-medium text-gray-800 group-hover:text-black transition-colors duration-300 line-clamp-2">
                {name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Essentials;

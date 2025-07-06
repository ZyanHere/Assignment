"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = "https://lmd-user-2ky8.onrender.com/lmd/api/v1/retail/categories";

// Optional map if API names don't match image filenames exactly
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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: {

          },
        });
        const json = await res.json();
        setCategories(json?.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center py-6">Loading essentials...</div>;
  }

  return (
    <section className="px-4 sm:px-6 py-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-black pl-2 sm:pl-4">
        Daily Essentials
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
        {categories.map((category, index) => {
          const slug = category.slug;
          const name = category.name;
          const imageFile = imageMap[slug] || "fallback.png";
          return (
            <Link
              key={index}
              href={`/categories/${slug}`}
              className="flex flex-col items-center text-center p-1 min-w-0"
            >
              <div className="bg-gradient-to-br from-blue-200 to-yellow-50 p-2 rounded-lg w-full max-w-[110px] h-[100px] sm:h-[110px] flex items-center justify-center shadow-md cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
                <Image
                  src={`/home/essentials/${imageFile}`}
                  alt={name}
                  width={65}
                  height={65}
                  className="object-contain"
                />
              </div>
              <span className="mt-2 text-xs sm:text-sm md:text-base font-medium text-black text-center leading-snug line-clamp-2">
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

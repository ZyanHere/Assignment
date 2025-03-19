"use client";

import Image from "next/image";
import Link from "next/link";

const CategoryFooter = () => {
  return (
    <div className="grid grid-cols-[500px_1000px] gap-0 w-[1500px] h-[500px] mx-auto">
      {/* Left Banner (500x500) */}
      <div className="flex justify-center items-center w-[500px] h-[500px]">
        <Link href="/categories/vegetables">
          <Image
            src="/categories/footer/Vegetable Banner.png"
            alt="Fresh Vegetables - Big Sale"
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-md cursor-pointer hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      {/* Right Side (1000x500 - Two Stacked Banners) */}
      <div className="flex flex-col w-[1000px] h-[500px]">
        <Link href="/categories/fruits">
          <Image
            src="/categories/footer/Fruit Banner.png"
            alt="Fresh Fruit Super Sale"
            width={1000}
            height={250}
            className="w-full h-[250px] object-cover cursor-pointer hover:scale-105 transition-transform"
          />
        </Link>

        <Link href="/categories/drinks">
          <Image
            src="/categories/footer/Drink Banner.png"
            alt="Up to 20% Discount on Fresh Drinks"
            width={1000}
            height={250}
            className="w-full h-[250px] object-cover cursor-pointer hover:scale-105 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
};

export default CategoryFooter;

"use client";
import Image from "next/image";
import Link from "next/link";

const CategoryFooter = () => {
  return (
    <div className="w-full h-auto px-4 md:px-6">
      <div className="w-full flex flex-col lg:flex-row gap-4 p-4 md:p-8">
        {/* Main Banner */}
        <Link href="/categories/vegetables" className="lg:w-1/3 aspect-square relative rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
          <Image
            src="/categories/footer/Vegetable Banner.png"
            alt="Fresh Vegetables - Big Sale"
            fill
            className="object-cover"
          />
        </Link>

        {/* Right Column */}
        <div className="lg:w-2/3 flex flex-col gap-4">
          <Link href="/categories/fruits" className="relative aspect-[4/1] rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
            <Image
              src="/categories/footer/Fruit Banner.png"
              alt="Fresh Fruit Super Sale"
              fill
              className="object-cover"
            />
          </Link>

          <Link href="/categories/drinks" className="relative aspect-[4/1] rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
            <Image
              src="/categories/footer/Drink Banner.png"
              alt="Up to 20% Discount on Fresh Drinks"
              fill
              className="object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryFooter;

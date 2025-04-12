import Image from "next/image";
import { BannerHeader } from "./BannerHeader";

export const GroceryBanner = () => {
  return (
    <div className="banner-container">
      <BannerHeader />
      <div className="relative w-full h-[220px] md:h-[240px] overflow-hidden rounded-xl">
        <Image
          src="/home/grocery/grocery-banner.png"
          alt="Fresh Groceries Banner"
          className="w-full h-full object-fill rounded-xl"
          fill={false}
          width={0}
          height={0}
          sizes="100vw"
          priority
        />
      </div>
    </div>
  );
};

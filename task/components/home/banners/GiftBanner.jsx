import Image from "next/image";
import { BannerHeader } from "./BannerHeader";

export const GiftBanner = () => {
  return (
    <div className="banner-container">
      <BannerHeader />
      <div className="relative w-full h-[180px] md:h-[200px] overflow-hidden rounded-xl">
        <Image
          src="/home/banners/GiftBanner.png"
          alt="Gift Banner"
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

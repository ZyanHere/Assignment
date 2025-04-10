import { BannerHeader } from "./BannerHeader";

export const CareBanner = () => {
  return (
    <div className="banner-container">
      <BannerHeader />
      <div className="banner-content h-[180px] md:h-[200px] bg-gray-100 rounded-xl">
        {/* Add your care-specific content here */}
      </div>
    </div>
  );
};
import { BannerHeader } from "./BannerHeader";

export const ApprelsBanner = () => {
  return (
    <div className="banner-container">
      <BannerHeader />
      <div className="banner-content h-[180px] md:h-[200px] bg-gray-100 rounded-xl">
        {/* Add your apparel-specific content here */}
      </div>
    </div>
  );
};
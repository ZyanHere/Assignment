import Image from "next/image";
import BrandCarousel from "./BrandCarousel";
import Essentials from "./Essentials";
import FourSec from "./FourSec";
import NearbyStores from "./NearbyStores";

const AllTab = () => {
  return (
    <>
      {/* Hero Image Section */}
      <div
        className="rounded-lg overflow-hidden bg-cover bg-center m-[20px_21px]"
        style={{ backgroundImage: "url(/assets/banner-bg.png)" }}
      >
        <Image src="/assets/hero_banner.svg" alt="Hero Banner" width={100} height={100} className="w-full " />
      </div>

      <div className="pl-6 w-full">
        <section className="bg-white shadow-sm w-full p-5">
          <h2 className="text-lg font-semibold mb-5 text-black">Few minutes left...</h2>
          <FourSec />
        </section>
      </div>

      {/* ✅ Brand Carousel - Fixed Layout Issues ✅ */}
      <div className="pl-6 w-full mt-5">
        <section className="bg-white shadow-sm w-full ">
          <h2 className="text-lg font-bold mb-3 text-black">Top brands last minutes deal</h2>
          <div className="w-full max-w-[1500px] mx-auto">
            <BrandCarousel />
          </div>
        </section>
      </div>

      <Essentials />

      <div className="pl-6 w-full">
        <section className="bg-white w-full p-5">
          <h2 className="text-lg font-semibold mb-8 text-black">Let's step out</h2>
          <FourSec />
        </section>
      </div>

      <div className="mt-15 flex justify-center gap-8">
        <Image src="/banners/banner1.png" alt="Banner1" width={450} height={200} />
        <Image src="/banners/banner2.png" alt="Banner2" width={450} height={200} />
        <Image src="/banners/banner3.png" alt="Banner3" width={450} height={200} />
      </div>

      <div className="pl-6 w-full mt-12 ">
        <section className="bg-white shadow-sm w-full ">
          <h2 className="text-lg font-bold mb-3 text-black">Few minutes left...</h2>
          <div className="w-full max-w-[1500px] mx-auto">
            <BrandCarousel />
          </div>
        </section>
      </div>

      <NearbyStores />
    </>
  );
};

export default AllTab;

import HeroBanner from "@/app/components/CustomComponents/HeroBannerCarousel";
import Banner from "@/app/components/CustomComponents/Banner";
import FashionCarousel from "./FashionCarousel";
const FashionTabContent = () => {

  return (
    <div className="p-6 lg:px-16">

      <div className=" w-full ">
        <h3 className="text-3xl font-bold mb-3">Most Popular</h3>
        <section className=" w-full ">
          <div className="w-full max-w-[1500px] mx-auto">
            <FashionCarousel category="MostPopular" />
          </div>
        </section>
      </div>

      <div className=" w-full mt-16">
        <h3 className="text-3xl font-bold mb-3">Just For You</h3>
        <section className=" w-full ">
          <div className="w-full max-w-[1500px] mx-auto">
            <FashionCarousel category="ForYou" />
          </div>
        </section>
      </div>

      <div className="mt-24 px-4 lg:px-10">
        <Banner />
      </div>

    </div>
  );
};

export default FashionTabContent;

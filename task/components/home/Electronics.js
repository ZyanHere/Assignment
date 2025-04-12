import ElecBanner from "@/app/components/CustomComponents/ElecBanner";
import ElectronicsCarousel from "./ElectronicsCarousel";
import ElecHeroBanner from "@/app/components/CustomComponents/ElecHeroBanner";
const ElectronicTabContent = () => {

  return (
    <div className="p-6">
      <div className=" w-full ">
        <h3 className="text-3xl font-bold text-gray-800 mb-3">Most Popular</h3>
        <section className=" w-full ">
          <div className="w-full max-w-[1500px] mx-auto">
          <ElectronicsCarousel category="MostPopular" />
          </div>
        </section>
      </div>

      <div className=" w-full mt-16">
        <h3 className="text-3xl font-bold text-gray-800 mb-3">Just For You</h3>
        <section className=" w-full ">
          <div className="w-full max-w-[1500px] mx-auto">
          <ElectronicsCarousel category="ForYou" />
          </div>
        </section>
      </div>

      <div className=" w-full mt-16">
        <section className=" w-full ">
          <div className="w-full max-w-[1500px] mx-auto">
          <ElectronicsCarousel category="ForYou" reverse/>
          </div>
        </section>
      </div>

      {/* <div className="mt-30">
        <ElecBanner/>
      </div> */}
      
    </div>
  );
};

export default ElectronicTabContent;

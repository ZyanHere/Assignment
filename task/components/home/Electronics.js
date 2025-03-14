import SecondCarousel from "./secondCarousel";
import Banner from "@/app/components/CustomComponents/Banner";
const ElectronicTabContent = () => {

  return (
    <div className="p-6">
      <Banner />

      <div className=" w-full mt-15">
        <h3 className="text-3xl font-bold text-gray-800 mb-3">Most Popular</h3>
        <section className="bg-white shadow-sm w-full ">
          <div className="w-full max-w-[1500px] mx-auto">
            <SecondCarousel />
          </div>
        </section>
      </div>

      <div className=" w-full mt-15">
        <h3 className="text-3xl font-bold text-gray-800 mb-3">Just For You</h3>
        <section className="bg-white shadow-sm w-full ">
          <div className="w-full max-w-[1500px] mx-auto">
            <SecondCarousel />
          </div>
        </section>
      </div>

      <div className=" w-full mt-15">
        <section className="bg-white shadow-sm w-full ">
          <div className="w-full max-w-[1500px] mx-auto">
            <SecondCarousel />
          </div>
        </section>
      </div>

      <div className="mt-30">
        <Banner/>
      </div>
      
    </div>
  );
};

export default ElectronicTabContent;

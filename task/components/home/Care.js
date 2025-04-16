import Banner from "@/app/components/CustomComponents/Banner";
import FashionCarousel from "./FashionCarousel";
const CareTabContent = () => {

  return (
    <div className="p-6 lg:px-16">

      <div className=" w-full ">
        <section className=" w-full ">
          <div className="w-full max-w-[1500px] mx-auto">
            <FashionCarousel category="MostPopular" />
          </div>
        </section>
      </div>

      <div className=" w-full mt-16">
        <section className=" w-full ">
          <div className="w-full max-w-[1500px] mx-auto">
            <FashionCarousel category="ForYou" />
          </div>
        </section>
      </div>


    </div>
  );
};

export default CareTabContent;

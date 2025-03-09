import Header from "./components/header";
import Sidebar from "./components/sidebar";
import CategoryTabs from "./components/CategoryTabs";
import Essentials from "./components/Essentials";
import FourSec from "./components/FourSec";
import NearbyStores from "./components/NearbyStores";
import Footer from "./components/footer";



const Home = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        {/* Header */}
        <Header />

        <CategoryTabs />

        {/* Hero Image Section */}
        <div className="rounded-lg overflow-hidden bg-cover bg-center m-[20px_21px]"
          style={{ backgroundImage: "url(/assets/banner-bg.png)" }}>
          <img
            src="/assets/hero_banner.svg"
            alt="Hero Banner"
            className="w-full h-auto"
          />
        </div>

        <div className=" pl-6 w-full">
          <section className="bg-white shadow-sm  w-full p-5 ">
            <h2 className="text-lg font-semibold mb-5 text-black ">Few minutes left...</h2>
            <FourSec/>
          </section>
        </div>

        <Essentials/>

        <div className=" pl-6 w-full">
          <section className="bg-white shadow-sm  w-full p-5 ">
            <h2 className="text-lg font-semibold mb-8 text-black ">Let's step out</h2>
            <FourSec/>
          </section>
        </div>

        <NearbyStores/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;

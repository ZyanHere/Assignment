import Header from "./components/header";
import Sidebar from "./components/sidebar";


import CategoryTabs from "./components/CategoryTabs";


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
            <div className="flex gap-[85px] justify-center">
              {[
                { img: "/hero1/stay.png", label: "Stay" },
                { img: "/hero1/movie.png", label: "Movie" },
                { img: "/hero1/buffet.png", label: "Buffet" },
                { img: "/hero1/event.png", label: "Event" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-[291px] h-[244px]  bg-[#FFF8E1] flex flex-col items-center justify-center rounded-xl shadow-md"
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-[165px] h-[165px] mt-2 object-cover rounded-lg" />
                  <span className="font-semibold text-black pt-[27px]">{item.label}</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Home;

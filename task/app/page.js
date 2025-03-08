import Header from "./components/header";
import Sidebar from "./components/sidebar";
import CategoryTabs from "./components/CustomComponents/CategoryTabs";


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
        <div className="rounded-lg overflow-hidden bg-[#FFC440C7] m-[32px_21px]">
          <img 
            src="/assets/hero_banner.svg" 
            alt="Hero Banner" 
            className="w-full h-auto" 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

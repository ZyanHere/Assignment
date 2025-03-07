import Header from "./components/header";
import Sidebar from "./components/sidebar";


const Home = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        {/* Header */}
        <Header />

        {/* Other Homepage Content */}
        <div className="p-6">Your Homepage Content Here...</div>
      </div>
    </div>
  );
};

export default Home;

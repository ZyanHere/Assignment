"use client";

import { useState } from "react";

import Sidebar from "@/components/home/sidebar";
import Header from "@/components/home/Header";
import CategoryTabs from "@/components/home/CategoryTabs";
import Footer from "@/components/home/footer";
import GroceryTabContent from "@/components/home/GroceryTab";
import FashionTabContent from "@/components/home/FashionTab";
import AllTabContent from "@/components/home/AllTab";
import { Divide } from "lucide-react";

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("all");

  const renderTab = () => {
    switch (selectedTab) {
      case "all":
        return <AllTabContent />;
      case "grocery":
        return <GroceryTabContent />;
      case "fashion":
        return <FashionTabContent />;
      default:
        return <AllTabContent />;
    }
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        {/* Header */}
        <Header />

        {/* this is state management */}
        <CategoryTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}/> 
        <div className="p-6">{renderTab()}</div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Home;

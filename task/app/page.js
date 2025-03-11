"use client";

import { useState } from "react";

import Sidebar from "@/components/home/sidebar";
import Header from "@/components/home/Header";
import CategoryTabs from "@/components/home/CategoryTabs";
import Footer from "@/components/home/footer";
import GroceryTabContent from "@/components/home/GroceryTab";
import FashionTabContent from "@/components/home/FashionTab";
import AllTabContent from "@/components/home/AllTab";

const Home = () => {
  // State to track selected tab
  const [selectedTab, setSelectedTab] = useState("all"); // Default tab: 'all'

  // Function to render the correct tab content
  const renderTabContent = () => {
    switch (selectedTab) {
      case "grocery":
        return <GroceryTabContent />;
      case "fashion":
        return <FashionTabContent />;
      // case "gift":
      //   return <GiftTabContent />;
      // case "electronics":
      //   return <ElectronicsTabContent />;
      default:
        return <AllTabContent />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        {/* Header */}
        <Header />

        {/* Category Tabs with State Management */}
        <CategoryTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {/* Render Content Based on Selected Tab */}
        <div className="p-6">{renderTabContent()}</div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;

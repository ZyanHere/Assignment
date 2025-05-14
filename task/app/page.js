"use client";

import { useState } from "react";

import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import GroceryTabContent from "@/components/home/GroceryTab";
import FashionTabContent from "@/components/home/FashionTab";
import AllTabContent from "@/components/home/AllTab";
import GiftTabContent from "@/components/home/GiftTab";
import ElectronicTabContent from "@/components/home/Electronics";
import LocationBanner from "@/components/home/banners/LocationBanner";
import CareTabContent from "@/components/home/Care";
import ApparelsTabContent from "@/components/home/Apparels";
import FruitsTabContent from "@/components/home/Fruits";

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
      case "gift":
        return <GiftTabContent />;
      case "electronics":
        return <ElectronicTabContent />;
      case "Personal Care":
        return <CareTabContent />;
      case "Apparels":
        return <ApparelsTabContent />;
      case "Fruits and Vegetables":
        return <FruitsTabContent />;
      default:
        return <AllTabContent />;
    }
  };

  return (
    <div className="flex-1 bg-white min-h-screen">
      <Header />
      <div className="mx-auto px-4 md:px-8 lg:px-16 xl:px-14">
        {/* Location and Promo Banner */}
        <LocationBanner selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="p-6">{renderTab()}</div>
      </div>
      <Footer />

    </div>
  );
};

export default Home;

"use client";

import React from "react";
import Image from "next/image";

import CategoryTabs from "../CategoryTabs";
import { AllTabBanner } from "./AllTabBanner";
import { GroceryBanner } from "./GroceryBanner";
import FashionBanner from "./FashionBanner";
import { GiftBanner } from "./GiftBanner";
import ElectronicBanner from "./ElectronicBanner";
import { CareBanner } from "./CareBanner";
import { ApprelsBanner } from "./ApprelsBanner";
import FruitsBanner from "./FruitsBanner";

const bannerComponents = {
  all: AllTabBanner,
  grocery: GroceryBanner,
  fashion: FashionBanner,
  gift: GiftBanner,
  electronics: ElectronicBanner,
  "Personal Care": CareBanner,
  Apprels: ApprelsBanner,
  "Fruits and Vegetables": FruitsBanner,
};

const LocationBanner = ({ selectedTab, setSelectedTab }) => {
  const BannerComponent = bannerComponents[selectedTab] || AllTabBanner;

  return (
    <div className="w-full px-4 md:px-8 pt-4">
      {/* Location */}
      

      {/* Dynamic Banner */}
      <BannerComponent />

      {/* Category Tabs (stay outside conditional logic to avoid re-render) */}
      <CategoryTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </div>
  );
};

export default LocationBanner;

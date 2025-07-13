"use client";

import React from "react";
import { useHome } from "@/lib/hooks/useHome";

import CategoryTabsRedux from "../CategoryTabsRedux";
import { GroceryBanner } from "./GroceryBanner";
import FashionBanner from "./FashionBanner";
import { GiftBanner } from "./GiftBanner";
import ElectronicBanner from "./ElectronicBanner";
import { CareBanner } from "./CareBanner";
import { ApprelsBanner } from "./ApprelsBanner";
import FruitsBanner from "./FruitsBanner";
import AllTabBanner from "./AllTabBanner";

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

const LocationBannerRedux = () => {
  const { selectedTab } = useHome();
  const BannerComponent = bannerComponents[selectedTab] || AllTabBanner;

  return (
    <div className="w-full px-0 md:px-4 lg:px-8 pt-4"> {/* px-0 for mobile, padding for md+ */}
      {/* Dynamic Banner */}
      <BannerComponent />

      {/* Category Tabs */}
      <CategoryTabsRedux />
    </div>
  );
};

export default LocationBannerRedux; 
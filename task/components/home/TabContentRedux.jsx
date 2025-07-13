"use client";

import React from "react";
import { useHome } from "@/lib/hooks/useHome";

import GroceryTabContent from "./GroceryTab";
import FashionTabContent from "./FashionTab";
import AllTabContentRedux from "./AllTabRedux";
import GiftTabContent from "./GiftTab";
import ElectronicTabContent from "./Electronics";
import CareTabContent from "./Care";
import ApparelsTabContent from "./Apparels";
import FruitsTabContent from "./Fruits";
import SubCategoriesRedux from "@/components/subcategories/SubCategoriesRedux";

const TabContentRedux = () => {
  const { 
    selectedTab, 
    allProducts, 
    allProductsLoading,
    productsByCategory,
    productsLoading
  } = useHome();

  const renderTab = () => {
    switch (selectedTab) {
      case "all":
        return <AllTabContentRedux products={allProducts} loading={allProductsLoading} />;
      default:
        return (
          <SubCategoriesRedux 
            categoryId={selectedTab} 
            products={productsByCategory[selectedTab] || []}
            loading={productsLoading[selectedTab] || false}
          />
        );
    }
  };

  return <div>{renderTab()}</div>;
};

export default TabContentRedux; 
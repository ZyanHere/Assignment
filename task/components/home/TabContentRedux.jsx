"use client";

import { useHome } from "@/lib/hooks/useHome";
import React from "react";

import SubCategoriesRedux from "@/components/subcategories/SubCategoriesRedux";
import AllTabContentRedux from "./AllTabRedux";

const TabContentRedux = () => {
  const {
    selectedTab,
    allProducts,
    allProductsLoading,
    productsByCategory,
    productsLoading,
  } = useHome();

  const renderTab = () => {
    switch (selectedTab) {
      case "all":
        return (
          <AllTabContentRedux
            products={allProducts}
            loading={allProductsLoading}
          />
        );
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

"use client";

import React from "react";
import Image from "next/image";

const categories = [
  { key: "all", label: "All", icon: "/home/assets/all_logo.svg" },
    { key: "grocery", label: "Grocery", icon: "/home/assets/grocery_logo.png" },
    { key: "fashion", label: "Fashion", icon: "/home/assets/fashion_logo.png" },
    { key: "gift", label: "Gift", icon: "/home/assets/gift_logo.png" },
    {
      key: "electronics",
      label: "Electronics",
      icon: "/home/assets/electronics_logo.png",
    },
  { key: "Personal Care", label: "Personal Care", icon: "/home/assets/gift_logo.png" },
  { key: "Apparels", label: "Apparels", icon: "/home/assets/fashion_logo.png" },
  { key: "Fruits and Vegetables", label: "Fruits and Vegetables", icon: "/home/assets/grocery_logo.png" },
  
];

const CategoryTabs = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="mt-6 overflow-x-auto no-scrollbar px-4 ">
      <div className="flex justify-between gap-4 ">
        {categories.map((category) => {
          const isActive = selectedTab === category.key;
          return (
            <button
              key={category.key}
              onClick={() => setSelectedTab(category.key)}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl min-w-[180px] transition-all duration-200
                ${isActive
                  ? "bg-gray-50 shadow-lg text-black border-2 border-black border-b-4 "
                  : "bg-gray-200 bg-gradient-to-r from-yellow-50 to- shadow-sm border-b border-yellow-500"
                }`}
            >
              <div className="w-8 h-8 relative ">
                <Image
                  src={category.icon}
                  alt={category.label}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium whitespace-nowrap">{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
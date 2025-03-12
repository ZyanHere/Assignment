import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "../ui/button";

const CategoryTabs = ({ selectedTab, setSelectedTab }) => {
  const categories = [
    { key: "all", name: "All", icon: "/assets/all_logo.svg" },
    { key: "grocery", name: "Grocery", icon: "/assets/grocery_logo.png" },
    { key: "fashion", name: "Fashion", icon: "/assets/fashion_logo.png" },
    { key: "gift", name: "Gift", icon: "/assets/gift_logo.png" },
    { key: "electronics", name: "Electronics", icon: "/assets/electronics_logo.png" },
  ];

  // Load selected category from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("activeCategory");
    if(stored){
      setSelectedTab(stored);
    }
  },[])
  // Save selected category to localStorage 
  useEffect(() => {
    localStorage.setItem("activeCategory", selectedTab);
  }, [selectedTab]);

  return (
    <div className="flex flex-col items-start gap-4 p-4">
      {/* Location */}
      <div className="flex items-center gap-2 text-lg font-semibold">
        <span className="text-black">ST Joseph Indian Composite</span>
        <Image src="/assets/Down.svg" alt="down Arrow" width={20} height={20} className="object-contain"/>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3" role="tablist">
  {categories.map((category) => (
    <button
      key={category.key}
      className={`flex flex-col justify-center items-center gap-[6px] h-[60px] px-4 py-[6px] rounded-[4px] text-sm font-medium transition-all border ${
        selectedTab === category.key
          ? "bg-gradient-to-t from-[#FAAD14] to-[#FFEA97] text-black shadow-[inset_-1px_0px_0px_0px_#FAAD14,inset_0px_1px_0px_0px_#FAAD14,inset_1px_0px_0px_0px_#FAAD14] scale-105"
          : "bg-[#FFF1B8] text-gray-700 hover:bg-yellow-300 border-transparent"
      }`}
      onClick={() => setSelectedTab(category.key)}
      role="tab"
      aria-selected={selectedTab === category.key}
    >
      <Image src={category.icon} alt={category.name} width={20} height={20} className="object-contain" />
      {category.name}
    </button>
  ))}
</div>

    </div>
  );
};

export default CategoryTabs;

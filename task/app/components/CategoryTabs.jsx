"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui2/button";

// const categories = ["All", "Grocery", "Fashion", "Gift", "Electronics"];

const categories = [
  { name: "All", icon: "/assets/all_logo.svg" },
  { name: "Grocery", icon: "/assets/grocery_logo.png" },
  { name: "Fashion", icon: "/assets/fashion_logo.png" },
  { name: "Gift", icon: "/assets/gift_logo.png" },
  { name: "Electronics", icon: "/assets/electronics_logo.png" },
];

export default function CategoryTabs() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex flex-col items-start gap-4 p-4">
      {/* Location Selector */}
      <div className="flex items-center gap-2 text-lg font-semibold">
        <span className="text-black">ST Joseph Indian Composite</span>
        <img src="/assets/Down.svg" alt="Down Arrow" className="w-5 h-5" />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-4 rounded-lg">
        {categories.map((category) => (
          <Button
            key={category.name}
            className={`flex items-center justify-center flex-col px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === category.name
                ? "bg-yellow-400 text-black"
                : "bg-[#FFF1B8] text-gray-700"
            }`}
            onClick={() => setActiveTab(category.name)}
          >
            <img src={category.icon} alt={category.name} className="w-5 h-5" />
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

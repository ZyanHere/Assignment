"use client";

import CategoryHeader from "@/components/categories/CategoryHeader";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";


const Categories = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Header />
        <CategoryHeader />
        
        <div className="p-6">
          <h2 className="text-xl font-semibold">Category Content</h2>
        </div>
      </div>
    </div>
  );
};

export default Categories;

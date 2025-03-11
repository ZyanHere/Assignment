import React from "react";

const CategoryTabs = ({ selectedTab, setSelectedTab }) => {
  const categories = [
    { key: "all", label: "All" },
    { key: "grocery", label: "Grocery" },
    { key: "fashion", label: "Fashion" },
    { key: "gift", label: "Gift" },
    { key: "electronics", label: "Electronics" },
  ];

  return (
    <div className="flex space-x-4 bg-white shadow-sm p-4 rounded-md mx-6 mt-4">
      {categories.map((category) => (
        <button
          key={category.key}
          className={`px-4 py-2 text-sm font-semibold rounded-md transition ${
            selectedTab === category.key
              ? "bg-yellow-400 text-black"
              : "bg-gray-200 text-gray-700 hover:bg-yellow-300"
          }`}
          onClick={() => setSelectedTab(category.key)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;

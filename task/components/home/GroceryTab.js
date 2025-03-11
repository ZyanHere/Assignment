import React from "react";

const GroceryTabContent = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-black mb-4">Grocery</h2>

      {/* Hero Banner */}
      <div className="bg-yellow-100 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold">20% off on your first purchase</h3>
      </div>

      {/* Vegetables Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Vegetables</h3>
        <div className="grid grid-cols-5 gap-4">
          {/* Sample Product Cards */}
          <div className="bg-white p-4 shadow-md rounded-lg">Broccoli</div>
          <div className="bg-white p-4 shadow-md rounded-lg">Carrots</div>
          <div className="bg-white p-4 shadow-md rounded-lg">Capsicum</div>
          <div className="bg-white p-4 shadow-md rounded-lg">Eggplant</div>
          <div className="bg-white p-4 shadow-md rounded-lg">Broccoli</div>
        </div>
      </div>

      {/* Drinks Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Drinks</h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-white p-4 shadow-md rounded-lg">Fritz-kola</div>
          <div className="bg-white p-4 shadow-md rounded-lg">Coca-cola</div>
          <div className="bg-white p-4 shadow-md rounded-lg">Bravo</div>
          <div className="bg-white p-4 shadow-md rounded-lg">Fanta</div>
          <div className="bg-white p-4 shadow-md rounded-lg">Fritz-kola</div>
        </div>
      </div>
    </div>
  );
};

export default GroceryTabContent;

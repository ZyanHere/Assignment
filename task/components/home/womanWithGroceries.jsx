import React from 'react';

const ExploreSection = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="bg-pink-50 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between min-h-72">
          {/* Left Content Section */}
          <div className="flex-1 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              There's more to explore
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem
            </p>
            <button className="bg-white hover:bg-gray-50 text-gray-800 px-6 py-2 rounded-full border border-gray-300 transition-colors duration-200 flex items-center gap-2 cursor-pointer">
              View more products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right Image Section */}
          <div className="w-[500px] h-[380px] pr-6">
            <img 
              src="/2bb1805c846c0354ff493b5c975e401b109c3dc1.png" 
              alt="Woman with groceries" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;

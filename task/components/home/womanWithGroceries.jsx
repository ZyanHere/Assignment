import React from 'react';

const ExploreSection = () => {
  return (

    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-pink-50 rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[250px] sm:min-h-[300px] md:min-h-[350px] xl:min-h-[500px]">
          {/* Left Content Section */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 xl:p-12 order-2 lg:order-1 flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
              There's more to explore
            </h2>
            <p className="text-gray-600 mb-6 lg:mb-8 text-sm sm:text-base lg:text-lg max-w-md lg:max-w-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem
            </p>
            <button className="bg-white hover:bg-gray-50 text-gray-800 px-6 lg:px-8 py-2 lg:py-3 rounded-full border border-gray-300 transition-colors duration-200 flex items-center gap-2 cursor-pointer w-fit font-medium">
              View more products
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right image */}
          <div className="flex-1 order-1 lg:order-2 relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px] xl:min-h-[500px]">
            <img 
              src="/2bb1805c846c0354ff493b5c975e401b109c3dc1.png" 
              alt="Woman with groceries" 
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center right'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
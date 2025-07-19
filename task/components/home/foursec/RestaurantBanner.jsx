import Image from "next/image";
// import { FaRegClock,FaCarAlt } from "react-icons/fa6"; // Import icons

const RestaurantBanner = ({ restaurant }) => {
  return (
    <div className="w-full mb-4 sm:mb-6">
      {/* Banner Image */}
      <div className="relative w-full">
        <Image
          src={restaurant.banner}
          alt={restaurant.name}
          width={1140}
          height={387}
          className="w-full h-32 sm:h-48 md:h-64 lg:h-80 object-cover rounded-b-3xl shadow-md"
          priority
        />
        
        {/* Favorite Icon (Heart) - Positioned Top Right */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white p-1 sm:p-2 rounded-full shadow-md">
          ❤️ {/* Replace with your favorite button logic */}
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="px-2 sm:px-6 pt-2 sm:pt-4">
        {/* Name */}
        <h2 className="text-lg sm:text-2xl font-bold">{restaurant.name}</h2>

        {/* Info Row */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
          {/* Delivery Time */}
          <div className="flex items-center text-gray-600">
            {/* <FaRegClock className="mr-2 text-lg" /> */}
            <span className="text-xs sm:text-sm">{restaurant.time} min</span>
          </div>

          {/* Rating */}
          <div className="flex items-center bg-gray-100 px-2 sm:px-3 py-1 rounded-lg shadow-sm">
            ⭐ <span className="ml-1 font-semibold text-xs sm:text-base">{restaurant.rating}</span>
          </div>

          {/* Distance */}
          <div className="flex items-center text-gray-600">
            {/* <FaCarAlt className="mr-2 text-lg"/> */}
            <span className="text-xs sm:text-sm">{restaurant.distance} Kč</span>
          </div>

          {/* Category */}
          <div className="bg-red-100 text-red-600 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm">
            {restaurant.category}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantBanner;

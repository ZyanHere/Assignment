import Image from "next/image";
// import { FaRegClock,FaCarAlt } from "react-icons/fa6"; // Import icons

const RestaurantBanner = ({ restaurant }) => {
  return (
    <div className="w-full mb-6">
      {/* Banner Image */}
      <div className="relative w-full">
        <Image
          src={restaurant.banner}
          alt={restaurant.name}
          width={1140}
          height={387}
          className="w-full h-auto rounded-b-4xl shadow-md"
          priority
        />
        
        {/* Favorite Icon (Heart) - Positioned Top Right */}
        <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
          ❤️ {/* Replace with your favorite button logic */}
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="px-6 pt-4">
        {/* Name */}
        <h2 className="text-2xl font-bold">{restaurant.name}</h2>

        {/* Info Row */}
        <div className="flex items-center gap-4 mt-2">
          {/* Delivery Time */}
          <div className="flex items-center text-gray-600">
            {/* <FaRegClock className="mr-2 text-lg" /> */}
            <span>{restaurant.time} min</span>
          </div>

          {/* Rating */}
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-lg shadow-sm">
            ⭐ <span className="ml-1 font-semibold">{restaurant.rating}</span>
          </div>

          {/* Distance */}
          <div className="flex items-center text-gray-600">
            {/* <FaCarAlt className="mr-2 text-lg"/> */}
            <span>{restaurant.distance} Kč</span>
          </div>

          {/* Category */}
          <div className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm">
            {restaurant.category}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantBanner;

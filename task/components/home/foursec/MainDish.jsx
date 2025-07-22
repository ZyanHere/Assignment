import Image from "next/image";

const MainDishSection = ({ restaurantData, favorites, index, toggleFavorite }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-[#fdf6f3] p-3 sm:p-4 sm:px-10 rounded-lg shadow-md border border-gray-200 relative gap-4">
      {/* Left: Dish Image */}
      <div className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 relative rounded-lg overflow-hidden border border-gray-300">
        <Image
          src={restaurantData.mainDish.image}
          alt={restaurantData.mainDish.name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Center: Dish Details */}
      <div className="flex-1 mt-3 sm:mt-0 sm:ml-9 text-center sm:text-left">
        <h1 className="text-lg sm:text-2xl font-semibold">
          {restaurantData.mainDish.name}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">{restaurantData.address}</p>
        <p className="text-base sm:text-lg text-gray-500">{restaurantData.parking}</p>
      </div>

      {/* Right: Heart Icon (Favorite Button) */}
      <div
        className="cursor-pointer mt-3 sm:mt-0"
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(index);
        }}
      >
        <Image
          src={favorites[index] ? "/home/shops/Heart-red.svg" : "/buffet/newHeart.svg"}
          alt="Favorite"
          width={28}
          height={28}
          className="w-7 h-7 sm:w-8 sm:h-8"
        />
      </div>
    </div>
  );
};

export default MainDishSection;

import Image from "next/image";

const MainDishSection = ({ restaurantData, favorites, index, toggleFavorite }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-[#fdf6f3] p-2 sm:p-4 sm:px-10 rounded-lg shadow-md border border-gray-200 relative gap-3 sm:gap-0">
      {/* Left: Dish Image */}
      <div className="w-28 h-28 sm:w-40 sm:h-40 flex-shrink-0 relative rounded-lg overflow-hidden border border-gray-300 mx-auto sm:mx-0">
        <Image
          src={restaurantData.mainDish.image}
          alt={restaurantData.mainDish.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Center: Dish Details */}
      <div className="flex-1 mt-2 sm:mt-0 sm:ml-9 text-center sm:text-left">
        <h1 className="text-lg sm:text-2xl font-semibold">
          {restaurantData.mainDish.name}
        </h1>
        <p className="text-gray-600 text-xs sm:text-base">{restaurantData.address}</p>
        <p className="text-gray-500 text-xs sm:text-lg">{restaurantData.parking}</p>
      </div>

      {/* Right: Heart Icon (Favorite Button) */}
      <div
        className="cursor-pointer mt-2 sm:mt-0"
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

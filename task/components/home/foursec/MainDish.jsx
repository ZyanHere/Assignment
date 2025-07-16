import Image from "next/image";

const MainDishSection = ({ restaurantData, favorites, index, toggleFavorite }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#fdf6f3] p-4 sm:px-10 rounded-lg shadow-md border border-gray-200 gap-4 sm:gap-6 w-full">
      {/* Left: Dish Image */}
      <div className="w-full sm:w-40 h-40 relative rounded-lg overflow-hidden border border-gray-300 flex-shrink-0 mx-auto sm:mx-0">
        <Image
          src={restaurantData.mainDish.image}
          alt={restaurantData.mainDish.name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Center: Dish Details */}
      <div className="flex-1 text-center sm:text-left break-words">
        <h1 className="text-xl sm:text-2xl font-semibold">
          {restaurantData.mainDish.name}
        </h1>
        <p className="text-gray-600">{restaurantData.address}</p>
        <p className="text-lg text-gray-500">{restaurantData.parking}</p>
      </div>

      {/* Right: Heart Icon */}
      <div
        className="flex justify-center sm:justify-end w-full sm:w-auto"
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(index);
        }}
      >
        <Image
          src={favorites[index] ? "/home/shops/Heart-red.svg" : "/buffet/newHeart.svg"}
          alt="Favorite"
          width={32}
          height={32}
        />
      </div>
    </div>
  );
};

export default MainDishSection;

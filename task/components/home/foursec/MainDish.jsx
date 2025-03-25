import Image from "next/image";

const MainDishSection = ({ restaurantData, favorites, index, toggleFavorite }) => {
  return (
    <div className="flex items-center justify-between bg-[#fdf6f3] p-4 px-10 rounded-lg shadow-md border border-gray-200 relative">
      {/* Left: Dish Image */}
      <div className="w-40 h-40 flex-shrink-0 relative rounded-lg overflow-hidden border border-gray-300">
        <Image
          src={restaurantData.mainDish.image}
          alt={restaurantData.mainDish.name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Center: Dish Details */}
      <div className="flex-1 ml-9">
        <h1 className="text-2xl font-semibold">
          {restaurantData.mainDish.name}
        </h1>
        <p className="text-gray-600">{restaurantData.address}</p>
        <p className="text-lg text-gray-500">{restaurantData.parking}</p>
      </div>

      {/* Right: Heart Icon (Favorite Button) */}
      <div
        className="cursor-pointer"
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

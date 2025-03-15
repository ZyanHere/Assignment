"use client";
import Image from "next/image";

const Header = () => {
  return (
    <div className="bg-white flex justify-between items-center p-8 w-full h-[48px] shadow-md ">
      <div className="flex-1 max-w-4xl relative">
        <input
          type="text"
          placeholder='Search "stores"'
          className="w-full p-2 pr-10 bg-[#FAFCFC] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500"
        />
        <Image
          src="/home/header/Frame.svg"
          alt="search"
          width={18}
          height={18}
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
        />
      </div>

      <div className="flex items-center gap-8">
        <Image
          src="/home/header/ShoppingCart.svg"
          alt="search"
          width={16}
          height={16}
        />
        <Image src="/home/header/Bell.svg" alt="search" width={16} height={16} />

        <div className="flex items-center">
          <Image src="/home/header/profile.png" alt="user" width={24} height={24} />
          <span className="ml-2 text-gray-700">Zyan</span>
        </div>
      </div>
    </div>
  );
};

export default Header;

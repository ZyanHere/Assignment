"use client";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

const Header = () => {
  const cartItems = 3;
  const notifications = 2;

  return (
    <nav className="bg-white flex items-center justify-between px-6 md:px-8 py-4 w-full h-[72px] shadow-sm border-b border-gray-100">
      {/* Search Bar */}
      <form className="flex-1 max-w-4xl relative mr-8" role="search">
        <div className="relative">
          <input
            id="searchInput"
            type="text"
            placeholder='Search "stores"'
            className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500 text-gray-700 transition-all border border-transparent hover:border-yellow-300"
            aria-label="Search stores"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition"
          >
            <Image
              src="/home/header/Frame.svg"
              alt="Search"
              width={20}
              height={20}
              priority
            />
          </button>
        </div>
      </form>

      {/* Icons & Profile Section */}
      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex gap-4">
          {/* Cart Button */}
          <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-transform hover:scale-105">
            <Image
              src="/home/header/ShoppingCart.svg"
              alt="Cart"
              width={24}
              height={24}
              className="opacity-90"
            />
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                {cartItems}
              </span>
            )}
          </button>

          {/* Notifications Button */}
          <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-transform hover:scale-105">
            <Image
              src="/home/header/Bell.svg"
              alt="Notifications"
              width={24}
              height={24}
              className="opacity-90"
            />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                {notifications}
              </span>
            )}
          </button>
        </div>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 p-1 rounded-xl transition hover:bg-gray-50 group">
            <div className="relative">
              <Image
                src="/home/header/profile.png"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full border-2 border-yellow-400"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-gray-700 font-medium hidden md:inline-block text-sm">
              Zyan
              <span className="block text-xs text-gray-500 font-normal">Premium Member</span>
            </span>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-48 bg-white shadow-xl rounded-xl p-2 border border-gray-100"
          >
            <DropdownMenuItem asChild>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-2.5 text-gray-700 hover:bg-yellow-50 rounded-lg font-medium cursor-pointer transition"
              >
                <Image
                  src="/home/header/profile.png"
                  alt="Profile"
                  width={18}
                  height={18}
                />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => console.log("Logout")}
              className="flex items-center gap-2 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-lg font-medium cursor-pointer transition"
            >
              <LogOut size={16} />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Header;
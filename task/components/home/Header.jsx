"use client";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react"; // Import logout icon

const Header = () => {
  const cartItems = 3;
  const notifications = 2;

  return (
    <nav className="bg-white flex justify-between items-center px-6 md:px-8 py-4 w-full h-[56px] shadow-md">
      {/* Search Bar */}
      <form className="flex-1 max-w-4xl relative" role="search">
        <label htmlFor="searchInput" className="sr-only">
          Search stores
        </label>
        <input
          id="searchInput"
          type="text"
          placeholder='Search "stores"'
          className="w-full p-2 pr-10 bg-[#FAFCFC] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500"
          aria-label="Search stores"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          <Image
            src="/home/header/Frame.svg"
            alt="Search"
            width={18}
            height={18}
            priority
          />
        </button>
      </form>

      {/* Icons & Profile Section */}
      <div className="flex items-center gap-5 md:gap-6">
        {/* Cart Button */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
          <Image
            src="/home/header/ShoppingCart.svg"
            alt="Shopping Cart"
            width={20}
            height={20}
          />
          {cartItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold rounded-full px-1">
              {cartItems}
            </span>
          )}
        </button>

        {/* Notifications Button */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
          <Image
            src="/home/header/Bell.svg"
            alt="Notifications"
            width={20}
            height={20}
          />
          {notifications > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold rounded-full px-1">
              {notifications}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-lg transition hover:bg-gradient-to-r hover:from-yellow-100 hover:to-yellow-500">
            <Image
              src="/home/header/profile.png"
              alt="User Profile"
              width={28}
              height={28}
              className="rounded-full"
            />
            <span className="text-gray-700 font-medium hidden md:inline-block">
              Zyan
            </span>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-48 bg-white shadow-md rounded-lg"
          >
            {/* Profile */}
            <DropdownMenuItem asChild>
              <Link
                href="/profile"
                className="w-full px-3 py-2 hover:bg-gray-500 rounded-md font-bold cursor-pointer"
              >
                Profile
              </Link>
            </DropdownMenuItem>

            {/* Logout */}
            <DropdownMenuItem
              onClick={() => console.log("Logout clicked")} // Replace with actual logout function later
              className="w-full px-3 py-2 flex items-center gap-2 text-red-500 hover:bg-gray-100 rounded-md cursor-pointer"
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

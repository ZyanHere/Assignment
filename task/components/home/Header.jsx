"use client";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Menu, Search } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "Stores", path: "/stores" },
  { name: "Cart", path: "/cart" },
  { name: "Orders", path: "/orders" },
];

const Header = () => {
  const cartItems = 3;
  const notifications = 2;
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="mx-auto px-4 sm:px-16 lg:px-20">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left Section - Logo and Navigation */}
          <div className="flex items-center gap-6 md:gap-12">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/auth-asset/logo.png"
                alt="Logo"
                width={82}
                height={68}
                className="hover:scale-105 transition-transform"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`relative px-2 py-1 text-lg font-medium group ${
                      isActive
                        ? "text-yellow-500"
                        : "text-gray-900 hover:text-yellow-500"
                    }`}
                  >
                    {/* Permanent underline for active item, hover underline for others */}
                    <span
                      className={`absolute inset-x-0 -bottom-1 h-0.5 ${
                        isActive
                          ? "bg-yellow-500 scale-x-100"
                          : "bg-yellow-400 origin-left scale-x-0 group-hover:scale-x-100"
                      } transition-transform duration-300`}
                    ></span>

                    <span
                      className={`relative block transition-all duration-200 ${
                        isActive ? "" : "group-hover:translate-y-[-2px]"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Search Bar - Centered on desktop */}
          <form className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder='Search "stores"'
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500 text-gray-700 transition-all border border-transparent hover:border-yellow-300"
              />
            </div>
          </form>

          {/* Right Section - Icons and Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Search Icon */}
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Search className="h-6 w-6 text-gray-600" />
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Cart and Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-transform">
                <span className="sr-only">Cart</span>
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                    {cartItems}
                  </span>
                )}
              </button>

              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-transform">
                <span className="sr-only">Notifications</span>
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 p-1 rounded-lg transition hover:bg-gray-50 group">
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
                  <span className="text-gray-700 font-medium hidden lg:inline-block text-sm">
                    Zyan
                    <span className="block text-xs text-gray-500 font-normal">
                      Premium Member
                    </span>
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
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4 px-2">
          <form className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder='Search "stores"'
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500 text-gray-700 transition-all border border-transparent hover:border-yellow-300"
            />
          </form>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-100">
          <div className="px-4 py-3">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;

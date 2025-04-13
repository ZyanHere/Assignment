"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useState } from "react";
import NavLinks from "@/app/components/header/NavLinks";
import UserActions from "@/app/components/header/UserActions";


const Header = () => {
 const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="mx-auto px-4 sm:px-16 lg:px-20">
        <div className="flex items-center justify-between h-16 md:h-20">
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
            <NavLinks/>
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

            <UserActions/>
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
        <NavLinks isMobile/>
      )}
    </nav>
  );
};

export default Header;

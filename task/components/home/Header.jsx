"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import NavLinks from "@/app/components/header/NavLinks";
import UserActions from "@/app/components/header/UserActions";
import { useSession } from "next-auth/react";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated' && !!session?.user;
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    
    // Handle scroll event for header styling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Handle clicks outside mobile menu to close it
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isMobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Don't render anything during SSR or while loading session
  if (!mounted) {
    return null;
  }

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
      isScrolled ? "shadow-md" : "shadow-sm"
    } border-b border-yellow-500`}>
      <div className="mx-auto px-4 sm:px-16 lg:px-20">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          <div className="flex items-center gap-3 sm:gap-6 md:gap-12">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-yellow-300/40 rounded-lg transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/auth-asset/logo.png"
                alt="Logo"
                width={82}
                height={68}
                className="hover:scale-105 transition-transform"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <NavLinks />
            </div>
          </div>

          {/* Search Bar - Centered on desktop */}
          <form className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder='Search "stores"'
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500 text-gray-700 transition-all border border-transparent hover:border-yellow-400"
              />
            </div>
          </form>

          {/* Right Section - Icons and Profile */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Mobile Search Icon */}
            <button className="md:hidden p-2 hover:bg-yellow-300/40 rounded-lg transition-colors" aria-label="Search">
              <Search className="h-6 w-6 text-gray-700" />
            </button>

            {isLoggedIn ? (
              <UserActions />
            ) : (
              <div className="flex gap-1.5 sm:gap-2">
                <Link
                  href="/auth/signup"
                  className="flex items-center justify-center text-center 
                    px-2 sm:px-2.5 md:px-2.5 lg:px-3 
                    py-1 sm:py-1 md:py-1 lg:py-1.5 
                    text-[10px] sm:text-xs md:text-xs lg:text-sm 
                    bg-yellow-500 shadow-2xl rounded-lg font-medium 
                    text-white hover:bg-yellow-50 hover:text-black transition"
                >
                  Register
                </Link>
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center text-center 
                    px-2 sm:px-2.5 md:px-2.5 lg:px-3 
                    py-1 sm:py-1 md:py-1 lg:py-1.5 
                    text-[10px] sm:text-xs md:text-xs lg:text-sm 
                    bg-white border border-yellow-500 shadow-2xl rounded-lg font-medium 
                    hover:text-orange-400 transition"
                >
                  Log In
                </Link>
              </div>


            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4 px-2">
          <form className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder='Search "stores"'
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500 text-gray-700 transition-all border border-transparent hover:border-yellow-400"
            />
          </form>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 w-full bg-white border-b border-yellow-500 shadow-lg py-2 animate-in slide-in-from-top duration-300"
        >
          <NavLinks isMobile />
        </div>
      )}
    </nav>
  );
};

export default Header;

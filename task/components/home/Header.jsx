"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import NavLinks from "@/app/components/header/NavLinks";
import UserActions from "@/app/components/header/UserActions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated' && !!session?.user;
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
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

  if (!mounted) return null;

  return (
    <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? "shadow-md" : "shadow-sm"} border-b border-yellow-500`}>
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-20">
        {/* Header Row */}
        <div className="flex items-center justify-between h-12 sm:h-14 md:h-16 lg:h-20 relative">
          {/* Left: Hamburger (mobile) + Logo (md+) + Nav (md+) */}
          <div className="flex items-center min-w-0 gap-4">
            {/* Hamburger menu (mobile only) */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 hover:bg-yellow-300/40 rounded-lg transition-colors z-20"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
              )}
            </button>
            {/* Logo (lg+ screens, left-aligned) */}
            <Link href="/" className="hidden lg:flex flex-shrink-0 items-center ml-0 lg:ml-4">
              <Image
                src="/auth-asset/logo.png"
                alt="Logo"
                width={82}
                height={68}
                className="w-16 h-auto sm:w-20 md:w-24 lg:w-28 xl:w-32 hover:scale-105 transition-transform"
                priority
              />
            </Link>
            {/* Desktop Nav (left-aligned on desktop) */}
            <div className="hidden lg:flex">
              <NavLinks />
            </div>
          </div>

          {/* Center: Logo (absolutely centered on mobile only) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-fit mx-auto z-10 md:hidden">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/auth-asset/logo.png"
                alt="Logo"
                width={82}
                height={68}
                className="w-16 h-auto hover:scale-105 transition-transform"
                priority
              />
            </Link>
          </div>

          {/* Search Bar (centered, only on lg+) - smaller */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-2 xl:mx-8">
            <SearchBar/>
          </div>

          {/* Right: Profile only on mobile, full UserActions on sm+ */}
          <div className="flex items-center justify-end gap-2">
            {isLoggedIn ? (
              <div className="block sm:hidden z-20">
                <UserActions onlyProfile />
              </div>
            ) : null}
            {/* On sm+ show all user actions or auth buttons */}
            {isLoggedIn ? (
              <div className="hidden sm:block">
                <UserActions />
              </div>
            ) : (
              <div className="hidden sm:flex gap-1 sm:gap-1.5 md:gap-2">
                <Link
                  href="/auth/signup"
                  className="flex items-center justify-center text-center px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-1 sm:py-1.5 md:py-1.5 lg:py-2 text-[9px] sm:text-xs md:text-sm lg:text-sm bg-yellow-500 shadow-2xl rounded-lg font-medium text-white hover:bg-yellow-50 hover:text-black transition"
                >
                  Register
                </Link>
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center text-center px-1.5 sm:px-2 md:px-2.5 lg:px-3 py-1 sm:py-1.5 md:py-1.5 lg:py-2 text-[9px] sm:text-xs md:text-sm lg:text-sm bg-white border border-yellow-500 shadow-2xl rounded-lg font-medium hover:text-orange-400 transition"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-yellow-500 shadow-lg py-2 animate-in slide-in-from-top duration-300"
        >
          <NavLinks isMobile />
        </div>
      )}
    </nav>
  );
};

export default Header;

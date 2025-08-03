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
  const isLoggedIn = status === "authenticated" && !!session?.user;
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        isMobileMenuOpen
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  if (!mounted) return null;

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-lg" : "shadow-sm"
      } border-b border-yellow-500`}
    >
      <div className="mx-auto px-4 md:px-6 lg:px-12 xl:px-24">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-4">
            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full border border-gray-200 hover:bg-yellow-100 transition z-20"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-800" />
              ) : (
                <Menu className="h-6 w-6 text-gray-800" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/auth-asset/logo.png"
                alt="Logo"
                width={100}
                height={72}
                className="h-auto w-auto hover:scale-105 transition-transform"
                priority
              />
            </Link>

            {/* NavLinks */}
            <div className="hidden lg:flex">
              <NavLinks />
            </div>
          </div>

          {/* Centered Search (lg+) */}
          <div className="hidden lg:flex max-w-xl w-full justify-center">
            <SearchBar />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <div className="block sm:hidden">
                  <UserActions onlyProfile />
                </div>
                <div className="hidden sm:block">
                  <UserActions />
                </div>
              </>
            ) : (
              <div className="hidden sm:flex gap-3">
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded-xl shadow hover:bg-yellow-400"
                >
                  Sign Up
                </Link>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-semibold border border-yellow-500 text-yellow-500 rounded-xl hover:bg-yellow-100"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-yellow-400 shadow-xl animate-in slide-in-from-top duration-300 z-40"
        >
          <div className="p-4">
            <NavLinks isMobile />
            {!isLoggedIn && (
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/auth/signup"
                  className="block text-center px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded-xl shadow hover:bg-yellow-400"
                >
                  Sign Up
                </Link>
                <Link
                  href="/auth/login"
                  className="block text-center px-4 py-2 text-sm font-semibold border border-yellow-500 text-yellow-500 rounded-xl hover:bg-yellow-100"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;

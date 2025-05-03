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
import { useDispatch, useSelector } from "react-redux";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const UserActions = () => {
  //user from redux and next-auth
  const { currentUser } = useSelector((state) => state.user);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("Guest");

  useEffect(() => {
    // First priority: Check Redux store (for immediate state after login/signup)
    // Second priority: Check Next-Auth session (for persistence across page refreshes)
    if (currentUser) {
      setFirstName(currentUser.name.split(" ")[0]);
    } else if (session?.user?.name) {
      setFirstName(session.user.name.split(" ")[0]);
      // Optionally sync session data to Redux if needed
      // dispatch(setCurrentUser(session.user));
    }
  }, [currentUser, session]);

  const handleLogout = async () => {
    try {
        // Step 1: Get CSRF token from backend
        const csrfResponse = await axios.get(
            'http://localhost:4000/lmd/api/v1/auth/csrf-token',
            { withCredentials: true }
        );
        const csrfToken = csrfResponse.data.token;
        
        // Step 2: Call backend logout endpoint with CSRF token
        await axios.post(
            'http://localhost:4000/lmd/api/v1/auth/user/logout',
            {},
            {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
                withCredentials: true,
            }
        );
        
        // Step 3: Sign out from NextAuth
        await signOut({
            redirect: false,
            callbackUrl: '/'
        });
        
        // Step 4: Optional - Clear client-side cache/storage
        if (typeof window !== 'undefined') {
            localStorage.clear();
            sessionStorage.clear();
        }
        
        // Step 5: Redirect to home page
        window.location.href = '/';
        toast.success('Logged out successfully');
    } catch (error) {
        console.error('Logout failed:', error);
        toast.error('Logout failed. Please try again.');
        
        // Force sign out even if backend logout fails
        await signOut({
            redirect: false,
            callbackUrl: '/'
        });
        window.location.href = '/';
    }
};

  let cartItems = 3;
  let notifications = 5;
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Cart */}
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

      {/* Notifications */}
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
        <DropdownMenuTrigger className="flex items-center gap-2 p-3 rounded-lg transition hover:bg-gray-50 group">
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
            {firstName}
            {/* {currentUser?.premium && <span className="block text-xs text-gray-500 font-normal">Premium Member</span>} */}
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
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-lg font-medium cursor-pointer transition"
          >
            <LogOut size={16} />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserActions;

"use client";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const UserActions = () => {
  //user from redux and next-auth
  const userState = useSelector((state) => state.user);
  const currentUser = userState?.user || null;
  const profilePic = userState?.profilePic || null;
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("Guest");
  

  useEffect(() => {
    // First priority: Check Redux store (for immediate state after login/signup)
    // Second priority: Check Next-Auth session (for persistence across page refreshes)
    if (currentUser?.name) {
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

const getUserInitial = () => {
  const name = currentUser?.name || session?.user?.name;
  return name ? name.charAt(0).toUpperCase() : "User";
};

  let cartItems = 3;
  let notifications = 5;
  // Sample notifications
  const notificationList = [
    {
      id: 1,
      title: "Order Shipped",
      message: "Your order #1234 has been shipped!",
      icon: "/home/header/Bell.svg",
      time: "2m ago",
      read: false,
    },
    {
      id: 2,
      title: "New Offer",
      message: "20% off on electronics this weekend!",
      icon: "/home/header/Bell.svg",
      time: "1h ago",
      read: false,
    },
    {
      id: 3,
      title: "Payment Received",
      message: "Your payment of $29.99 was successful.",
      icon: "/home/header/Bell.svg",
      time: "3h ago",
      read: true,
    },
    {
      id: 4,
      title: "Security Alert",
      message: "New login from Chrome on Windows.",
      icon: "/home/header/Bell.svg",
      time: "1d ago",
      read: true,
    },
  ];
  const unreadCount = notificationList.filter(n => !n.read).length;


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

      {/* Notifications Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="relative p-2 hover:bg-gray-100 rounded-lg transition-transform focus:outline-none">
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
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
              {unreadCount}
            </span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto bg-white shadow-2xl rounded-xl p-0 border border-gray-100">
          <div className="p-4 pb-2 flex items-center justify-between">
            <span className="font-semibold text-lg text-gray-800">Notifications</span>
            <button className="text-xs text-blue-600 hover:underline font-medium">Mark all as read</button>
          </div>
          <DropdownMenuSeparator />
          <div className="max-h-64 overflow-y-auto">
            {notificationList.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">No notifications</div>
            ) : (
              notificationList.map((n) => (
                <DropdownMenuItem key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-yellow-50 transition rounded-none border-b last:border-b-0 ${n.read ? '' : 'bg-yellow-50/60'}`}>
                  <div className="flex-shrink-0 mt-1">
                    <Image src={n.icon} alt="icon" width={28} height={28} className="rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm truncate">{n.title}</div>
                    <div className="text-xs text-gray-600 truncate">{n.message}</div>
                    <div className="text-[11px] text-gray-400 mt-1">{n.time}</div>
                  </div>
                </DropdownMenuItem>
              ))
            )}
          </div>
          <DropdownMenuSeparator />
          <div className="p-2 text-center">
            <Link href="/profile?tab=notifications" className="text-blue-600 text-xs font-medium hover:underline">View all notifications</Link>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 p-3 rounded-lg transition hover:bg-gray-50 group">
          <div className="relative">
            {profilePic ? (
              <Image
                src={profilePic}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full border-2 border-yellow-400"
                onError={(e) => {
                  e.currentTarget.src = '/default-avatar.png';
                }}
              />
            ) : (
              <div className="rounded-full border-2 border-yellow-400 w-10 h-10 flex items-center justify-center bg-amber-500 text-white text-lg font-bold">
                {getUserInitial()}
              </div>
            )}
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

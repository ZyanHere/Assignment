"use client";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "@/lib/contexts/cart-context";
import { useRouter } from "next/navigation";
import { clearProfileData } from "@/lib/redux/user/userSlice";
import { useAuth } from "@/lib/hooks/useAuth";
import NotificationDropdown from "@/components/Notifications/NotificationDropdown";
import { getUnreadCount, sampleNotifications } from "@/data/sampleNotifications";
import { HeartWithBadge } from "@/components/saveDeals/savedealsBadges"; 

const UserActions = ({ onlyProfile = false }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const profileState = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("Guest");
  const { totalQuantity } = useCart();
  const router = useRouter();
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const unreadNotifications = getUnreadCount(notifications);

  useEffect(() => {
    if (user?.name) {
      setFirstName(user.name.split(" ")[0]);
    } else if (user?.email) {
      setFirstName(user.email.split("@")[0]);
    } else {
      setFirstName("Guest");
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      dispatch(clearProfileData());
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Redirecting...");
      router.push("/");
    }
  };

  const getUserInitial = () => {
    const name = user?.name || user?.email;
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Only show profile image (for mobile header)
  if (onlyProfile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-lg transition hover:bg-gray-50 group">
          <div className="relative">
            {user?.profileImage ? (
              <Image
                src={user.profileImage}
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full border-2 border-yellow-400 w-9 h-9"
                onError={(e) => {
                  e.currentTarget.src = "/default-avatar.png";
                }}
              />
            ) : (
              <div className="rounded-full border-2 border-yellow-400 w-9 h-9 flex items-center justify-center bg-amber-500 text-white text-lg font-bold">
                {getUserInitial()}
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-44 bg-white shadow-xl rounded-xl p-2 border border-gray-100"
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
    );
  }

  // Full user actions (for sm+)
  return (
    <div className="flex items-center gap-4">
      {/* Saved Deals */}
      <Link
        href="/profile?tab=SavedDeals"
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-transform"
        title="Saved Deals"
      >
        <HeartWithBadge />
      </Link>

      {/* Cart */}
      <Link
        href="/cart"
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-transform"
        title="Cart"
      >
        <svg
          className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-colors"
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
        {totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
            {totalQuantity > 99 ? '99+' : totalQuantity}
          </span>
        )}
      </Link>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
          className="relative p-2 hover:bg-gray-100 rounded-lg transition-transform"
          title="Notifications"
        >
          <svg
            className="w-6 h-6 text-gray-700 hover:text-yellow-600 transition-colors"
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
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
              {unreadNotifications > 99 ? '99+' : unreadNotifications}
            </span>
          )}
        </button>
        
        <NotificationDropdown
          isOpen={isNotificationDropdownOpen}
          onClose={() => setIsNotificationDropdownOpen(false)}
          notifications={notifications}
        />
      </div>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 p-3 rounded-lg transition hover:bg-gray-50 group">
          <div className="relative">
            {user?.profileImage ? (
              <Image
                src={user.profileImage}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full border-2 border-yellow-400"
                onError={(e) => {
                  e.currentTarget.src = "/default-avatar.png";
                }}
              />
            ) : (
              <div className="rounded-full border-2 border-yellow-400 w-10 h-10 flex items-center justify-center bg-amber-500 text-white text-lg font-bold">
                {getUserInitial()}
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <span className="text-gray-700 font-medium hidden lg:inline-block text-sm">
            {firstName}
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
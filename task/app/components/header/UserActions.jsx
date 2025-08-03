"use client"

import Image from "next/image"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut, Heart } from "lucide-react"
import { useDispatch } from "react-redux"
import { signOut } from "next-auth/react"
import { useEffect, useState, useMemo } from "react"
import toast from "react-hot-toast"
import { useCart } from "@/lib/contexts/cart-context"
import { useRouter } from "next/navigation"
import { clearProfileData } from "@/lib/redux/user/userSlice"
import { useAuth } from "@/lib/hooks/useAuth"
import NotificationDropdown from "@/components/Notifications/NotificationDropdown"
import { getUnreadCount, sampleNotifications } from "@/data/sampleNotifications"
import { HeartWithBadge } from "@/components/saveDeals/savedealsBadges"

const UserActions = ({ onlyProfile = false }) => {
  const { user, isAuthenticated, isLoading } = useAuth()
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState("Guest")
  const { totalQuantity } = useCart()
  const router = useRouter()
  const [notifications, setNotifications] = useState(sampleNotifications)
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false)
  const unreadNotifications = useMemo(() => getUnreadCount(notifications), [notifications])

  useEffect(() => {
    if (user?.name) {
      setFirstName(user.name.split(" ")[0])
    } else if (user?.email) {
      setFirstName(user.email.split("@")[0])
    }
  }, [user])

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false })
      dispatch(clearProfileData())
      toast.success("Logged out successfully")
      router.push("/")
    } catch (error) {
      toast.error("Logout failed")
      router.push("/")
    }
  }

  const getUserInitial = () => {
    const name = user?.name || user?.email
    return name ? name.charAt(0).toUpperCase() : "U"
  }

  const renderProfileImage = (size = 44) => (
    <div
      style={{ width: size, height: size }}
      className="relative rounded-full overflow-hidden flex items-center justify-center border-2 border-gradient-to-r from-amber-400 to-orange-400 bg-gradient-to-br from-amber-500 to-orange-500 text-white text-lg font-bold transition-transform duration-300 group-hover:scale-105"
    >
      {user?.profileImage ? (
        <Image
          src={user.profileImage}
          alt="Profile"
          fill
          className="object-cover rounded-full"
          onError={(e) => {
            e.currentTarget.src = "/default-avatar.png"
          }}
        />
      ) : (
        getUserInitial()
      )}
      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
    </div>
  )

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-amber-500 border-t-transparent" />
          <div className="absolute inset-0 rounded-full bg-amber-200/20 animate-pulse" />
        </div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  if (onlyProfile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-2xl hover:bg-amber-50 transition-all duration-300 group">
          {renderProfileImage(40)}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-3 border border-amber-200/50"
        >
          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-amber-50 rounded-xl font-semibold transition-all"
            >
              <Image src="/home/header/profile.png" alt="Profile" width={20} height={20} />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-semibold transition-all"
          >
            <LogOut size={18} />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {/* Saved Deals */}
      <Link
        href="/profile?tab=SavedDeals"
        className="relative p-3 rounded-2xl hover:bg-amber-50 transition-all duration-300 group"
        title="Saved Deals"
      >
        <HeartWithBadge />
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100">
          <Heart size={8} className="text-red-400 animate-bounce" fill="currentColor" />
        </div>
      </Link>

      {/* Cart */}
      <Link
        href="/cart"
        className="relative p-3 rounded-2xl hover:bg-amber-50 transition-all duration-300 group"
        title="Cart"
      >
        <svg
          className="w-6 h-6 text-gray-700 group-hover:text-amber-600 transition-transform duration-300"
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
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md border-2 border-white animate-pulse">
            {totalQuantity > 99 ? "99+" : totalQuantity}
          </span>
        )}
      </Link>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
          className="relative p-3 rounded-2xl hover:bg-amber-50 transition-all duration-300 group"
          title="Notifications"
        >
          <svg
            className="w-6 h-6 text-gray-700 group-hover:text-amber-600 transition-transform duration-300"
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
            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white animate-bounce">
              {unreadNotifications > 99 ? "99+" : unreadNotifications}
            </span>
          )}
        </button>
        <NotificationDropdown
          isOpen={isNotificationDropdownOpen}
          onClose={() => setIsNotificationDropdownOpen(false)}
          notifications={notifications}
        />
      </div>

      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-2xl hover:bg-amber-50 transition-all duration-300 group">
          {renderProfileImage(44)}
          <span className="hidden lg:inline text-sm font-semibold text-gray-700 group-hover:text-amber-700 transition-colors duration-300">
            {firstName}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-52 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-3 border border-amber-200/50"
        >
          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-amber-50 rounded-xl font-semibold transition-all"
            >
              <Image src="/home/header/profile.png" alt="Profile" width={20} height={20} />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-semibold transition-all"
          >
            <LogOut size={18} />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserActions

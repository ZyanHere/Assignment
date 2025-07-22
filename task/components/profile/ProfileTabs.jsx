"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  User,
  ShoppingBag,
  Heart,
  CreditCard,
  MessageSquare,
  Bell,
  LogOut
} from "lucide-react";

const ProfileTabs = ({ selectedTab, setSelectedTab }) => {
  const tabs = [
    {
      key: "about",
      name: "About Me",
      icon: <User className="w-5 h-5" />,
      color: "text-blue-500"
    },
    {
      key: "orders",
      name: "My Orders",
      icon: <ShoppingBag className="w-5 h-5" />,
      color: "text-orange-500"
    },
    {
      key: "saved",
      name: "Saved Items",
      icon: <Heart className="w-5 h-5" />,
      color: "text-red-500"
    },
    {
      key: "payment",
      name: "Payments",
      icon: <CreditCard className="w-5 h-5" />,
      color: "text-emerald-500"
    },
    {
      key: "messages",
      name: "Messages",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "text-purple-500"
    },
    {
      key: "notifications",
      name: "Notifications",
      icon: <Bell className="w-5 h-5" />,
      color: "text-yellow-500"
    },
    {
      key: "logout",
      name: "Log Out",
      icon: <LogOut className="w-5 h-5" />,
      color: "text-gray-500"
    }
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div
        className={cn(
          "flex flex-wrap justify-start sm:justify-center border-b bg-white rounded-t-xl shadow-sm"
        )}
      >
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
          >
            <Button
              variant="ghost"
              className={cn(
                "flex flex-col items-center gap-1 w-full h-full py-4 rounded-none text-center",
                "transition-all duration-150 hover:bg-gray-50",
                selectedTab === tab.key
                  ? "border-b-2 border-amber-500 text-amber-500 font-medium"
                  : "text-gray-600"
              )}
              onClick={() => setSelectedTab(tab.key)}
            >
              <span
                className={cn(
                  tab.color,
                  selectedTab === tab.key ? "opacity-100" : "opacity-90"
                )}
              >
                {tab.icon}
              </span>
              <span className="text-xs sm:text-sm">{tab.name}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;

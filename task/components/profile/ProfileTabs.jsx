"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  User,
  ShoppingBag,
  Heart,
  CreditCard,
  MessageSquare,
  Bell,
  LogOut,
  Menu
} from "lucide-react";

const ProfileTabs = ({ selectedTab, setSelectedTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="relative w-full p-4">
  {/* Toggle for mobile */}
  <div className="sm:hidden flex justify-end mb-4">
    <Button
      onClick={() => setIsSidebarOpen(true)}
      className="bg-yellow-500 text-white px-3 py-2 rounded-md"
    >
      <Menu className="w-5 h-5" />
    </Button>
  </div>

  {/* Sidebar Drawer – NOW only over the section */}
  {isSidebarOpen && (
    <div className="absolute top-0 left-0 w-full z-30 flex rounded-md">
      <div className="w-64 bg-white h-full p-4 shadow-md animate-slide-in z-40 rounded-l-md">
        <div className="flex flex-col gap-4">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              variant="ghost"
              className={cn(
                "flex items-center justify-start gap-2 w-full text-left",
                selectedTab === tab.key
                  ? "bg-gray-100 text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
              onClick={() => {
                setSelectedTab(tab.key);
                setIsSidebarOpen(false);
              }}
            >
              <span className={tab.color}>{tab.icon}</span>
              <span>{tab.name}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="flex-1" onClick={() => setIsSidebarOpen(false)} />
    </div>
  )}

  {/* Desktop Tabs */}
  <div className="hidden sm:flex flex-row border-b gap-1">
    {tabs.map((tab) => (
      <div
        key={tab.key}
        className="flex-1 min-w-[100px] sm:min-w-[120px] flex-shrink-0"
      >
        <Button
          variant="ghost"
          onClick={() => setSelectedTab(tab.key)}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full py-4 rounded-none",
            "transition-all duration-200 hover:scale-[1.02]",
            selectedTab === tab.key
              ? "bg-gradient-to-b from-primary/10 to-transparent border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          <span className={tab.color}>{tab.icon}</span>
          <span className="text-xs sm:text-sm font-medium">
            {tab.name}
          </span>
        </Button>
      </div>
    ))}
  </div>

</div>

  );
};

export default ProfileTabs;

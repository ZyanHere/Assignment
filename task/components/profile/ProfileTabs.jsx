import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Bell, MessageSquare, CreditCard, Heart, ShoppingBag, User } from "lucide-react";

const ProfileTabs = ({ selectedTab, setSelectedTab }) => {
  const tabs = [
    { key: "about", name: "About Me", icon: <User size={18} /> },
    { key: "orders", name: "My Orders", icon: <ShoppingBag size={18} /> },
    { key: "saved", name: "Saved Deal", icon: <Heart size={18} /> },
    { key: "payment", name: "Payment Methods", icon: <CreditCard size={18} /> },
    { key: "messages", name: "Message", icon: <MessageSquare size={18} /> },
    { key: "notifications", name: "Notifications", icon: <Bell size={18} /> },
    { key: "logout", name: "Log Out", icon: <LogOut size={18} />, action: () => console.log("Logging out...") },
  ];

  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
            selectedTab === tab.key
              ? "bg-gradient-to-t from-yellow-400 to-yellow-200 text-black shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-yellow-300"
          }`}
          onClick={() => tab.action ? tab.action() : setSelectedTab(tab.key)}
        >
          {tab.icon} {tab.name}
        </Button>
      ))}
    </div>
  );
};

export default ProfileTabs;

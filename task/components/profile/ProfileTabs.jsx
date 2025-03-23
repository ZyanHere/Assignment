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
    // { key: "logout", name: "Log Out", icon: <LogOut size={18} />, action: () => console.log("Logging out...") },
    { key: "logout", name: "Log Out", icon: <LogOut size={18} />}
  ];

  return (
    <div className="w-full px-16 lg:px-28 mt-10">
      <div className="grid grid-cols-7  border-b pb-2">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            className={`flex justify-center items-center gap-2 w-full py-3 text-sm font-medium rounded-none border transition-all ${
              selectedTab === tab.key
                ? "bg-gradient-to-t from-yellow-400 to-yellow-200 text-black shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-yellow-300"
            }`}
            onClick={() => (tab.action ? tab.action() : setSelectedTab(tab.key))}
          >
            {tab.icon} {tab.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;

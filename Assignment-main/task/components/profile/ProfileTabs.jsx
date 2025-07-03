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
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className="flex-1 min-w-[120px]"
          >
            <Button
              variant="ghost"
              className={cn(
                "flex flex-col gap-2 w-full h-full py-4 rounded-none",
                "transition-all duration-200 hover:scale-[1.02]",
                selectedTab === tab.key
                  ? "bg-gradient-to-b from-primary/10 to-transparent border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
              onClick={() => setSelectedTab(tab.key)}
            >
              <span className={cn(tab.color, selectedTab === tab.key ? "opacity-150" : "opacity-100")}>
                {tab.icon}
              </span>
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
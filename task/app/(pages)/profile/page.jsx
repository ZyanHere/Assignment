"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ProfileTabs from "@/components/profile/ProfileTabs";
import AboutMe from "@/components/profile/AboutMe";
import MyOrders from "@/components/profile/MyOrders";
import SavedDeal from "@/components/profile/SavedDeal";
import PaymentMethods from "@/components/profile/PaymentMethods";
import Messages from "@/components/profile/Messages";
import Notifications from "@/components/profile/Notifications";

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("about");

  useEffect(() => {
    const storedTab = localStorage.getItem("profileTab");
    if (storedTab) {
      setSelectedTab(storedTab);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("profileTab", selectedTab);
  }, [selectedTab]);


  const renderTabContent = () => {
    switch (selectedTab) {
      case "about":
        return <AboutMe />;
      case "orders":
        return <MyOrders />;
      case "saved":
        return <SavedDeal />;
      case "payment":
        return <PaymentMethods />;
      case "messages":
        return <Messages />;
      case "notifications":
        return <Notifications />;
      default:
        return <AboutMe />;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Image
          src="/profile/profile-pic.jpg"
          alt="Profile Picture"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">Zyan Baishya</h2>
          <p className="text-gray-500">ABC@gmail.com</p>
        </div>
      </div>


      <ProfileTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      <div className="mt-6">{renderTabContent()}</div>
    </div>
  );
};

export default ProfilePage;

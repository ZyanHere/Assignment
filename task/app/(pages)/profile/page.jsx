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
import Sidebar from "@/components/home/sidebar";
import Header from "@/components/home/Header";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("about");
  const [profilePic, setProfilePic] = useState("/profile/profile-pic.jpg");
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storedTab = localStorage.getItem("profileTab");
    if (storedTab) {
      setSelectedTab(storedTab);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("profileTab", selectedTab);
  }, [selectedTab]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProfilePic(imageUrl);
    }
  };

  const handleSaveProfilePic = () => {
    if (newProfilePic) {
      setProfilePic(newProfilePic);
      setModalOpen(false);
    }
  };

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
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <p className="text-3xl font-semibold">My Account</p>
          <div className="p-6 w-full mx-auto mt-6">
            <div className="flex flex-col gap-3">
              {" "}
              <div className="relative w-fit">
                {" "}
                <Image
                  src={profilePic}
                  alt="Profile Picture"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
               
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                  <DialogTrigger asChild>
                    <button
                      className="absolute bottom-1 right-1 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100"
                      onClick={() => setModalOpen(true)}
                    >
                      <Image
                        src="/profile/edit.svg"
                        alt="Edit"
                        width={30}
                        height={30}
                      />
                    </button>
                  </DialogTrigger>
                  {/* Profile Picture Upload Modal */}
                  <DialogContent className="max-w-md p-6">
                    <DialogTitle className="text-xl font-semibold">
                      Change Profile Picture
                    </DialogTitle>
                    {newProfilePic && (
                      <Image
                        src={newProfilePic}
                        alt="New Profile Preview"
                        width={120}
                        height={120}
                        className="rounded-full mx-auto mb-4"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-white file:text-gray-700 hover:file:bg-gray-100"
                    />
                    <div className="flex justify-end gap-3 mt-4">
                      <button
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                        onClick={() => setModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={handleSaveProfilePic}
                      >
                        Save
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
             
              <div>
                <h2 className="text-xl font-semibold">Zyan Baishya</h2>
                <p className="text-gray-500">ABC@gmail.com</p>
              </div>
            </div>

            <ProfileTabs
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />

            <div className="mt-6">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

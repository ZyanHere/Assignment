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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Logout from "@/components/profile/Logout";
import { Button } from "@/components/ui/button";
import { Pencil, Upload } from "lucide-react";

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("about");
  const [profilePic, setProfilePic] = useState("/profile/profile-pic.jpg");
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

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
      setNewProfilePic(null);
    }
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "about": return <AboutMe />;
      case "orders": return <MyOrders />;
      case "saved": return <SavedDeal />;
      case "payment": return <PaymentMethods />;
      case "messages": return <Messages />;
      case "notifications": return <Notifications />;
      case "logout": return <Logout />;
      default: return <AboutMe />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          <div className=" mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Profile Picture */}
                <div className="relative group">
                  {isLoading ? (
                    <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />
                  ) : (
                    <>
                      <Image
                        src={profilePic}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="rounded-full border-4 border-white shadow-lg w-24 h-24 object-cover"
                      />
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="secondary" 
                            size="icon"
                            className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Update Profile Picture</h3>
                            {newProfilePic && (
                              <div className="flex justify-center">
                                <Image
                                  src={newProfilePic}
                                  alt="Preview"
                                  width={160}
                                  height={160}
                                  className="rounded-full w-40 h-40 object-cover"
                                />
                              </div>
                            )}
                            <div className="flex flex-col gap-2">
                              <label className="flex items-center justify-center w-full px-4 py-2 border border-dashed rounded-lg cursor-pointer">
                                <Upload className="w-5 h-5 mr-2" />
                                Upload New Photo
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  accept="image/*"
                                  onChange={handleImageChange}
                                />
                              </label>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline">Cancel</Button>
                              <Button onClick={handleSaveProfilePic}>Save Changes</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  {isLoading ? (
                    <div className="space-y-3">
                      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl font-bold">Zyan Baishya</h1>
                      <p className="text-gray-600">ABC@gmail.com</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Member since June 2022
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <ProfileTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
              
              <div className="p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                  </div>
                ) : (
                  renderTabContent()
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
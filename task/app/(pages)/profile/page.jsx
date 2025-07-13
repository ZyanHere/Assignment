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
import Header from "@/components/home/Header";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Logout from "@/components/profile/Logout";
import { Button } from "@/components/ui/button";
import { Pencil, Upload, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { uploadProfileImage } from "@/lib/redux/user/userSlice";
import { useAuth } from "@/lib/hooks/useAuth";
import toast from "react-hot-toast";
import { validateProfilePhotoFile, fileToBase64 } from "@/lib/utils/profilePhotoUpload";

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("about");
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    imageUploading, 
    profileLoading,
    session 
  } = useAuth();

  // Compute user data for display
  const userData = {
    name: user.name || "User",
    email: user.email || "",
    joinDate: new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }),
  };

  // Compute profile image and initial
  const profileImage = user.profileImage || "";
  const userInitial = profileImage ? "" : (user.name ? user.name.charAt(0).toUpperCase() : "U");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Clear previous errors
    setError(null);

    // Validate file
    const validation = validateProfilePhotoFile(file);
    if (!validation.valid) {
      setError(validation.error);
      toast.error(validation.error);
      return;
    }

    // Create preview
    try {
      const base64 = await fileToBase64(file);
      setPreviewUrl(base64);
      setNewProfileImage(file); // Store the actual file for upload
    } catch (err) {
      setError('Failed to create preview');
      toast.error('Failed to create preview');
      return;
    }
  };

  const handleSaveProfileImage = async () => {
    if (!newProfileImage) {
      toast.error("Please select a file first");
      return;
    }

    if (!isAuthenticated || !session?.user?.token) {
      toast.error("Authentication required");
      return;
    }

    setError(null);

    try {
      // Upload profile photo using Redux thunk
      await dispatch(uploadProfileImage({ 
        token: session.user.token, 
        imageFile: newProfileImage 
      })).unwrap();
      
      // Reset form state
      setNewProfileImage(null);
      setPreviewUrl(null);
      setIsDialogOpen(false);
      
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error('Failed to update profile picture:', error);
      const errorMessage = error || 'Failed to update profile picture. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    setPreviewUrl(null);
    setNewProfileImage(null);
    setError(null);
    setIsDialogOpen(false);
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
      case "logout":
        return <Logout />;
      default:
        return <AboutMe />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-3 sm:p-4 md:p-6 mx-auto w-full max-w-[1700px]">
          <div className="mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col md:flex-row items-center md:items-center gap-4 sm:gap-6">
                {/* Profile Picture */}
                <div className="relative group mb-3 md:mb-0">
                  {isLoading || profileLoading ? (
                    <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />
                  ) : (
                    <>
                      {profileImage ? (
                        <Image
                          src={profileImage}
                          alt="Profile"
                          width={96}
                          height={96}
                          className="rounded-full border-4 border-white shadow-lg w-24 h-24 object-cover"
                        />
                      ) : (
                        <div className="rounded-full border-4 border-white shadow-lg w-24 h-24 flex items-center justify-center bg-amber-500 text-white text-4xl font-bold">
                          {userInitial}
                        </div>
                      )}
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                            onClick={() => setIsDialogOpen(true)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <div className="space-y-4">
                            <DialogTitle className="text-lg font-semibold">
                              Update Profile Picture
                            </DialogTitle>

                            {/* Preview */}
                            {previewUrl && (
                              <div className="flex justify-center">
                                <Image
                                  src={previewUrl}
                                  alt="Preview"
                                  width={160}
                                  height={160}
                                  className="rounded-full w-40 h-40 object-cover border-2 border-blue-200"
                                />
                              </div>
                            )}

                            {/* File Upload */}
                            <div className="flex flex-col gap-2">
                              <label className="flex items-center justify-center w-full px-4 py-2 border border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <Upload className="w-5 h-5 mr-2" />
                                {previewUrl ? "Change Photo" : "Upload New Photo"}
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/jpeg,image/png,image/webp"
                                  onChange={handleImageChange}
                                  onClick={(e) => (e.target.value = null)}
                                  id="profile-upload"
                                />
                              </label>
                            </div>

                            {/* Error Message */}
                            {error && (
                              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                                {error}
                              </div>
                            )}

                            {/* Help Text */}
                            <div className="text-xs text-gray-500 space-y-1">
                              <p>• Supported formats: JPEG, PNG, WebP</p>
                              <p>• Maximum file size: 5MB</p>
                              <p>• Recommended size: 400x400 pixels or larger</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                onClick={handleCancel}
                                disabled={imageUploading}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleSaveProfileImage}
                                disabled={!newProfileImage || imageUploading}
                                className="flex items-center"
                              >
                                {imageUploading ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Uploading...
                                  </>
                                ) : (
                                  "Save Changes"
                                )}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  {isLoading || profileLoading ? (
                    <div className="space-y-3">
                      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mx-auto md:mx-0" />
                      <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mx-auto md:mx-0" />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-xl sm:text-2xl font-bold">{userData.name}</h1>
                      <p className="text-gray-600 text-sm sm:text-base">{userData.email}</p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-2">
                        Member since {userData.joinDate}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <ProfileTabs
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />

              <div className="p-3 sm:p-6 overflow-x-auto">
                {isLoading || profileLoading ? (
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

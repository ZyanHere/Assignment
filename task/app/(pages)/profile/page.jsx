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
import { Pencil, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePic } from "@/lib/redux/user/userSlice";
import toast from "react-hot-toast";


const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("about");
  const [profilePic, setProfilePic] = useState("");
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userInitial, setUserInitial] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: session } = useSession();
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    joinDate: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const user = currentUser || session?.user;
    if (user) {
      setUserData({
        name: user.name || "User",
        email: user.email || "",
        joinDate: new Date(user.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        }),
      });
      if (user.profilePic) {
        setProfilePic(user.profilePic);
      } else {
        const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";
        setUserInitial(initial);
      }
      setIsLoading(false);
    }
  }, [currentUser, session]);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Basic validation
    if (!file.type.match("image.*")) {
      toast.error("Please select an image file");
      return;
    }
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProfilePic(imageUrl);
    }
  };

  const handleSaveProfilePic = () => {
    if (newProfilePic) {
      dispatch(updateProfilePic(newProfilePic));
      setProfilePic(newProfilePic);
      setNewProfilePic(null);
      setIsDialogOpen(false);
      toast.success("Profile picture updated !!");
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

        <main className="flex-1 p-2 sm:p-4 md:p-6 mx-auto w-full max-w-[1700px]">
          <div className="mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6">
                {/* Profile Picture */}
                <div className="relative group mx-auto md:mx-0">
                  {isLoading ? (
                    <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />
                  ) : (
                    <>
                      {profilePic ? (
                        <Image
                          src={profilePic}
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
                            {/* ✅ Fix: Use DialogTitle instead of plain h3 */}
                            <DialogTitle className="text-lg font-semibold">
                              Update Profile Picture
                            </DialogTitle>

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
                                  onClick={(e) => (e.target.value = null)}
                                  id="profile-upload"
                                />
                              </label>
                            </div>

                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setIsDialogOpen(false);
                                  setNewProfilePic(null);
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleSaveProfilePic}
                                disabled={!newProfilePic}
                              >
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1 w-full min-w-0">
                  {isLoading ? (
                    <div className="space-y-3">
                      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl font-bold">{userData.name}</h1>
                      <p className="text-gray-600">{userData.email}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Member since {userData.joinDate}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden mt-4">
              <ProfileTabs
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />

              <div className="p-2 sm:p-4 md:p-6">
                {isLoading ? (
                  <div className="space-y-4">
                    <div className="h-8 w-1/2 sm:w-1/3 bg-gray-200 rounded animate-pulse" />
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

// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import ProfileTabs from "@/components/profile/ProfileTabs";
// import AboutMe from "@/components/profile/AboutMe";
// import MyOrders from "@/components/profile/MyOrders";
// import SavedDeal from "@/components/profile/SavedDeal";
// import PaymentMethods from "@/components/profile/PaymentMethods";
// import Messages from "@/components/profile/Messages";
// import Notifications from "@/components/profile/Notifications";
// import Sidebar from "@/components/home/sidebar";
// import Header from "@/components/home/Header";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import Logout from "@/components/profile/Logout";
// import { Button } from "@/components/ui/button";
// import { Pencil, Upload, Loader2 } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { getUserProfile, updateUserProfile } from "@/lib/api/user";

// const ProfilePage = () => {
//   const { data: session } = useSession();
//   const [selectedTab, setSelectedTab] = useState("about");
//   const [profileData, setProfileData] = useState({
//     name: "",
//     email: "",
//     joinDate: "",
//     profilePic: "/profile/default-avatar.jpg"
//   });
//   const [newProfilePic, setNewProfilePic] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [tempProfile, setTempProfile] = useState({});

//   // Fetch user profile data
//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (session?.user?.email) {
//         try {
//           const data = await getUserProfile(session.user.email);
//           setProfileData({
//             name: data.name || "User Name",
//             email: data.email,
//             joinDate: new Date(data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
//             profilePic: data.profilePic || "/profile/default-avatar.jpg"
//           });
//           setTempProfile({
//             name: data.name || "User Name",
//             email: data.email
//           });
//         } catch (error) {
//           console.error("Failed to fetch profile:", error);
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchProfile();
//   }, [session]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setNewProfilePic(imageUrl);
//     }
//   };

//   const handleSaveProfilePic = async () => {
//     if (newProfilePic) {
//       setIsSaving(true);
//       try {
//         // In a real app, you would upload the image to your server here
//         // const uploadedUrl = await uploadImage(newProfilePic);
//         // await updateProfilePicture(uploadedUrl);

//         setProfileData(prev => ({
//           ...prev,
//           profilePic: newProfilePic
//         }));
//       } catch (error) {
//         console.error("Failed to update profile picture:", error);
//       } finally {
//         setIsSaving(false);
//         setNewProfilePic(null);
//       }
//     }
//   };

//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setTempProfile(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const saveProfileChanges = async () => {
//     setIsSaving(true);
//     try {
//       await updateUserProfile({
//         email: session.user.email,
//         name: tempProfile.name
//       });
//       setProfileData(prev => ({
//         ...prev,
//         name: tempProfile.name
//       }));
//       setEditMode(false);
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const renderTabContent = () => {
//     switch (selectedTab) {
//       case "about": return <AboutMe />;
//       case "orders": return <MyOrders />;
//       case "saved": return <SavedDeal />;
//       case "payment": return <PaymentMethods />;
//       case "messages": return <Messages />;
//       case "notifications": return <Notifications />;
//       case "logout": return <Logout />;
//       default: return <AboutMe />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         <Header />

//         <main className="flex-1 p-6">
//           <div className="max-w-7xl mx-auto">
//             {/* Profile Header */}
//             <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
//               <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//                 {/* Profile Picture */}
//                 <div className="relative group">
//                   {isLoading ? (
//                     <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />
//                   ) : (
//                     <>
//                       <Image
//                         src={profileData.profilePic}
//                         alt="Profile"
//                         width={96}
//                         height={96}
//                         className="rounded-full border-4 border-white shadow-lg w-24 h-24 object-cover"
//                         priority
//                       />
//                       <Dialog>
//                         <DialogTrigger asChild>
//                           <Button
//                             variant="secondary"
//                             size="icon"
//                             className="absolute bottom-0 right-0 rounded-full w-8 h-8"
//                           >
//                             <Pencil className="w-4 h-4" />
//                           </Button>
//                         </DialogTrigger>
//                         <DialogContent className="max-w-md">
//                           <div className="space-y-4">
//                             <h3 className="text-lg font-semibold">Update Profile Picture</h3>
//                             <div className="flex justify-center">
//                               <div className="relative">
//                                 <Image
//                                   src={newProfilePic || profileData.profilePic}
//                                   alt="Preview"
//                                   width={160}
//                                   height={160}
//                                   className="rounded-full w-40 h-40 object-cover border"
//                                 />
//                                 {isSaving && (
//                                   <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center">
//                                     <Loader2 className="w-8 h-8 text-white animate-spin" />
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                             <div className="flex flex-col gap-2">
//                               <label className="flex items-center justify-center w-full px-4 py-2 border border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
//                                 <Upload className="w-5 h-5 mr-2" />
//                                 {newProfilePic ? "Change Photo" : "Upload New Photo"}
//                                 <input
//                                   type="file"
//                                   className="hidden"
//                                   accept="image/*"
//                                   onChange={handleImageChange}
//                                 />
//                               </label>
//                             </div>
//                             <div className="flex justify-end gap-2">
//                               <Button variant="outline" disabled={isSaving}>Cancel</Button>
//                               <Button
//                                 onClick={handleSaveProfilePic}
//                                 disabled={!newProfilePic || isSaving}
//                               >
//                                 {isSaving ? (
//                                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                                 ) : "Save Changes"}
//                               </Button>
//                             </div>
//                           </div>
//                         </DialogContent>
//                       </Dialog>
//                     </>
//                   )}
//                 </div>

//                 {/* Profile Info */}
//                 <div className="flex-1">
//                   {isLoading ? (
//                     <div className="space-y-3">
//                       <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
//                       <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
//                     </div>
//                   ) : editMode ? (
//                     <div className="space-y-4">
//                       <input
//                         type="text"
//                         name="name"
//                         value={tempProfile.name}
//                         onChange={handleProfileChange}
//                         className="text-2xl font-bold w-full p-2 border rounded"
//                       />
//                       <p className="text-gray-600">{profileData.email}</p>
//                       <div className="flex gap-2 mt-4">
//                         <Button
//                           onClick={saveProfileChanges}
//                           disabled={isSaving}
//                         >
//                           {isSaving ? (
//                             <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                           ) : "Save"}
//                         </Button>
//                         <Button
//                           variant="outline"
//                           onClick={() => setEditMode(false)}
//                           disabled={isSaving}
//                         >
//                           Cancel
//                         </Button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="space-y-1">
//                       <div className="flex items-center gap-3">
//                         <h1 className="text-2xl font-bold">{profileData.name}</h1>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => setEditMode(true)}
//                           className="w-8 h-8"
//                         >
//                           <Pencil className="w-4 h-4" />
//                         </Button>
//                       </div>
//                       <p className="text-gray-600">{profileData.email}</p>
//                       <p className="text-sm text-gray-500 mt-2">
//                         Member since {profileData.joinDate}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Profile Content */}
//             <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
//               <ProfileTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

//               <div className="p-6">
//                 {renderTabContent()}
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

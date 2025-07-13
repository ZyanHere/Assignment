"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { setProfileData, clearProfileData } from "@/lib/redux/user/userSlice";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("=== AuthProvider Debug ===");
    console.log("Session status:", status);
    console.log("Session data:", session);
    console.log("Session user:", session?.user);
    
    // Sync NextAuth session with Redux profile data
    if (status === "authenticated" && session?.user) {
      console.log("✅ User authenticated, syncing profile data to Redux");
      
      // Extract profile data from session
      const profileData = {
        id: session.user.id || session.user.sub,
        name: session.user.name,
        email: session.user.email,
        phone: session.user.phone,
        role: session.user.role,
        profileImage: session.user.profileImage,
        // Add any other profile fields you want to manage in Redux
      };
      
      console.log("📤 Dispatching setProfileData with data:", profileData);
      
      // Update Redux with profile data
      dispatch(setProfileData(profileData));
    } else if (status === "unauthenticated") {
      console.log("❌ User unauthenticated, clearing profile data");
      // Clear profile data when NextAuth is unauthenticated
      dispatch(clearProfileData());
    } else if (status === "loading") {
      console.log("⏳ Session loading...");
    }
  }, [session, status, dispatch]);

  return <>{children}</>;
}

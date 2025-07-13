import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useMemo } from "react";
import { 
  fetchUserProfile, 
  fetchUserAddresses, 
  fetchUserOrders,
  setProfileData 
} from "@/lib/redux/user/userSlice";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const initializationRef = useRef({ profile: false, addresses: false, orders: false });

  // Use NextAuth for authentication status
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading" || userState?.profileLoading;
  
  // Memoize user data to prevent infinite re-renders
  const user = useMemo(() => ({
    // Authentication data from NextAuth
    id: session?.user?.id || session?.user?.sub,
    email: session?.user?.email,
    token: session?.user?.token,
    
    // Profile data from Redux (with fallback to NextAuth)
    name: userState?.profileData?.name || session?.user?.name,
    phone: userState?.profileData?.phone || session?.user?.phone,
    role: userState?.profileData?.role || session?.user?.role,
    profileImage: userState?.profileImage || session?.user?.profileImage,
    
    // Additional profile data from Redux
    ...userState?.profileData
  }), [
    session?.user?.id,
    session?.user?.sub,
    session?.user?.email,
    session?.user?.token,
    session?.user?.name,
    session?.user?.phone,
    session?.user?.role,
    session?.user?.profileImage,
    userState?.profileData,
    userState?.profileImage
  ]);

  // Initialize profile data when authenticated
  useEffect(() => {
    if (isAuthenticated && session?.user?.token) {
      // Sync session data to Redux if we don't have profile data
      if (!userState?.profileData) {
        const profileData = {
          id: session.user.id || session.user.sub,
          name: session.user.name,
          email: session.user.email,
          phone: session.user.phone,
          role: session.user.role,
          profileImage: session.user.profileImage,
          createdAt: session.user.createdAt,
        };
        dispatch(setProfileData(profileData));
      }

      // Cache management - avoid redundant API calls
      const cacheExpiry = 5 * 60 * 1000; // 5 minutes
      
      // Check if we should fetch profile data
      const shouldFetchProfile = !userState?.lastFetchTime || 
        (Date.now() - userState.lastFetchTime) > cacheExpiry;
      
      // Check if we should fetch addresses
      const shouldFetchAddresses = !userState?.lastAddressFetchTime || 
        (Date.now() - userState.lastAddressFetchTime) > cacheExpiry;

      // Check if we should fetch orders
      const shouldFetchOrders = !userState?.lastOrdersFetchTime || 
        (Date.now() - userState.lastOrdersFetchTime) > cacheExpiry;

      // Fetch fresh profile data if needed and not already fetching
      if (shouldFetchProfile && !initializationRef.current.profile && !userState?.profileLoading) {
        initializationRef.current.profile = true;
        dispatch(fetchUserProfile(session.user.token));
      }

      // Fetch addresses if needed and not already fetching
      if (shouldFetchAddresses && !initializationRef.current.addresses && !userState?.addressLoading) {
        initializationRef.current.addresses = true;
        dispatch(fetchUserAddresses(session.user.token));
      }

      // Fetch orders if needed and not already fetching
      if (shouldFetchOrders && !initializationRef.current.orders && !userState?.ordersLoading) {
        initializationRef.current.orders = true;
        dispatch(fetchUserOrders({ token: session.user.token }));
      }
    }
  }, [
    isAuthenticated, 
    session?.user?.token, 
    dispatch
  ]); // Removed userState from dependencies to prevent infinite loop

  // Reset initialization flags when session changes
  useEffect(() => {
    if (!isAuthenticated) {
      initializationRef.current = { profile: false, addresses: false, orders: false };
    }
  }, [isAuthenticated]);

  // Memoize return object to prevent unnecessary re-renders
  return useMemo(() => ({
    user,
    isAuthenticated,
    isLoading,
    status,
    session,
    
    // Profile state
    profileData: userState?.profileData,
    profileLoading: userState?.profileLoading,
    profileError: userState?.profileError,
    
    // Address state
    addresses: userState?.addresses || [],
    primaryAddress: userState?.primaryAddress,
    addressLoading: userState?.addressLoading,
    addressError: userState?.addressError,
    
    // Order state
    orders: userState?.orders || [],
    currentOrder: userState?.currentOrder,
    ordersLoading: userState?.ordersLoading,
    orderCreating: userState?.orderCreating,
    orderCancelling: userState?.orderCancelling,
    ordersError: userState?.ordersError,
    
    // Image upload state
    imageUploading: userState?.imageUploading,
    
    // State management
    userState,
  }), [
    user,
    isAuthenticated,
    isLoading,
    status,
    session,
    userState?.profileData,
    userState?.profileLoading,
    userState?.profileError,
    userState?.addresses,
    userState?.primaryAddress,
    userState?.addressLoading,
    userState?.addressError,
    userState?.orders,
    userState?.currentOrder,
    userState?.ordersLoading,
    userState?.orderCreating,
    userState?.orderCancelling,
    userState?.ordersError,
    userState?.imageUploading,
    userState
  ]);
}; 
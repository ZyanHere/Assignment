"use client";

import { useEffect } from "react";

import Header from "@/components/home/Header";
import Footer from "@/components/home/footer";
import LocationBannerRedux from "@/components/home/banners/LocationBannerRedux";
import TabContentRedux from "@/components/home/TabContentRedux";
import { useHome } from "@/lib/hooks/useHome";

const HomePage = () => {
  const { 
    fetchComprehensiveHomeData,
    needsDataFetch,
    getCacheStatus,
    categories,
    homeDataLoading,
    homeDataError
  } = useHome();

  // Fetch comprehensive home data only when needed (no data or cache expired)
  useEffect(() => {
    const cacheStatus = getCacheStatus();
    
    if (needsDataFetch()) {
      console.log('HomePage: Data fetch needed, calling comprehensive API');
      console.log('Cache status:', cacheStatus.message);
      fetchComprehensiveHomeData();
    } else {
      console.log('HomePage: Using cached data, skipping API call');
      console.log('Cache status:', cacheStatus.message);
    }
  }, [fetchComprehensiveHomeData, needsDataFetch, getCacheStatus]);

  return (
    <div className="flex-1 bg-white min-h-screen">
      <Header />
      <div className="mx-auto px-4 md:px-8 lg:px-16 xl:px-14">
        {/* Location and Promo Banner */}
        <LocationBannerRedux />
        <div className="p-0 md:p-6">
          <TabContentRedux />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage; 
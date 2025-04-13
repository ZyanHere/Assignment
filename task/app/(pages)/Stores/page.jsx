"use client";
 
 import Link from "next/link";
 import Header from "@/components/home/Header";
 import Sidebar from "@/components/home/sidebar";
 import StoreBanner from "@/components/stores/StoreBanner";
 import StoreCarousel from "@/components/stores/StoreCarousel";
 import storesData from "@/data/storeData";
 import Image from "next/image";
 
 const StoresPage = () => {
   return (
   

       <div className="flex-1 flex flex-col">
        <Header />

         <main className="p-6 mx-auto w-full max-w-[1700px]">
           {/* Breadcrumb - Default "Stores" */}
           <nav className="mb-4 text-black text-4xl">
             <Link href="/stores" className="hover:underline font-medium">
               Stores
             </Link>
           </nav>
 
           <div className="mb-12">
            <StoreBanner />
          </div>

 
           <div className="mt-12 bg-white rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/store/store2.png"
              width={1500}
              height={400}
              className="w-full h-auto object-cover"
              alt="Special offers"
              priority
            />
          </div>
 
          <section className="space-y-16 mt-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Stores Nearby
            </h2>
            
            {Object.entries(storesData).map(([key, store]) => (
              <StoreCarousel 
                key={key} 
                slug={key} 
                {...store} 
                className="mb-12 last:mb-0"
              />
            ))}
          </section>
         </main>
       </div>
   );
 };
 
 export default StoresPage;
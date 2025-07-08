"use client";
import { useParams } from "next/navigation";
import Header from "@/components/home/Header";
import StoreSlugBanner from "@/components/stores/SlugBanner";
import storesData from "@/data/storeData";
import StoreCarousel from "@/components/stores/StoreCarousel";
import Image from "next/image";
import Link from "next/link";

const StoreSlugPage = () => {
  const { slug } = useParams();
  const store = storesData[slug];

  if (!store) {
    return (
      <div className="flex min-h-screen overflow-hidden">
        <div className="flex-1 bg-gray-50 flex items-center justify-center">
          <p className="text-2xl text-red-600 font-medium">Store not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <div className="px-4 sm:px-6 max-w-screen-xl w-full mx-auto overflow-hidden">
        {/* Breadcrumb */}
        <nav className="mt-6 mb-4 text-black text-2xl">
          <Link href="/stores" className="hover:underline font-medium">
            Stores
          </Link>{" "}
          &gt; {store.name}
        </nav>

        {/* Store Banner */}
        <StoreSlugBanner
          name={store.name}
          location={store.location}
          banner={store.banner}
        />

        {/* Promo Image - Responsive and well spaced */}
        <div className="relative w-full aspect-[3/1] rounded-xl shadow-lg overflow-hidden mt-[100px]">
          <Image
            src={`/store/${slug}-promo.png`}
            alt={`${store.name} promotion`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Dynamic Sections */}
        <div className="mt-12 space-y-20 mb-24">
          {store.sections.map((section) => {
            const sectionProducts = store.products.filter(
              (product) => product.category === section
            );

            return (
              <section key={section}>
                <h2 className="text-3xl font-bold mb-8 text-gray-900">
                  {section}
                </h2>
                {sectionProducts.length > 0 ? (
                  <StoreCarousel
                    slug={slug}
                    name={store.name}
                    location={store.location}
                    logo={store.logo}
                    distance={store.distance}
                    products={sectionProducts}
                  />
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <p className="text-gray-500 text-lg">
                      No products available in this category
                    </p>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoreSlugPage;




//if this lower part doesnot work, start with the above code snippet

// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import Header from "@/components/home/Header";
// import Sidebar from "@/components/home/sidebar";
// import StoreSlugBanner from "@/components/stores/SlugBanner";
// import StoreCarousel from "@/components/stores/StoreCarousel";
// import Image from "next/image";
// import Link from "next/link";

// const StoreSlugPage = () => {
//   const { slug } = useParams();
//   const [storeInfo, setStoreInfo] = useState(null);
//   const [productsBySection, setProductsBySection] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // 1) Fetch "storeInfo" (e.g. name, location, banner, sections) from your Store Service
//   //    You said you already have a Store Service: GET /api/stores/:slug
//   //    which returns { slug, name, location, logo, distance, banner, sections, … }.
//   useEffect(() => {
//     async function fetchStoreInfo() {
//       try {
//         const res = await fetch(`/api/stores/${slug}`);
//         if (!res.ok) throw new Error("Store not found");
//         const json = await res.json();
//         setStoreInfo(json.data); // using ApiResponse format
//       } catch (e) {
//         console.error(e);
//         setError("Store not found");
//       }
//     }
//     fetchStoreInfo();
//   }, [slug]);

//   // 2) Once we know storeInfo.sections = ["Fashion", "Apparel", …], fetch products for each
//   useEffect(() => {
//     if (!storeInfo) return;

//     const fetchAllSections = async () => {
//       try {
//         const results = {};
//         // Fire requests for each section in parallel
//         await Promise.all(
//           storeInfo.sections.map(async (sectionName) => {
//             const res = await fetch(
//               `/api/products/store/${slug}/${encodeURIComponent(sectionName)}`
//             );
//             if (!res.ok) {
//               results[sectionName] = []; // if no products, treat as empty
//               return;
//             }
//             const json = await res.json();
//             // json.data is the array of products returned by ApiResponse
//             results[sectionName] = json.data;
//           })
//         );
//         setProductsBySection(results);
//       } catch (e) {
//         console.error(e);
//         setProductsBySection({});
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllSections();
//   }, [storeInfo, slug]);

//   if (error) {
//     return (
//       <div className="flex min-h-screen">
//         <Sidebar />
//         <div className="flex-1 bg-gray-50 flex items-center justify-center">
//           <p className="text-2xl text-red-600 font-medium">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!storeInfo || loading) {
//     return (
//       <div className="flex min-h-screen">
//         <Sidebar />
//         <div className="flex-1 bg-gray-50 flex items-center justify-center">
//           <p className="text-2xl text-gray-600">Loading…</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1">
//         <Header />

//         <div className="p-6 mx-auto">
//           {/* Breadcrumb */}
//           <nav className="mb-4 text-black text-2xl">
//             <Link href="/stores" className="hover:underline font-medium ">
//               Stores
//             </Link>{" "}
//             &gt; {storeInfo.name}
//           </nav>

//           {/* Store Banner */}
//           <StoreSlugBanner
//             name={storeInfo.name}
//             location={storeInfo.location}
//             banner={storeInfo.banner}
//           />

//           {/* Promo Image */}
//           <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
//             <Image
//               src={`/store/${slug}-promo.png`}
//               alt={`${storeInfo.name} promotion`}
//               width={1200}
//               height={500}
//               className="w-full h-[400px] object-cover"
//               priority
//             />
//           </div>

//           {/* Dynamic Sections */}
//           <div className="mt-12 space-y-20">
//             {storeInfo.sections.map((sectionName) => {
//               const sectionProducts = productsBySection[sectionName] || [];
//               return (
//                 <section key={sectionName}>
//                   <h2 className="text-3xl font-bold mb-8 text-gray-900">
//                     {sectionName}
//                   </h2>

//                   {sectionProducts.length > 0 ? (
//                     <StoreCarousel
//                       slug={slug}
//                       name={storeInfo.name}
//                       location={storeInfo.location}
//                       logo={storeInfo.logo}
//                       distance={storeInfo.distance}
//                       products={sectionProducts}
//                     />
//                   ) : (
//                     <div className="text-center py-12 bg-white rounded-lg">
//                       <p className="text-gray-500 text-lg">
//                         No products available in this category
//                       </p>
//                     </div>
//                   )}
//                 </section>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StoreSlugPage;
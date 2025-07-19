"use client";

import BuffetCarousel from "@/components/home/foursec/BuffetCarousel";
import RestaurantCard from "@/components/home/foursec/RestaurentCard";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";
import { buffetData } from "@/data/buffetData";
import Link from "next/link";


const BuffetPage = () => {

  return (
      <div className="flex-1">
        <Header />
        <div className="p-2 sm:p-4 md:p-6 w-full max-w-[1700px] mx-auto">
          <div className="px-1 sm:px-4 md:px-6 lg:px-12">
            
            {/* Breadcrumb */}
            <nav className="mb-6 sm:mb-10 text-black text-2xl sm:text-3xl md:text-4xl flex flex-wrap items-center gap-2">
              <Link href="/" className="hover:underline font-medium">
                Home
              </Link>
              <span className="mx-1 text-gray-400">&gt;</span>
              <Link href="/home/buffet" className="hover:underline font-medium text-yellow-500">
                Restaurants
              </Link>
            </nav>

          
            <BuffetCarousel title="Popular Now" seeAllLink="/home/buffet/popular" items={buffetData.popular} />
            <BuffetCarousel title="In Your Area" seeAllLink="/home/buffet/area" items={buffetData.inYourArea} />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 sm:mt-6 gap-2">
              <h2 className="text-lg sm:text-xl font-semibold">Based on your previous choices</h2>
              <Link href="/home/buffet/choices" className="text-orange-500 text-xs sm:text-sm font-semibold">
                See All
              </Link>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-3 sm:mt-4">
              {buffetData.previousChoices.map((restaurant, index) => (
                <RestaurantCard key={index} {...restaurant} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default BuffetPage;



// "use client";

// import BuffetCarousel from "@/components/home/foursec/BuffetCarousel";
// import RestaurantCard from "@/components/home/foursec/RestaurentCard";
// import Header from "@/components/home/Header";
// import Sidebar from "@/components/home/sidebar";
// import { buffetData } from "@/data/buffetData";
// import Link from "next/link";

// const BuffetPage = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1">
//         <Header />

//         <div className="p-6">
//           <div className="px-6 md:px-12">
//             {/* Breadcrumb */}
//             <nav className="mb-4 text-black text-4xl">
//               <Link href="/" className="hover:underline font-medium">
//                 Home
//               </Link>{" "}
//               &gt;{" "}
//               <Link href="/buffet" className="hover:underline font-medium">
//                 Restaurants
//               </Link>
//             </nav>

//             {/* Buffet Sections */}
//             <BuffetCarousel title="Popular Now" seeAllLink="/buffet/popular" items={buffetData.popular} />
//             <BuffetCarousel title="In Your Area" seeAllLink="/buffet/area" items={buffetData.inYourArea} />

//             {/* Previous Choices Section */}
//             <div className="flex justify-between items-center mt-6">
//               <h2 className="text-xl font-semibold">Based on your previous choices</h2>
//               <Link href="/buffet/choices" className="text-orange-500 text-sm font-semibold">
//                 See All
//               </Link>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//               {buffetData.previousChoices.map((restaurant, index) => (
//                 <RestaurantCard key={index} {...restaurant} index={index} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuffetPage;


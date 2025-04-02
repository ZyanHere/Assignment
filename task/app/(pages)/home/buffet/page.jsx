"use client";

import BuffetCarousel from "@/components/home/foursec/BuffetCarousel";
import RestaurantCard from "@/components/home/foursec/RestaurentCard";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";
import { buffetData } from "@/data/buffetData";
import Link from "next/link";


const BuffetPage = () => {

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <div className="px-6 md:px-12">
            
            {/* Breadcrumb */}
            <nav className="mb-10 text-black text-4xl">
              <Link href="/" className="hover:underline font-medium">
                Home
              </Link>
              {" > "}
              <Link href="/home/buffet" className="hover:underline font-medium text-yellow-500">
                Restaurants
              </Link>
            </nav>

          
            <BuffetCarousel title="Popular Now" seeAllLink="/home/buffet/popular" items={buffetData.popular} />
            <BuffetCarousel title="In Your Area" seeAllLink="/home/buffet/area" items={buffetData.inYourArea} />
            
            <div className="flex justify-between items-center mt-6">
              <h2 className="text-xl font-semibold">Based on your previous choices</h2>
              <Link href="/home/buffet/choices" className="text-orange-500 text-sm font-semibold">
                See All
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {buffetData.previousChoices.map((restaurant, index) => (
                <RestaurantCard key={index} {...restaurant} index={index} />
              ))}
            </div>
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


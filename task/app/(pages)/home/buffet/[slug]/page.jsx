"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/home/sidebar";
import Header from "@/components/home/Header";
import RestaurantCard from "@/components/home/foursec/RestaurentCard";
import { buffetData } from "@/data/buffetData";

const BuffetSlugPage = () => {
  const { slug } = useParams();

  // Map the slug to the correct dataset and title.
  const sectionMapping = {
    popular: { data: buffetData.popular2, title: "Popular Now" },
    area: { data: buffetData.inYourArea2, title: "In Your Area" },
    choices: { data: buffetData.previousChoices2, title: "Based on Your Previous Choices" },
  };

  const section = sectionMapping[slug];

  if (!section) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 text-2xl">
        Section not found
      </div>
    );
  }

  return (


      <div className="flex-1">
        <Header />

        <div className="p-2 sm:p-4 md:p-6 w-full max-w-[1700px] mx-auto">
          <div className="px-1 sm:px-4 md:px-6 lg:px-12">
            {/* Breadcrumb */}
            <nav className="mb-6 sm:mb-10 text-2xl sm:text-3xl flex flex-wrap items-center gap-2">
              <Link href="/" className="hover:underline font-medium">
                Home
              </Link>
              <span className="mx-2 text-gray-400">&gt;</span>
              <Link href="/buffet" className="hover:underline font-medium">
                Restaurants
              </Link>
              <span className="mx-2 text-gray-400">&gt;</span>
              <span className="font-semibold text-yellow-500">
                {section.title}
              </span>
            </nav>

            {/* Section Heading */}
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{section.title}</h2>

            {/* Restaurant Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {section.data.slice(0, 16).map((restaurant, index) => (
                <RestaurantCard key={index} {...restaurant} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default BuffetSlugPage;

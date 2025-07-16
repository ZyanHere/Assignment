"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/home/Header";
import RestaurantCard from "@/components/home/foursec/RestaurentCard";
import { buffetData } from "@/data/buffetData";

const BuffetSlugPage = () => {
  const { slug } = useParams();

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

      <div className="p-6 w-full max-w-[1700px] mx-auto">
        <div className="px-6 md:px-12">
 
          <nav className="mb-10 text-2xl">
            <Link href="/" className="hover:underline font-medium">
              Home
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <Link href="/buffet" className="hover:underline font-medium">
              Restaurants
            </Link>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="font-semibold text-yellow-500">{section.title}</span>
          </nav>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{section.title}</h2>
            {slug === "choices" && (
              <Link
                href="/buffet/choices"
                className="text-orange-500 hover:underline text-sm font-medium"
              >
                See All
              </Link>
            )}
          </div>

          {/* Edited from grid to  Flex Layout: 1 card per row on mobile, 3 on tablet+ */}
          <div className="flex flex-wrap -mx-2">
            {section.data.slice(0, 16).map((restaurant, index) => (
              <div
                key={index}
                className="w-full md:w-1/3 px-2 mb-4"
              >
                <RestaurantCard {...restaurant} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuffetSlugPage;

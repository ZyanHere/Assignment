"use client";

import Sidebar from "@/app/extra/home/sidebar";
import Header from "@/components/home/Header";
import RestaurantCard from "@/components/home/foursec/RestaurentCard";
import { buffetData } from "@/data/buffetData";
import Link from "next/link";
import { useParams } from "next/navigation";

const BuffetSlugPage = () => {
  const { slug } = useParams();

  // Map the slug to the correct dataset and title.
  const sectionMapping = {
    popular: { data: buffetData.popular2, title: "Popular Now" },
    area: { data: buffetData.inYourArea2, title: "In Your Area" },
    choices: {
      data: buffetData.previousChoices2,
      title: "Based on Your Previous Choices",
    },
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
          {/* Breadcrumb */}
          <nav className="mb-10 text-2xl">
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
          <h2 className="text-2xl font-bold mb-3">{section.title}</h2>

          {/* Restaurant Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

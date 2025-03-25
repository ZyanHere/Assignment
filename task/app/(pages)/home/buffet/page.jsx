"use client";

import BuffetCarousel from "@/components/home/foursec/BuffetCarousel";
import RestaurantCard from "@/components/home/foursec/RestaurentCard";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";
import { buffetData } from "@/data/buffetData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";

const BuffetPage = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  // Ignore "buffet" in breadcrumb but include slugs after it
  const slug = pathParts.length > 1 ? pathParts[1] : null;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <div className="px-6 md:px-12">
            
            {/* Breadcrumb */}
            <Breadcrumb className="flex items-center space-x-2 text-gray-600 text-3xl">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:underline">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <span>›</span>
              <BreadcrumbItem>
                <BreadcrumbLink href="/buffet" className="font-semibold hover:underline text-gray-900">
                  Restaurant
                </BreadcrumbLink>
              </BreadcrumbItem>
              {slug && slug !== "buffet" && (
                <>
                  <span>›</span>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/buffet/${slug}`} className="capitalize hover:underline">
                      {slug.replace(/-/g, " ")}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
            </Breadcrumb>

            {/* Buffet Sections */}
            <BuffetCarousel title="Popular Now" seeAllLink="/buffet/popular" items={buffetData.popular} />
            <BuffetCarousel title="In Your Area" seeAllLink="/buffet/area" items={buffetData.inYourArea} />

            <div className="flex justify-between items-center mt-6">
              <h2 className="text-xl font-semibold">Based on your previous choices</h2>
              <Link href="/buffet/choices" className="text-orange-500 text-sm font-semibold">
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

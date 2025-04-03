"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/home/sidebar";
import Header from "@/components/home/Header";
import categoryData from "@/data/categoryData";
import CategoryCarousel from "@/components/categories/CategoryCarousel";
import { FilterButton } from "../page";

const CategorySlugPage = () => {
  const { slug } = useParams();

  // Find the selected category based on the slug -------> this is for arraysearch
  // const category = categoryData.find((cat) => cat.slug === slug)

  const category = categoryData[slug];

  if (!category) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 text-2xl">
        Category not found
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2 md:px-6 py-1">
            {/* breadcrumb */}
            <nav className="mb-4 text-2xl">
              <Link href="/categories" className="hover:underline font-medium">
                Categories
              </Link>
              <span className="mx-2">&gt;</span>
              <span className="font-semibold text-yellow-500">
                {category.name}
              </span>
            </nav>

            <div className="flex gap-2 w-full md:w-auto">
              <FilterButton>Filters</FilterButton>
              <FilterButton>Sort</FilterButton>
            </div>
          </div>


          {/* subcategories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-2 md:px-8 mt-6">
          {category.subcategories?.map((sub) => (
              <SubcategoryItem key={sub.slug} slug={slug} sub={sub} />
            ))}
          </div>
          <div className="p-8">
            <CategoryCarousel />
          </div>
          <div className="p-8">
            <CategoryCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};


const SubcategoryItem = ({ slug, sub }) => (
  <Link href={`/categories/${slug}/${sub.slug}`} className="group">
    <div className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-xl transition-all">
      <div className="relative w-20 h-20 md:w-24 md:h-24">
        <Image
          src={sub.image || "/categories/default.png"}
          alt={sub.name}
          fill
          className="object-contain"
        />
      </div>
      <p className="text-center mt-2 text-sm md:text-base font-medium group-hover:text-blue-600">
        {sub.name}
      </p>
    </div>
  </Link>
);

export default CategorySlugPage;

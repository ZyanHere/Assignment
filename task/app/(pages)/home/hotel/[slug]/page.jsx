"use client";
import { useState } from "react";
import { useParams } from "next/navigation"; // ✅ Use useParams()
import { hotelsData } from "@/data/hotelsData";
import Header from "@/components/home/Header";
import Sidebar from "@/components/home/sidebar";
import Image from "next/image";
import Link from "next/link";

const HotelSlugPage = () => {
  const params = useParams(); // ✅ Unwrap params properly
  const slug = params.slug; // ✅ Get the slug

  // Determine which dataset to use
  let sectionTitle, hotels;
  if (slug === "popular") {
    sectionTitle = "Most Popular Hotels";
    hotels = hotelsData.mostPopular2;
  } else if (slug === "recommended") {
    sectionTitle = "Recommended Hotels";
    hotels = hotelsData.recommended2;
  } else {
    return (
      <div className="text-center text-red-500 text-xl p-6">Page Not Found</div>
    );
  }

  // State to manage favorite hotels
  const [favorites, setFavorites] = useState([]);

  // Toggle favorite function
  const toggleFavorite = (hotelId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(hotelId)
        ? prevFavorites.filter((id) => id !== hotelId) // Remove from favorites
        : [...prevFavorites, hotelId] // Add to favorites
    );
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        {/* Header */}
        <Header />

        <div className="p-6">
          {/* Breadcrumb */}
          <nav className="text-2xl mb-12">
            <Link href="/" className="text-black">
              Home
            </Link>{" "}
            &gt;{" "}
            <Link href="/home/hotel" className="text-black">
              Hotels
            </Link>{" "}
            &gt;{" "}
            <span className="font-semibold text-yellow-500">
              {sectionTitle}
            </span>
          </nav>

          {/* Section Title */}
          <h2 className="text-3xl font-bold">{sectionTitle}</h2>

          {/* Hotel Grid */}
          <div className="grid grid-cols-2 gap-6">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-lg shadow-lg p-4">
                {/* Hotel Image */}
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  {/* Rating */}
                  <div className="absolute top-2 left-2 bg-gray-900 text-white text-sm px-2 py-1 rounded-lg flex items-center">
                    ⭐ {hotel.rating}
                  </div>
                  {/* Heart Icon */}
                  <button
                    className="absolute top-2 right-2"
                    onClick={() => toggleFavorite(hotel.id)}
                  >
                    <Image
                      src={
                        favorites.includes(hotel.id)
                          ? "/home/shops/Heart-red.svg"
                          : "/home/shops/Heart.svg"
                      }
                      alt="Favorite"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>

                <div className="flex justify-between items-center ">
                  {/* Hotel Info */}
                  <div>
                    <h3 className="text-lg font-semibold mt-4">{hotel.name}</h3>
                    <p className="text-gray-600">{hotel.location}</p>
                  </div>

                  {/* Price */}
                  <div className="flex flex-col mt-2">
                    <span className="text-blue-500 text-xl font-semibold">
                      {hotel.price} Rs
                    </span>
                    <span className="text-gray-500 text-sm">Per Night</span>
                  </div>
                </div>

                {/* Bed & Bath Info */}
                <div className="flex items-center gap-4 text-gray-700 mt-2">
                  <div className="flex items-center">🛏 {hotel.bed} bed</div>
                  <div className="flex items-center">
                    🛁 {hotel.bathroom} bathroom
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSlugPage;

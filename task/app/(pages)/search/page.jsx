"use client";

import Header from "@/components/home/Header";
import { useHome } from "@/lib/hooks/useHome";
import { ChevronDown, ChevronUp, Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCard from "@/components/subcategoryProduct/ProductCard";
import { Slider } from "@/components/ui/slider";

export default function LaptopListingPage() {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const { allProducts, allProductsLoading, fetchAllProducts } = useHome();
  const [sortBy, setSortBy] = useState("Relevance");
  const [expandedSections, setExpandedSections] = useState({
    brand: false,
    type: false,
    processor: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sortOptions = [
    "Relevance",
    "Popularity",
    "Price: Low to High",
    "Price: High to Low",
    "Newest First",
  ];

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts
    ? allProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];
  const totalPages = allProducts
    ? Math.ceil(allProducts.length / productsPerPage)
    : 0;

  const processedProducts = currentProducts.map((product) => ({
    ...product,
    images: Array.isArray(product.images)
      ? product.images.map((img) => ({
          ...img,
          url: encodeURI(img.url),
        }))
      : product.images,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-6">Filters</h2>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">PRICE</h3>
                <div className="space-y-6">
                  {/* Price Display */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>

                  {/* Dual Range Slider */}
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value)}
                      max={5000}
                      min={0}
                      step={50}
                      className="w-full"
                      minStepsBetweenThumbs={1}
                    />
                  </div>

                  {/* Manual Input Fields */}
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">
                        Min Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-sm text-gray-500">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => {
                            const value = Math.max(
                              0,
                              Math.min(5000, parseInt(e.target.value) || 0)
                            );
                            if (value <= priceRange[1]) {
                              setPriceRange([value, priceRange[1]]);
                            }
                          }}
                          min="0"
                          max="5000"
                          className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="flex items-center pt-6">
                      <span className="text-gray-500 text-sm">to</span>
                    </div>

                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">
                        Max Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-sm text-gray-500">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => {
                            const value = Math.max(
                              0,
                              Math.min(5000, parseInt(e.target.value) || 0)
                            );
                            if (value >= priceRange[0]) {
                              setPriceRange([priceRange[0], value]);
                            }
                          }}
                          min="0"
                          max="5000"
                          className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="5000"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* Brand */}
              <div className="mb-8">
                <button
                  onClick={() => toggleSection("brand")}
                  className="flex items-center justify-between w-full font-medium text-gray-900 mb-3"
                >
                  Category
                  {expandedSections.brand ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                {expandedSections.brand && (
                  <div className="space-y-2">
                    {/* Brand options would go here */}
                  </div>
                )}
              </div>

              {/* Type */}
              <div className="mb-8">
                <button
                  onClick={() => toggleSection("type")}
                  className="flex items-center justify-between w-full font-medium text-gray-900 mb-3"
                >
                  SubCategory
                  {expandedSections.type ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>

             
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Product Grid */}
            <div className="space-y-6">
              {/* Results count */}
              <div className="mb-6">
                <h1 className="text-xl font-medium mb-4">
                  Showing {indexOfFirstProduct + 1} –{" "}
                  {Math.min(indexOfLastProduct, allProducts?.length || 0)} of{" "}
                  {allProducts?.length || 0} results
                </h1>

                {/* Sort Options - keep existing sort options code */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Sort By</span>
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={`text-sm px-3 py-1 rounded ${
                        sortBy === option
                          ? "text-blue-600 bg-blue-50 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              {allProductsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 rounded-lg h-48 mb-2"></div>
                      <div className="bg-gray-200 rounded h-4 mb-1"></div>
                      <div className="bg-gray-200 rounded h-3 w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : processedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {processedProducts.map((product) => (
                      <div key={product._id}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>

                  {/* Add Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() =>
                                setCurrentPage(Math.max(1, currentPage - 1))
                              }
                              className={
                                currentPage === 1
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>

                          {[...Array(Math.min(5, totalPages))].map((_, i) => {
                            const pageNum = i + 1;
                            return (
                              <PaginationItem key={pageNum}>
                                <PaginationLink
                                  onClick={() => setCurrentPage(pageNum)}
                                  isActive={currentPage === pageNum}
                                  className="cursor-pointer"
                                >
                                  {pageNum}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })}

                          {totalPages > 5 && <PaginationEllipsis />}

                          <PaginationItem>
                            <PaginationNext
                              onClick={() =>
                                setCurrentPage(
                                  Math.min(totalPages, currentPage + 1)
                                )
                              }
                              className={
                                currentPage === totalPages
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-gray-500 py-8 sm:py-12">
                  No products found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

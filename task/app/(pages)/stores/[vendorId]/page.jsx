"use client"

import { motion } from "framer-motion"
import useSWR from "swr"
import { useParams } from "next/navigation"
import { fetcher } from "@/lib/api"
import Link from "next/link"
import Header from "@/components/home/Header"
import StoreCard from "@/components/stores/StoreCard"
import StoreSkeleton from "@/components/stores/StoresSkeleton"
import SlugBanner from "@/components/stores/SlugBanner"
import { Store, MapPin, Package, ChevronRight } from "lucide-react"

export default function StoreSlugPage() {
  const { vendorId } = useParams()

  const { data: vendorResp, isLoading: isVendorLoading } = useSWR(
    [`/lmd/api/v1/retail/vendor/public/${vendorId}`, false],
    ([url, withCredentials]) => fetcher(url, withCredentials),
  )

  const { data: productResp, isLoading: isProductLoading } = useSWR(
    [`/lmd/api/v1/retail/vendor/public/${vendorId}/products`, false],
    ([url, withCredentials]) => fetcher(url, withCredentials),
  )

  const vendor = vendorResp?.data
  const products = productResp?.data || []
  const loading = isProductLoading || isVendorLoading

  if (loading || !vendor || !products) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <StoreSkeleton />
      </div>
    )
  }

  const { store_name, bannerUrl, carouselUrls, vendor_id } = vendor

  // Transform product data
  const formattedProducts = products.map((p) => {
    const variant = p.variants?.[0]?.price || {}
    const mrp = variant.base_price ?? 0
    const salePrice = variant.sale_price > 0 ? variant.sale_price : mrp

    return {
      id: p.id,
      name: p.name,
      category: p.category?.name || "Others",
      image: p.images?.[0]?.url || "/placeholder-image.jpg",
      price: salePrice,
      mrp,
      rating: {
        average: p.rating?.average || 0,
        count: p.rating?.count || 0,
      },
      variants: p.variants,
    }
  })

  // Unique categories from product list
  const productCategories = Array.from(new Set(formattedProducts.map((p) => p.category).filter(Boolean)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <Header />

      <main className="px-4 sm:px-6 md:px-8 lg:px-12 pb-12 mx-auto w-full max-w-[1700px] relative z-10">
        {/* Enhanced Breadcrumb */}
        <motion.nav
          className="mt-8 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 text-lg font-medium">
              <Store className="w-5 h-5 text-blue-600" />
              <Link
                href="/stores"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-300 flex items-center gap-1"
              >
                Stores
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {store_name}
              </span>
            </div>
          </div>
        </motion.nav>

        {/* Enhanced Banner */}
        {bannerUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="backdrop-blur-md bg-white/20  rounded-3xl p-6 ">
              <SlugBanner
                bannerUrl={bannerUrl}
                storeName={vendor.store_name}
                fullAddress={vendor.fullAddress}
                duration={3 * 60 * 60 + 60 + 23}
              />
            </div>
          </motion.div>
        )}

        {/* Store Info Card */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <Store className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{store_name}</h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{vendor.fullAddress || "Location not specified"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{formattedProducts.length}</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{productCategories.length}</div>
                  <div className="text-sm text-gray-600">Categories</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Grouped by Category */}
        {productCategories.length > 0 ? (
          <div className="space-y-12">
            {productCategories.map((categoryName, categoryIndex) => {
              const categoryProducts = formattedProducts.filter((p) => p.category === categoryName)

              return (
                <motion.div
                  key={categoryName}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                >
                  <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl">
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800">{categoryName}</h2>
                          <p className="text-gray-600">{categoryProducts.length} products available</p>
                        </div>
                      </div>

                      <motion.div
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View All
                      </motion.div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {categoryProducts.map((product, productIndex) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: categoryIndex * 0.1 + productIndex * 0.05,
                          }}
                        >
                          <StoreCard product={product} storeName={store_name} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-2xl p-12 shadow-xl">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Package className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Available</h3>
              <p className="text-gray-600 mb-6">This store doesn't have any products listed yet.</p>
              <Link
                href="/stores"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Store className="w-5 h-5" />
                Browse Other Stores
              </Link>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

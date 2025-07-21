"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import { fetcher } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/Header";
import StoreCard from "@/components/stores/StoreCard";
import StoreSkeleton from "@/components/stores/StoresSkeleton";

export default function StoreSlugPage() {
  const { vendorId } = useParams();

  const { data: vendorResp, isLoading: isVendorLoading } = useSWR(
    `/lmd/api/v1/retail/vendor/public/${vendorId}`,
    fetcher
  );

  const { data: productResp, isLoading: isProductLoading } = useSWR(
    `/lmd/api/v1/retail/vendor/public/${vendorId}/products`,
    fetcher
  );

  const vendor = vendorResp?.data;
  const products = productResp?.data || [];

  const loading = isProductLoading || isVendorLoading;


  if (loading || !vendor || !products) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <StoreSkeleton />
      </div>
    )
  };

  const {
    store_name,
    bannerUrl,
    carouselUrls,
    vendor_id,
  } = vendor;

  // Transform product data
  const formattedProducts = products.map((p) => {
    const variant = p.variants?.[0]?.price || {};
    const mrp = variant.base_price ?? 0;
    const salePrice = variant.sale_price > 0 ? variant.sale_price : mrp;

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
    };
  });

  // Unique categories from product list
  const productCategories = Array.from(
    new Set(formattedProducts.map((p) => p.category).filter(Boolean))
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="pl-12 pr-12 pb-12 mx-auto w-full max-w-[1700px]">
        {/* Breadcrumb */}
        <nav className="mt-8 mb-8 text-black text-2xl">
          <Link href="/stores" className="hover:underline font-medium">
            Stores
          </Link>{" "}
          &gt; <span className="font-semibold text-yellow-500">{store_name}</span>
        </nav>

        {/* Banner */}
        {bannerUrl && (
          <div className="relative w-full aspect-[3/1] rounded-xl shadow-lg overflow-hidden">
            <Image
              src={bannerUrl}
              alt={`${store_name} banner`}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Promo (carouselUrls[0]) */}
        {carouselUrls?.length > 0 && (
          <div className="my-10">
            <Image
              src={carouselUrls[0]}
              alt={`${store_name} promotion`}
              width={1500}
              height={340}
              className="w-[1500px] h-[340px] mx-auto rounded-xl shadow-lg"

            />
          </div>
        )}

        {/* Products Grouped by Category */}
        {productCategories.length > 0 ? (
          productCategories.map((categoryName) => {
            const categoryProducts = formattedProducts.filter(
              (p) => p.category === categoryName
            );

            return (
              <div key={categoryName} className="mb-12">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                  {categoryName}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {categoryProducts.map((product) => (
                    <StoreCard
                      key={product.id}
                      product={product}
                      storeName={store_name}
                    />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No products available for this store.
          </div>
        )}
      </main>
    </div>
  );
}

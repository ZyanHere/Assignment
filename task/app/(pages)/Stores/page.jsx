"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";
import Header from "@/components/home/Header";
import StoreBanner from "@/components/stores/StoreBanner";
import StoreCarousel from "@/components/stores/StoreCarousel";

function StoreSection({ vendor }) {
  const { vendor_id, store_name, city, images } = vendor;
  const logo = images.logoUrl || "/store/default-logo.png";
  const distance = vendor.distance || "–";

  const { data, error } = useSWR(
    `/lmd/api/v1/retail/vendor/public/${vendor_id}/products`,
    fetcher
  );

  if (error || !data || !Array.isArray(data.data)) return null;

  const products = data.data
    .map((p) => {
      const variantPrice = p.variants?.[0]?.price || {};
      const mrp = variantPrice.base_price ?? 0;
      const salePrice = variantPrice.sale_price > 0 ? variantPrice.sale_price : mrp;
      return {
        id: p.id,
        name: p.name,
        category: p.category.name,
        image: p.images[0]?.url || "/placeholder-image.jpg",
        price: salePrice,
        mrp: mrp,
        rating: { average: p.rating.average, count: p.rating.count },
      };
    });
    

  if (products.length === 0) return null;

  return (
    <div className="mb-16 last:mb-0">
      <StoreCarousel
        vendorId={vendor_id}
        name={store_name}
        location={city}
        logo={logo}
        distance={distance}
        products={products}
      />
    </div>
  );
}

export default function StoresPage() {
  const { data: resp, error } = useSWR(
    "/lmd/api/v1/retail/vendor/public",
    fetcher
  );

  if (error || !resp?.data) return null;

  const vendors = resp.data;

  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <main className="p-6 mx-auto w-full max-w-[1700px]">
        <div className="mb-12">
          <StoreBanner />
        </div>
        <nav className="mb-4 text-black text-4xl">
          <span className="font-medium">Stores</span>
        </nav>
        {vendors.map((vendor) => (
          <StoreSection key={vendor.vendor_id} vendor={vendor} />
        ))}
      </main>
    </div>
  );
}

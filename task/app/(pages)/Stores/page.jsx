"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/api";
import Header from "@/components/home/Header";
import StoreBanner from "@/components/stores/StoreBanner";
import StoreCarousel from "@/components/stores/StoreCarousel";


function StoreSection({ vendor }) {
  const { vendor_id, store_name, city, images } = vendor;
  const slug     = vendor_id.toLowerCase();
  const logo     = images.logoUrl   || "/store/default-logo.png";
  const distance = vendor.distance  || "–";

  // 1) Fetch this vendor’s products
  const { data, error, isLoading } = useSWR(
    `/lmd/api/v1/retail/vendor/public/${vendor_id}/products`,
    fetcher
  );

  if (isLoading) {
    return (
      <div className="p-6 text-center">
         Loading {store_name} products…
      </div>
    );
  }
  if (error) {
    console.error(`Error loading products for ${store_name}:`, error);
    return (
      <p className="p-6 text-red-500">
        Failed to load {store_name} products.
      </p>
    );
  }

  // 2) Debug raw API prices
  data.data.forEach((p) => {
    console.log(
      `[DEBUG] Vendor ${vendor_id} — Product ${p.id} (“${p.name}”) variant price:`,
      p.variants?.[0]?.price
    );
  });

  // 3) Map API → StoreCarousel props with fallback
  const products = data.data.map((p) => {
    const variantPrice = p.variants?.[0]?.price || {};
    const mrp         = variantPrice.base_price ?? 0;
    const salePrice   = variantPrice.sale_price > 0 ? variantPrice.sale_price : mrp;

    // Debug mapped result
    console.log(
      `[DEBUG] Mapped product ${p.id}: mrp=${mrp}, price=${salePrice}`
    );

    return {
      id:       p.id,
      name:     p.name,
      category: p.category.name,
      image:    p.images[0]?.url || "/placeholder-image.jpg",
      price:    salePrice,
      mrp:      mrp,
      rating:   { average: p.rating.average, count: p.rating.count },
    };
  });

  return (
    <div className="mb-16 last:mb-0">
      <StoreCarousel
        slug={slug}
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
  // 1) Fetch all vendors
  const { data: resp, error, isLoading } = useSWR(
    "/lmd/api/v1/retail/vendor/public",
    fetcher
  );

  if (isLoading) {
    return <p className="p-6">Loading stores…</p>;
  }
  if (error) {
    console.error("[DEBUG] Failed to load vendors:", error);
    return (
      <p className="p-6 text-red-500">
        Couldn’t load stores (status {error.status || "?"}).
      </p>
    );
  }

  const vendors = resp.data;
  console.log("[DEBUG] Fetched vendors list:", vendors.map(v => v.vendor_id));

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

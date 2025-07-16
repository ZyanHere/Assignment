"use client";

import Header from "@/components/home/Header";
import StoreBanner from "@/components/stores/StoreBanner";
import StoreCarousel from "@/components/stores/StoreCarousel";
import { useEffect } from "react";
import { useStores } from "@/lib/hooks/useStores";

function StoreSection({ vendor }) {
  const { fetchVendorProducts, productsByVendor, productsLoading } = useStores();
  const { vendor_id, store_name, city, images } = vendor;
  const logo = images.logo || "/store/default-logo.png";
  const distance = vendor.distance || "–";

  useEffect(() => {
    fetchVendorProducts(vendor_id);
  }, [fetchVendorProducts, vendor_id]);

  const productsRaw = productsByVendor[vendor_id] || [];
  const products = productsRaw.map((p) => {
    // Prefer first variant for price/stock, fallback to product-level fields
    const variant = Array.isArray(p.variants) && p.variants.length > 0 ? p.variants[0] : {};
    const variants = Array.isArray(p.variants) && p.variants.length > 0 ? p.variants : {}
    const variantPrice = variant.price || {};
    const mrp = variantPrice.base_price ?? p.mrp ?? 0;
    const salePrice = variantPrice.sale_price > 0
      ? variantPrice.sale_price
      : (p.price ?? mrp);
    const stock = variant.stock?.quantity ?? p.stock ?? null;

    // Always ensure category is a string
    let category = '';
    if (Array.isArray(p.category)) {
      category = p.category.map(c => c.name).join(', ');
    } else if (typeof p.category === 'object' && p.category !== null) {
      category = p.category.name || '';
    }

    return {
      id: p.id,
      name: p.name,
      category,
      image: (Array.isArray(p.images) && p.images[0]?.url) ? p.images[0].url : "/placeholder-image.jpg",
      price: salePrice,
      mrp: mrp,
      rating: { average: p.rating?.average ?? 0, count: p.rating?.count ?? 0 },
      stock: stock,
      variants: variants,
    };
  });
  const loading = productsLoading[vendor_id];

  if (loading) {
    return (
      <div className="mb-16 last:mb-0 animate-pulse">
        <div className="h-40 bg-gray-100 rounded-lg mb-4" />
        <div className="h-6 w-1/3 bg-gray-200 rounded mb-2" />
        <div className="h-6 w-1/4 bg-gray-200 rounded" />
      </div>
    );
  }
  if (!products.length) return null;

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
  const { vendors, vendorsLoading, vendorsError, fetchVendors } = useStores();

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  if (vendorsLoading) {
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4 sm:p-6 md:p-8 mx-auto w-full max-w-[1700px]">
          <div className="mb-8 animate-pulse">
            <div className="h-32 bg-gray-100 rounded-lg mb-4" />
            <div className="h-8 w-1/3 bg-gray-200 rounded mb-2" />
            <div className="h-8 w-1/4 bg-gray-200 rounded" />
          </div>
        </main>
      </div>
    );
  }
  if (vendorsError) {
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4 sm:p-6 md:p-8 mx-auto w-full max-w-[1700px] flex items-center justify-center">
          <div className="text-center text-red-500 text-lg font-semibold">Failed to load stores.</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8 mx-auto w-full max-w-[1700px]">
        <div className="mb-12">
          <StoreBanner />
        </div>
        <nav className="mb-4 text-black text-2xl sm:text-3xl md:text-4xl font-medium">
          Stores
        </nav>
        <div className="space-y-12">
          {vendors.map((vendor) => (
            <StoreSection key={vendor.vendor_id} vendor={vendor} />
          ))}
        </div>
      </main>
    </div>
  );
}

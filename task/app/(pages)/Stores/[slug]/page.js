"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import StoreCard from "@/components/stores/StoreCard";
import storesData from "@/data/storeData";

export default function StorePage() {
  const { slug } = useParams();
  const store = storesData[slug];

  if (!store) return <p className="p-6">Store not found</p>;

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <nav className="mb-4 text-gray-600 text-sm">
        <Link href="/stores" className="hover:underline">
          Stores
        </Link>
        <span> &gt; {store.name}</span>
      </nav>

      {/* Store Header */}
      <div className="flex items-center gap-3">
        <img src={store.logo} alt={store.name} className="w-12 h-12 rounded-full" />
        <h1 className="text-2xl font-bold">{store.name}, {store.location}</h1>
      </div>

      {/* Store Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {store.products.map((product) => (
          <StoreCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import storesData from "@/data/storeData";
import ProductClient from "./ProductClient";

export async function generateStaticParams() {
  // Combine products from all data sources
  const allProducts = [
    ...storesData["natures-basket"].products,
    ...storesData["pantaloons"].products,
    ...storesData["metro"].products,
  ];

  return allProducts.map((product) => ({
    productId: product.id.toString(),
  }));
}

export default function ProductPage({ params }) {
  // Find product across all data sources
  const allProducts = [
    ...storesData["natures-basket"].products,
    ...storesData["pantaloons"].products,
    ...storesData["metro"].products,
  ];

  const product = allProducts.find((p) => p.id.toString() === params.productId);

  if (!product) {
    notFound();
  }

  return <ProductClient product={product} />;
}

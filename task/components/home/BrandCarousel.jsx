"use client";

import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const BrandCarousel = ({ data = [], loading = false }) => {
  if (loading) {
    return (
      <div className="flex gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-[260px] w-[170px] rounded-lg" />
        ))}
      </div>
    );
  }

  const mappedProducts = data.map((p) => {
    const variant = p.variants?.[0] || {};
    const basePrice = variant?.price?.base_price || 0;
    const salePrice = variant?.price?.sale_price || basePrice;

    return {
      id: p._id,
      name: p.name,
      brand: p.brand,
      seller: p.vendor_store_id?.store_name || "Unknown Seller",
      discountedPrice: salePrice,
      originalPrice: basePrice,
      image: variant?.images?.[0]?.url || p.images?.[0]?.url || "/fallback.png",
      weight:
        p.attributes?.find((attr) => attr.name?.toLowerCase() === "weight")
          ?.value || "1 unit",
      time: p.timing?.end_date || null,
      discount:
        basePrice && salePrice
          ? Math.round(((basePrice - salePrice) / basePrice) * 100)
          : 0,
      variants: p.variants,
      category: p.category,
      subcategory: p.subcategory
    };
  });

  return (
    <Carousel className="w-full mx-auto">
      <CarouselContent className="-ml-1">
        {mappedProducts.map((product) => (
          <CarouselItem
            key={product.id}
            className="pl-2 basis-full xs:basis-1/2 sm:basis-1/3 md:basis-[20%] lg:basis-[16.666%] xl:basis-[12.5%]"
          >
            <div className="p-1">
              <ProductCard product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex left-0" />
      <CarouselNext className="hidden sm:flex right-0" />
    </Carousel>
  );
};

export default BrandCarousel;

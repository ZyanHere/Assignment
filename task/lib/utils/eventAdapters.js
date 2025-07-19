// lib/utils/eventAdapter.js
import { slugify } from "./slugify";

/**
 * Normalize a single variant from API product
 */
function normalizeVariant(v) {
  if (!v) return null;
  const images = Array.isArray(v.images) ? v.images : [];
  const primaryImage =
    images.find((img) => img?.is_primary)?.url ||
    (images[0] && images[0].url) ||
    "";
  return {
    id: String(v._id || v.id || ""),
    name: v.variant_name || "",
    price: {
      base: v.price?.base_price ?? 0,
      sale: v.price?.sale_price ?? v.price?.base_price ?? 0,
      discount_percentage: v.price?.discount_percentage ?? null,
    },
    stock: {
      quantity: v.stock?.quantity ?? 0,
      available: v.available_quantity ?? v.stock?.quantity ?? 0,
      low_stock_threshold: v.stock?.low_stock_threshold ?? null,
      is_low_stock: v.is_low_stock ?? false,
    },
    images,
    primaryImage,
    raw: v,
  };
}

/**
 * Pick a poster image for product
 */
function choosePoster(product, normalizedVariants) {
  // Try variant primary image
  const variantPrimary = normalizedVariants
    .flatMap((v) => v ? v.images : [])
    .find((img) => img?.is_primary)?.url;

  if (variantPrimary) return variantPrimary;

  // Try product-level primary image
  const productPrimary = product.images?.find((img) => img?.is_primary)?.url;
  if (productPrimary) return productPrimary;

  // Fallback: first variant image
  const firstVariantImage = normalizedVariants
    .flatMap((v) => v ? v.images : [])
    .find((img) => img?.url)?.url;
  if (firstVariantImage) return firstVariantImage;

  // Fallback: first product image
  return product.images?.[0]?.url || "";
}

/**
 * Determine canonical price: lowest sale (or base) among variants
 */
function derivePrice(normalizedVariants) {
  if (!normalizedVariants.length) {
    return { base: 0, sale: 0, hasDiscount: false };
  }
  let cheapest = normalizedVariants[0];
  for (const v of normalizedVariants) {
    const candidate = v.price.sale ?? v.price.base;
    const current = cheapest.price.sale ?? cheapest.price.base;
    if (candidate < current) cheapest = v;
  }
  return {
    base: cheapest.price.base,
    sale: cheapest.price.sale,
    hasDiscount:
      cheapest.price.sale !== null &&
      cheapest.price.sale !== undefined &&
      cheapest.price.sale < cheapest.price.base,
  };
}

/**
 * Normalize a product (event-like entity)
 */
export function normalizeEvent(product) {
  const variantsRaw = Array.isArray(product.variants) ? product.variants : [];
  const variants = variantsRaw.map(normalizeVariant).filter(Boolean);

  const poster = choosePoster(product, variants);
  const price = derivePrice(variants);

  return {
    id: String(product._id || product.id || ""),
    title: product.name || (variants[0]?.name ?? "Untitled"),
    slug: slugify(product.name || variants[0]?.name || ""),
    description: product.description || "",
    poster,
    price,                            // { base, sale, hasDiscount }
    ratingAverage: product.rating?.average ?? 0,
    ratingCount: product.rating?.count ?? 0,
    location: product.vendor_store_id?.store_name || "",
    productType: product.product_type || "",
    category: product.category?.name || "",
    subcategory: product.subcategory?.name || "",
    variants,
    // API does not provide event-specific scheduling fields → we supply placeholders
    date: product.date || "Date TBA",
    time: product.time || "Time TBA",
    raw: product,
  };
}

/**
 * Slice sections (since API doesn’t mark upcoming/featured/recommended)
 * You can later replace with flags when backend adds them.
 */
export function adaptEventSections(apiData, { sectionSize = 10 } = {}) {
  const allProducts = Array.isArray(apiData?.allProducts)
    ? apiData.allProducts
    : [];

  const all = allProducts.map(normalizeEvent);

  return {
    all,
    upcomingEvents: all.slice(0, sectionSize),
    featuredEvents: all.slice(sectionSize, sectionSize * 2),
    recommendedEvents: all.slice(sectionSize * 2, sectionSize * 3),
  };
}

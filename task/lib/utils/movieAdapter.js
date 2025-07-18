// lib/utils/movieAdapter.js
import { slugify } from "./slugify";

function normalizeVariant(v) {
  const primaryImage =
    v?.images?.find((img) => img.is_primary)?.url ||
    v?.images?.[0]?.url ||
    "";
  return {
    id: v?._id || v?.id,
    sku: v?.sku || "",
    name: v?.variant_name || "",
    price: {
      base: v?.price?.base_price ?? 0,
      sale: v?.price?.sale_price ?? v?.price?.base_price ?? 0,
      discount: v?.price?.discount_percentage ?? null,
    },
    stock: {
      qty: v?.stock?.quantity ?? 0,
      available: v?.available_quantity ?? v?.stock?.quantity ?? 0,
      lowStockThreshold: v?.stock?.low_stock_threshold ?? 0,
      isLow: !!v?.is_low_stock,
    },
    primaryImage,
    images: v?.images || [],
    attributes: v?.attributes || [],
    status: v?.status || "unknown",
  };
}

function getLowestVariantPrice(variants = []) {
  if (!variants.length) return { base: 0, sale: 0 };
  let low = variants[0];
  for (const v of variants) {
    const sale = v?.price?.sale_price ?? v?.price?.base_price ?? Infinity;
    const currLow = low?.price?.sale_price ?? low?.price?.base_price ?? Infinity;
    if (sale < currLow) low = v;
  }
  return {
    base: low?.price?.base_price ?? 0,
    sale: low?.price?.sale_price ?? low?.price?.base_price ?? 0,
  };
}

function choosePoster(product) {
  const variantPrimary =
    product?.variants?.flatMap((v) => v.images || []).find((img) => img.is_primary)?.url;
  if (variantPrimary) return variantPrimary;

  const productPrimary = product?.images?.find((img) => img.is_primary)?.url;
  if (productPrimary) return productPrimary;

  const firstVariantAny =
    product?.variants?.flatMap((v) => v.images || [])[0]?.url;
  if (firstVariantAny) return firstVariantAny;

  return product?.images?.[0]?.url || "";
}

function normalizeMovie(product) {
  const variants = (product?.variants || []).map(normalizeVariant);
  const { base, sale } = getLowestVariantPrice(product?.variants || []);
  const poster = choosePoster(product);

  const title = product?.name || "Untitled";
  const slug = slugify(title || product?._id || product?.id);

  return {
    id: product?._id || product?.id,
    title,
    slug,
    description: product?.description || "",
    poster,
    ratingAverage: product?.rating?.average ?? 0,
    ratingCount: product?.rating?.count ?? 0,
    storeName: product?.vendor_store_id?.store_name || "",
    storeAddress: product?.vendor_store_id?.fullAddress || "",
    location: product?.vendor_store_id?.store_name || "",
    date: null,
    time: null,
    variants,
    price: { base, sale },
    raw: product,
  };
}

function safeSlice(arr, start, count) {
  return arr.slice(start, start + count);
}

export function adaptMovieSections(data, { sectionSize = 10 } = {}) {
  const allProducts = Array.isArray(data?.allProducts) ? data.allProducts : [];
  const all = allProducts.map(normalizeMovie);

  const fewMinutesLeft = safeSlice(all, 0, sectionSize);
  const popularNow = safeSlice(all, sectionSize, sectionSize);
  const recommended = safeSlice(all, sectionSize * 2, sectionSize);

  return {
    all,
    fewMinutesLeft,
    popularNow,
    recommended,
  };
}

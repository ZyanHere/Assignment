import { slugify } from "./slugify";

function normalizeVariant(v) {
  return {
    id: String(v?._id),
    name: v?.variant_name || "",
    price: {
      base: v?.price?.base_price ?? 0,
      sale: v?.price?.sale_price ?? 0,
    },
    stock: {
      qty: v?.stock?.quantity ?? 0,
      available: v?.available_quantity ?? 0,
    },
  };
}

function getLowestVariantPrice(variants) {
  if (!variants.length) return { base: 0, sale: 0 };
  let low = variants[0];
  for (const v of variants) {
    const curr = v.price.sale ?? v.price.base;
    const best = low.price.sale ?? low.price.base;
    if (curr < best) low = v;
  }
  return { base: low.price.base, sale: low.price.sale };
}

function choosePoster(product) {
  const variantImg = product?.variants?.flatMap(v => v.images || [])
    .find(img => img.is_primary)?.url;
  if (variantImg) return variantImg;
  const productImg = product?.images?.find(img => img.is_primary)?.url;
  return productImg || product?.images?.[0]?.url || "";
}

export function normalizeMovie(product) {
  const variants = (product?.variants || []).map(normalizeVariant);
  const { base, sale } = getLowestVariantPrice(variants);
  return {
    id: String(product._id),
    title: product.name || "Untitled",
    slug: slugify(product.name),
    description: product.description || "",
    poster: choosePoster(product),
    ratingAverage: product.rating?.average ?? 0,
    ratingCount: product.rating?.count ?? 0,
    location: product.vendor_store_id?.store_name || "",
    date: product.date || null,
    time: product.time || null,
    variants,
    price: { base, sale },
    raw: product,
  };
}

export function adaptMovieSections(data, { sectionSize = 10 } = {}) {
  const all = (data.allProducts || []).map(normalizeMovie);
  return {
    all,
    fewMinutesLeft: all.slice(0, sectionSize),
    popularNow: all.slice(sectionSize, sectionSize * 2),
    recommended: all.slice(sectionSize * 2, sectionSize * 3),
  };
}

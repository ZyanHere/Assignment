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

// Helper function to extract meaningful information from product data
function extractProductInfo(product) {
  // Try to get movie-specific timing information
  const timing = product.timing || product.schedule || {};
  const startDate = timing.start_date || timing.startDate || product.date;
  const endDate = timing.end_date || timing.endDate;
  
  // Format date if available
  let formattedDate = null;
  let formattedTime = null;
  
  if (startDate) {
    try {
      const date = new Date(startDate);
      formattedDate = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
      formattedTime = date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } catch (e) {
      // If date parsing fails, use as is
      formattedDate = startDate;
      formattedTime = null;
    }
  }
  
  // Get location information
  const location = product.vendor_store_id?.store_name || 
                   product.location || 
                   product.venue ||
                   product.store_name ||
                   "Available";
  
  // Get category information
  const category = product.category?.name || 
                   product.product_type || 
                   product.type ||
                   "Entertainment";
  
  return {
    date: formattedDate,
    time: formattedTime,
    location,
    category
  };
}

export function normalizeMovie(product) {
  const variants = (product?.variants || []).map(normalizeVariant);
  const { base, sale } = getLowestVariantPrice(variants);
  const productInfo = extractProductInfo(product);
  
  return {
    id: String(product._id),
    title: product.name || "Untitled",
    slug: slugify(product.name),
    description: product.description || "",
    poster: choosePoster(product),
    ratingAverage: product.rating?.average ?? 0,
    ratingCount: product.rating?.count ?? 0,
    location: productInfo.location,
    date: productInfo.date,
    time: productInfo.time,
    category: productInfo.category,
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

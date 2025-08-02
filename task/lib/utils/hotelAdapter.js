// lib/utils/hotelAdapter.js

/**
 * Safely pull a representative image from a product or its first variant.
 */
function getPrimaryImage(p) {
  return (
    p?.images?.[0]?.url ||
    p?.variants?.[0]?.images?.[0]?.url ||
    "/hotels/placeholder.png"
  );
}

/**
 * Safely get a representative location (variant-level preferred).
 */
function getLocation(p) {
  const v = p?.variants?.[0];
  return (
    v?.location ||
    p?.vendor_store_id?.city ||
    p?.vendor_store_id?.address ||
    "N/A"
  );
}

/**
 * Safely get a representative price (variant sale->base fallback).
 */
function getPrice(p) {
  const v = p?.variants?.[0];
  return (
    v?.price?.sale_price ??
    v?.price?.base_price ??
    0
  );
}

/**
 * Format a raw product into the normalized hotel list card shape.
 */
function formatProduct(p) {
  return {
    id: p._id || p.id,
    slug: p.slug || String(p._id || p.id),
    name: p.name,
    img: getPrimaryImage(p),
    rating: {
      average: p?.rating?.average ?? 0,
      count: p?.rating?.count ?? 0,
    },
    price: getPrice(p),
    time: "Check-in Available",
    category: p?.category?.name || "Uncategorized",
    location: getLocation(p),
    variants: Array.isArray(p?.variants) ? p.variants : [],
    raw: p, // optional raw reference (useful for debugging; remove if undesired)
  };
}

/**
 * Adapt API hotel data into sections like inYourArea, previousChoices, allHotels.
 * We currently do a simple slice partition (improve later when API supports tags).
 */
export function adaptHotelSections(apiData) {
  const allProducts = Array.isArray(apiData?.allProducts) ? apiData.allProducts : [];

  const hotels = allProducts
    // The API now filters by product_type === 'hotel_booking', so we can trust all products are hotels
    .map(formatProduct);

  return {
    // We'll treat the first 10 as "inYourArea" (popular)
    inYourArea: hotels.slice(0, 10),
    // Next group as "previousChoices" (recommended)
    previousChoices: hotels.slice(10, 24),
    // The full list
    allHotels: hotels,
  };
}

/**
 * Adapt single hotel details by ID OR slug.
 * @param {Object} apiData - raw API payload from comprehensive endpoint
 * @param {string|number} key - slug or id
 */
export function adaptHotelDetails(apiData, key) {
  const allProducts = Array.isArray(apiData?.allProducts) ? apiData.allProducts : [];
  const hotel = allProducts.find(
    (item) => item.slug === key || String(item.id) === String(key)
  );
  if (!hotel) return null;

  return {
    id: hotel.id,
    slug: hotel.slug || String(hotel.id),
    name: hotel.name,
    banner: hotel?.vendor_store_id?.bannerUrl || getPrimaryImage(hotel) || "/hotels/default-banner.png",
    description: hotel.description || "No description available.",
    category: hotel?.category?.name || "Uncategorized",
    location: getLocation(hotel),
    rating: {
      average: hotel?.rating?.average ?? 0,
      count: hotel?.rating?.count ?? 0,
    },
    variants: (hotel.variants || []).map((v) => ({
      id: v.id,
      name: v.variant_name,
      price: v?.price?.sale_price ?? v?.price?.base_price ?? 0,
      basePrice: v?.price?.base_price ?? 0,
      attributes: Array.isArray(v?.attributes)
        ? v.attributes.map((attr) => `${attr.name}: ${attr.value}`).join(", ")
        : "",
      image: v?.images?.[0]?.url || "/hotels/placeholder.png",
      location: v?.location || "N/A",
    })),
    raw: hotel,
  };
}

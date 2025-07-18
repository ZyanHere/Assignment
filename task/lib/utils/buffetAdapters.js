// lib/adapters/buffetAdapter.js

/**
 * Adapt API buffet data into sections like popular, inYourArea, previousChoices
 */
export function adaptBuffetSections(apiData) {
  const allProducts = apiData?.allProducts || [];

  const formatProduct = (p) => ({
    id: p.id,
    name: p.name,
    img: p.images?.[0]?.url || "/buffet/placeholder.png", // Product-level image
    rating: p.rating?.average || 0,
    price: "Free Delivery",
    time: "30 min",
    category: p.category?.name || "Uncategorized",
  });

  return {
    // popular: allProducts.slice(0, 8).map(formatProduct),
    inYourArea: allProducts.slice(0, 10).map(formatProduct),
    previousChoices: allProducts.slice(10, 24).map(formatProduct),
    allRestaurants: allProducts.map(formatProduct),
  };
}

/**
 * Adapt single restaurant details by ID
 */
export function adaptRestaurantDetails(apiData, id) {
  const restaurant = apiData?.allProducts?.find((item) => item.id === id);
  if (!restaurant) return null;

  return {
    id: restaurant.id,
    name: restaurant.name,
    banner:
      restaurant.vendor_store_id?.bannerUrl || "/buffet/default-banner.png",
    description: restaurant.description || "No description available",
    category: restaurant.category?.name || "Uncategorized",
    // variants: (restaurant.variants || []).map((v) => ({
    //   id: v.id,
    //   name: v.variant_name,
    //   price: v.price.sale_price || v.price.base_price,
    //   basePrice: v.price.base_price,
    //   attributes: v.attributes
    //     .map((attr) => `${attr.name}: ${attr.value}`)
    //     .join(", "),
    //   image: v.images?.[0]?.url || "/buffet/placeholder.png",
    // })),
    variants: restaurant.variants,
  };
}

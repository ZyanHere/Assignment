// lib/adapters/buffetAdapter.js

/**
 * Adapt API buffet data into sections like popular, inYourArea, previousChoices
 */
export function adaptBuffetSections(apiData) {
  const allProducts = apiData?.allProducts || [];

  // Example grouping logic – you can refine this later
  return {
    popular: allProducts.slice(0, 8),
    inYourArea: allProducts.slice(8, 16),
    previousChoices: allProducts.slice(16, 24),
    allRestaurants: allProducts,
  };
}

/**
 * Adapt single restaurant details by ID
 */
export function adaptRestaurantDetails(apiData, id) {
  const restaurant = apiData.allProducts.find((item) => item.id === id);
  if (!restaurant) return null;

  return {
    id: restaurant.id,
    name: restaurant.name,
    banner: restaurant.vendor_store_id?.bannerUrl || "/buffet/default-banner.png",
    description: restaurant.description || "No description available",
    category: restaurant.category?.name || "Uncategorized",
    variants: (restaurant.variants || []).map((v) => ({
      id: v.id,
      name: v.variant_name,
      price: v.price.sale_price || v.price.base_price,
      basePrice: v.price.base_price,
      attributes: v.attributes.map((attr) => `${attr.name}: ${attr.value}`).join(", "),
      image: v.images?.[0]?.url || "/buffet/placeholder.png",
    })),
  };
}

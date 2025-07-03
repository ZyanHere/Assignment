const categoryData = {
  "all": {
    name: "All",
    image: "/categories/all.png",
  },
  "fruits-vegetables": {
    name: "Fruits & Vegetables",
    image: "/categories/fruits-vegetables.png",
    subcategories: [
      { name: "Farm Fresh Fruits", image: "/categories/subcat/fresh fruit.png", slug: "farm-fresh-fruits" },
      { name: "Fresh Vegetables", image: "/categories/subcat/fresh veg.png", slug: "fresh-vegetables" },
      { name: "Organic Picks", image: "/categories/subcat/exotic veg.png", slug: "organic-picks" },
      { name: "Exotic Veggies", image: "/categories/subcat/org pick.png", slug: "exotic-veggies" },
      { name: "Quick Prep Veggies", image: "/categories/subcat/quick veg.png", slug: "quick-prep-veggies" },
    ],
  },
  "bakery-dairy": {
    name: "Bakery & Dairy",
    image: "/categories/bakery-dairy.png",
    subcategories: [
      { name: "Breads & Buns", slug: "breads-buns" },
      { name: "Milk & Dairy", slug: "milk-dairy" },
      { name: "Eggs & Spreads", slug: "eggs-spreads" },
    ],
  },
  "beverages": {
    name: "Beverages",
    image: "/categories/beverages.png",
    subcategories: [
      { name: "Soft Drinks", slug: "soft-drinks" },
      { name: "Juices & Nectars", slug: "juices-nectars" },
      { name: "Tea & Coffee", slug: "tea-coffee" },
      { name: "Coffee Essentials", slug: "coffee-essentials" },
    ],
  },
  "pulses-grains": {
    name: "Pulses & Grains",
    image: "/home/essentials/Pulses & Grains.png",
    subcategories: [
      { name: "Rice & Rice Products", slug: "rice-products" },
      { name: "Dals & Pulses", slug: "dals-pulses" },
      { name: "Whole Grains", slug: "whole-grains" },
      { name: "Flours & Meals", slug: "flours-meals" },
    ],
  },
  "gourmet-global": {
    name: "Gourmet & Global",
    image: "/categories/gourmet-global.png",
    subcategories: [
      { name: "Cheese & Dairy", slug: "cheese-dairy" },
      { name: "World Cuisine", slug: "world-cuisine" },
      { name: "Meat & Seafood", slug: "meat-seafood" },
      { name: "Premium Snacks", slug: "premium-snacks" },
      { name: "Healthy Bites", slug: "healthy-bites" },
    ],
  },
  "gourmet": {
    name: "Gourmet",
    image: "/categories/gourmet&global.png",
    subcategories: [
      { name: "Cheese & Dairy", slug: "cheese-dairy" },
      { name: "World Cuisine", slug: "world-cuisine" },
      { name: "Meat & Seafood", slug: "meat-seafood" },
      { name: "Premium Snacks", slug: "premium-snacks" },
      { name: "Healthy Bites", slug: "healthy-bites" },
    ],
  },
  "snacks": {
    name: "Snacks",
    image: "/categories/snacks.png",
    subcategories: [
      { name: "Chips & Crackers", slug: "chips-crackers" },
      { name: "Chocolates & Candies", slug: "chocolates-candies" },
      { name: "Energy Bars", slug: "energy-bars" },
      { name: "Instant Noodles", slug: "instant-noodles" },
    ],
  },
  "desserts": {
    name: "Desserts",
    image: "/categories/desserts.png",
    subcategories: [
      { name: "Cakes & Pastries", slug: "cakes-pastries" },
      { name: "Traditional Sweets", slug: "traditional-sweets" },
    ],
  },
  "frozen-food": {
    name: "Frozen Food",
    image: "/home/essentials/Frozen Food.png",
    subcategories: [
      { name: "Frozen Vegetables", slug: "frozen-vegetables" },
      { name: "Frozen Meals", slug: "frozen-meals" },
      { name: "Frozen Snacks", slug: "frozen-snacks" },
    ],
  },
  "frozen-desserts": {
    name: "Frozen Desserts",
    image: "/categories/frozen-desserts.png",
    subcategories: [
      { name: "Ice Cream", slug: "ice-cream" },
      { name: "Frozen Yogurt", slug: "frozen-yogurt" },
    ],
  },
  "personal-care": {
    name: "Personal Care",
    image: "/home/essentials/Personal Care.png",
    subcategories: [
      { name: "Skin Care", slug: "skin-care" },
      { name: "Hair Care", slug: "hair-care" },
      { name: "Body Care", slug: "body-care" },
    ],
  },
  "oils-spices": {
    name: "Oils & Spices",
    image: "/home/essentials/Oils & Spices.png",
    subcategories: [
      { name: "Cooking Oils", slug: "cooking-oils" },
      { name: "Spices & Masalas", slug: "spices-masalas" },
      { name: "Herbs & Seasonings", slug: "herbs-seasonings" },
    ],
  },
  "home-care-hygiene": {
    name: "Home Care & Hygiene",
    image: "/categories/home-care-hygiene.png",
    subcategories: [
      { name: "Laundry & Detergents", slug: "laundry-detergents" },
      { name: "Air Fresheners", slug: "air-fresheners" },
    ],
  },
  "bath-beauty": {
    name: "Bath & Beauty",
    image: "/categories/bath-beauty.png",
    subcategories: [
      { name: "Body Wash & Soaps", slug: "body-wash-soaps" },
      { name: "Hair Care", slug: "hair-care" },
      { name: "Oral Care", slug: "oral-care" },
    ],
  },
  "makeup": {
    name: "Makeup",
    image: "/categories/makeup.png",
    subcategories: [
      { name: "Lipsticks", slug: "lipsticks" },
      { name: "Foundations", slug: "foundations" },
      { name: "Eye Makeup", slug: "eye-makeup" },
    ],
  },
  "mens-care": {
    name: "Mens Care",
    image: "/categories/mens-care.png",
    subcategories: [
      { name: "Shaving & Grooming", slug: "shaving-grooming" },
      { name: "Men's Skincare", slug: "mens-skincare" },
    ],
  },
  "baby-care": {
    name: "Baby Care",
    image: "/categories/baby-care.png",
    subcategories: [
      { name: "Diapers & Wipes", slug: "diapers-wipes" },
      { name: "Baby Food", slug: "baby-food" },
    ],
  },
  "cleaning-household": {
    name: "Cleaning & Household",
    image: "/categories/cleaning-household.png",
    subcategories: [
      { name: "Cleaning Supplies", slug: "cleaning-supplies" },
      { name: "Trash Bags", slug: "trash-bags" },
    ],
  },
  "kitchenware-appliances": {
    name: "Kitchenware & Appliances",
    image: "/categories/kitchenware-appliances.png",
    subcategories: [
      { name: "Cookware", slug: "cookware" },
      { name: "Kitchen Tools", slug: "kitchen-tools" },
      { name: "Small Appliances", slug: "small-appliances" },
    ],
  },
  "fashion": {
    name: "Fashion",
    image: "/home/essentials/Fashion.png",
    subcategories: [
      { name: "Men's Fashion", slug: "mens-fashion" },
      { name: "Women's Fashion", slug: "womens-fashion" },
      { name: "Kids Fashion", slug: "kids-fashion" },
    ],
  },
  "apparel": {
    name: "Apparel",
    image: "/home/essentials/Apparel.png",
    subcategories: [
      { name: "Casual Wear", slug: "casual-wear" },
      { name: "Formal Wear", slug: "formal-wear" },
      { name: "Sports Wear", slug: "sports-wear" },
    ],
  },
  "electronics": {
    name: "Electronics",
    image: "/home/essentials/Electronics.png",
    subcategories: [
      { name: "Smartphones", slug: "smartphones" },
      { name: "Laptops", slug: "laptops" },
      { name: "Audio Devices", slug: "audio-devices" },
      { name: "Smart Home", slug: "smart-home" },
    ],
  },
  "furniture": {
    name: "Furniture",
    image: "/home/essentials/Furniture.png",
    subcategories: [
      { name: "Living Room", slug: "living-room" },
      { name: "Bedroom", slug: "bedroom" },
      { name: "Kitchen & Dining", slug: "kitchen-dining" },
      { name: "Home Office", slug: "home-office" },
    ],
  },
};

export default categoryData;
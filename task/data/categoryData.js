const categoryData = {
  "all": {
    name: "All",
    image: "/categories/all.png",
  },
  "fruits-vegetables": {
    name: "Fruits & Vegetables",
    image: "/categories/fruits-vegetables.png",
    subcategories: [
      { name: "Farm Fresh Fruits",image: "/categories/subcat/fresh fruit.png", slug: "farm-fresh-fruits" },
      { name: "Fresh Vegetables",image: "/categories/subcat/fresh veg.png", slug: "fresh-vegetables" },
      { name: "Organic Picks",image: "/categories/subcat/exotic veg.png", slug: "organic-picks" },
      { name: "Exotic Veggies",image: "/categories/subcat/org pick.png", slug: "exotic-veggies" },
      { name: "Quick Prep Veggies",image: "/categories/subcat/quick veg.png", slug: "quick-prep-veggies" },
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
  "frozen-desserts": {
    name: "Frozen Desserts",
    image: "/categories/frozen-desserts.png",
    subcategories: [
      { name: "Ice Cream", slug: "ice-cream" },
      { name: "Frozen Yogurt", slug: "frozen-yogurt" },
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
};

export default categoryData;

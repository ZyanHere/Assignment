// lib/mock/sampleResults.js
export const sampleResults = [
  {
    _id: "1",
    name: "Zara Jeans",
    brand: "Zara",
    vendor_store_id: { store_name: "Style Fashion Boutique" },
    variants: [
      {
        _id: "v1",
        variant_name: "Zara Jeans Variant",
        price: {
          base_price: 1200,
          sale_price: 100,
        },
        stock: {
          quantity: 56,
        },
        sku: "ZARAJNS001",
      },
    ],
    images: [
      {
        url: "/placeholder.jpg",
        is_primary: true,
      },
    ],
    rating: {
      average: 0,
      count: 0,
    },
  },
  {
    _id: "2",
    name: "General Seating - The Great Show",
    brand: "CineMax Theaters",
    vendor_store_id: { store_name: "CineMax Grand Mall" },
    variants: [
      {
        _id: "v2",
        variant_name: "General Seating",
        price: {
          base_price: 250,
          sale_price: 200,
        },
        stock: {
          quantity: 100,
        },
        sku: "GENSEAT001",
      },
    ],
    images: [
      {
        url: "/placeholder.jpg",
        is_primary: true,
      },
    ],
    rating: {
      average: 0,
      count: 0,
    },
  },
  // Add more dummy entries if needed
];

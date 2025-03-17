const storesData = {
  "pantaloons": {
    "name": "Pantaloons",
    "location": "Pimple Saudagar",
    "logo": "/store/pantaloons-logo.png",
    "distance": "4 km",
    "banner": "/store/pantaloons-banner.png",
    "sections": ["Fashion", "Apparel"], // Sections for Pantaloons
    "products": [
      {
        "id": 1,
        "name": "Men's Casual Shirt",
        "category": "Fashion",
        "image": "/store/shirt.png",
        "weight": "1 Piece",
        "price": 1200,
        "mrp": 1500,
        "discount": "20% OFF"
      },
      {
        "id": 2,
        "name": "Women's Saree",
        "category": "Apparel",
        "image": "/store/saree.png",
        "weight": "1 Piece",
        "price": 2500,
        "mrp": 3000,
        "discount": "15% OFF"
      }
    ]
  },

  "natures-basket": {
    "name": "Nature's Basket",
    "location": "Pimple Saudagar",
    "logo": "/store/nature-logo.png",
    "distance": "2 km",
    "banner": "/store/natures-basket-banner.png",
    "sections": ["Farm Fresh Fruits", "Fresh Vegetables"], // Sections for Nature's Basket
    "products": [
      {
        "id": 1,
        "name": "Fresh Pear",
        "category": "Farm Fresh Fruits",
        "image": "/store/pear.png",
        "weight": "100g",
        "price": 100,
        "mrp": 125,
        "discount": "20% OFF"
      },
      {
        "id": 2,
        "name": "Tomato",
        "category": "Fresh Vegetables",
        "image": "/store/tomato.png",
        "weight": "500g",
        "price": 80,
        "mrp": 100,
        "discount": "20% OFF"
      }
    ]
  },

  "metro": {
    "name": "Metro",
    "location": "Pimple Saudagar",
    "logo": "/store/metro-logo.png",
    "distance": "3 km",
    "banner": "/store/metro-banner.png",
    "sections": ["Beverages", "Oils & Spices"], // Sections for Metro
    "products": [
      {
        "id": 1,
        "name": "Aquafina",
        "category": "Beverages",
        "image": "/store/aquafina.png",
        "weight": "1L",
        "price": 50,
        "mrp": 60,
        "discount": "15% OFF"
      },
      {
        "id": 2,
        "name": "Cooking Oil",
        "category": "Oils & Spices",
        "image": "/store/oil.png",
        "weight": "1L",
        "price": 150,
        "mrp": 180,
        "discount": "16% OFF"
      }
    ]
  }
};

export default storesData;

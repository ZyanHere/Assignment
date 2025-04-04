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
        "discount": "20% OFF",
        "details": {
          image: "/store/pear.png",
          description: "A pear is a sweet, bell-shaped fruit with a juicy texture and a slightly grainy flesh. It comes in various colors, including green, yellow, and red, and is rich in fiber and antioxidants.",
          seller: {
            license: "1111222333444556",
            location: "Pimple Saudagar"
          },
          specs: {
            type: "Pear",
            unit: "1 pc(350kg)",
             Info: "Discover the joy of pairing pear with cheese, creating a sophisticated appetizer that balances sweet and savory flavors beautifully "
          },
          weightOptions: [
            { value: 250, label: "250g", price: 140 },
            { value: 500, label: "500g", price: 265 },
            { value: 1000, label: "1kg", price: 500 },
          ],
          timerEnd: Date.now() + (3 * 60 * 60 * 1000) + (1 * 60 * 1000) + (23 * 1000), 
        }

      },
      {
        "id": 2,
        "name": "Women's Saree",
        "category": "Apparel",
        "image": "/store/saree.png",
        "weight": "1 Piece",
        "price": 2500,
        "mrp": 3000,
        "discount": "15% OFF",
        "details": {
          image: "/store/pear.png",
          description: "A pear is a sweet, bell-shaped fruit with a juicy texture and a slightly grainy flesh. It comes in various colors, including green, yellow, and red, and is rich in fiber and antioxidants.",
          seller: {
            license: "1111222333444556",
            location: "Pimple Saudagar"
          },
          specs: {
            type: "Pear",
            unit: "1 pc(350kg)",
             Info: "Discover the joy of pairing pear with cheese, creating a sophisticated appetizer that balances sweet and savory flavors beautifully "
          },
          weightOptions: [
            { value: 250, label: "250g", price: 140 },
            { value: 500, label: "500g", price: 265 },
            { value: 1000, label: "1kg", price: 500 },
          ],
          timerEnd: Date.now() + (3 * 60 * 60 * 1000) + (1 * 60 * 1000) + (23 * 1000), 
        }
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
        "discount": "20% OFF",
        "details": {
          image: "/store/pear.png",
          description: "A pear is a sweet, bell-shaped fruit with a juicy texture and a slightly grainy flesh. It comes in various colors, including green, yellow, and red, and is rich in fiber and antioxidants.",
          seller: {
            license: "1111222333444556",
            location: "Pimple Saudagar"
          },
          specs: {
            type: "Pear",
            unit: "1 pc(350kg)",
             Info: "Discover the joy of pairing pear with cheese, creating a sophisticated appetizer that balances sweet and savory flavors beautifully "
          },
          weightOptions: [
            { value: 250, label: "250g", price: 140 },
            { value: 500, label: "500g", price: 265 },
            { value: 1000, label: "1kg", price: 500 },
          ],
          timerEnd: Date.now() + (3 * 60 * 60 * 1000) + (1 * 60 * 1000) + (23 * 1000), 
        }
      },
      {
        "id": 2,
        "name": "Tomato",
        "category": "Fresh Vegetables",
        "image": "/store/tomato.png",
        "weight": "500g",
        "price": 80,
        "mrp": 100,
        "discount": "20% OFF",
        "details": {
          image: "/store/pear.png",
          description: "A pear is a sweet, bell-shaped fruit with a juicy texture and a slightly grainy flesh. It comes in various colors, including green, yellow, and red, and is rich in fiber and antioxidants.",
          seller: {
            license: "1111222333444556",
            location: "Pimple Saudagar"
          },
          specs: {
            type: "Pear",
            unit: "1 pc(350kg)",
             Info: "Discover the joy of pairing pear with cheese, creating a sophisticated appetizer that balances sweet and savory flavors beautifully "
          },
          weightOptions: [
            { value: 250, label: "250g", price: 140 },
            { value: 500, label: "500g", price: 265 },
            { value: 1000, label: "1kg", price: 500 },
          ],
          timerEnd: Date.now() + (3 * 60 * 60 * 1000) + (1 * 60 * 1000) + (23 * 1000), 
        }
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
        "discount": "15% OFF",
        "details": {
          image: "/store/pear.png",
          description: "A pear is a sweet, bell-shaped fruit with a juicy texture and a slightly grainy flesh. It comes in various colors, including green, yellow, and red, and is rich in fiber and antioxidants.",
          seller: {
            license: "1111222333444556",
            location: "Pimple Saudagar"
          },
          specs: {
            type: "Pear",
            unit: "1 pc(350kg)",
             Info: "Discover the joy of pairing pear with cheese, creating a sophisticated appetizer that balances sweet and savory flavors beautifully "
          },
          weightOptions: [
            { value: 250, label: "250g", price: 140 },
            { value: 500, label: "500g", price: 265 },
            { value: 1000, label: "1kg", price: 500 },
          ],
          timerEnd: Date.now() + (3 * 60 * 60 * 1000) + (1 * 60 * 1000) + (23 * 1000), 
        }
      },
      {
        "id": 2,
        "name": "Cooking Oil",
        "category": "Oils & Spices",
        "image": "/store/oil.png",
        "weight": "1L",
        "price": 150,
        "mrp": 180,
        "discount": "16% OFF",
        "details": {
          image: "/store/pear.png",
          description: "A pear is a sweet, bell-shaped fruit with a juicy texture and a slightly grainy flesh. It comes in various colors, including green, yellow, and red, and is rich in fiber and antioxidants.",
          seller: {
            license: "1111222333444556",
            location: "Pimple Saudagar"
          },
          specs: {
            type: "Pear",
            unit: "1 pc(350kg)",
             Info: "Discover the joy of pairing pear with cheese, creating a sophisticated appetizer that balances sweet and savory flavors beautifully "
          },
          weightOptions: [
            { value: 250, label: "250g", price: 140 },
            { value: 500, label: "500g", price: 265 },
            { value: 1000, label: "1kg", price: 500 },
          ],
          timerEnd: Date.now() + (3 * 60 * 60 * 1000) + (1 * 60 * 1000) + (23 * 1000), 
        }
      }
    ]
  }
};

export default storesData;

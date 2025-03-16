const storesData = {
  pantaloons: {
    name: "Pantaloons",
    location: "Ambience Mall, Gurgaon",
    banner: "/store.png",
    products: [],
  },
  "natures-basket": {
    name: "Nature's Basket",
    location: "Pimple Saudagar",
    logo: "/store/Nature-logo.png",
    distance: "2 km",
    banner: "/natures-basket-banner.jpg",
    products: [
      {
        id: 1,
        name: "Fresh Pear",
        category: "Farm Fresh Fruits",
        image: "/store/pear.png",
        weight: "100g",
        price: 100,
        mrp: 125,
        discount: "20% OFF",
      },
    ],
  },
  metro: {
    name: "Metro",
    location: "Pimple Saudagar",
    logo: "/store/metro-logo.png",
    distance: "3 km",
    banner: "/metro-banner.jpg",
    products: [
      {
        id: 1,
        name: "Pot Cookware Set",
        category: "Kitchen Essentials",
        image: "/store/cookware.png",
        weight: "1 Set",
        price: 100,
        mrp: 125,
        discount: "20% OFF",
      },
    ],
  },
};

export default storesData;

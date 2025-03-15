const Essentials = () => {
  const categories = [
    { img: "/home/essentials/fruits.png", label: "Fruits & Vegetables" },
    { img: "/home/essentials/Bakery & Dairy.png", label: "Bakery & Dairy" },
    { img: "/home/essentials/Beverages.png", label: "Beverages" },
    { img: "/home/essentials/Pulses & Grains.png", label: "Pulses & Grains" },
    { img: "/home/essentials/Gourmet & Global.png", label: "Gourmet & Global" },
    { img: "/home/essentials/Snacks.png", label: "Snacks" },
    { img: "/home/essentials/Dessert.png", label: "Dessert" },
    { img: "/home/essentials/Coffee Essentials.png", label: "Coffee Essentials" },
    { img: "/home/essentials/Instant Noodles.png", label: "Instant Noodles" },
    { img: "/home/essentials/Frozen Food.png", label: "Frozen Food" },
    { img: "/home/essentials/Personal Care.png", label: "Personal Care" },
    { img: "/home/essentials/Oils & Spices.png", label: "Oils & Spices" },
    { img: "/home/essentials/Home Care & Hygiene.png", label: "Home Care & Hygiene" },
    { img: "/home/essentials/Bath & Beauty.png", label: "Bath & Beauty" },
    { img: "/home/essentials/Makeup.png", label: "Makeup" },
    { img: "/home/essentials/Men's Care.png", label: "Men's Care" },
    { img: "/home/essentials/Baby Care.png", label: "Baby Care" },
    { img: "/home/essentials/Cleaning & Household.png", label: "Cleaning & Household" },
    { img: "/home/essentials/Kitchenware & Appliances.png", label: "Kitchenware & Appliances" },
    { img: "/home/essentials/Frozen Desserts.png", label: "Frozen Desserts" },
    { img: "/home/essentials/Fashion.png", label: "Fashion" },
    { img: "/home/essentials/Apparel.png", label: "Apparel" },
    { img: "/home/essentials/Electronics.png", label: "Electronics" },
    { img: "/home/essentials/Furniture.png", label: "Furniture" },
  ];

  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-black pl-4">
        Daily Essentials
      </h2>
      <div className="grid grid-cols-8 gap-6">
        {categories.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="bg-[#EFFAFB] px-4 rounded-lg shadow-md w-[140px] h-[140px] flex items-center justify-center">
              <img
                src={item.img}
                alt={item.label}
                className="w-[116px] h-[82px]"
              />
            </div>
            <span className="mt-2 text-sm font-medium text-black">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Essentials;

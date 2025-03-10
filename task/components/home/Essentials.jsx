const Essentials = () => {
  const categories = [
    { img: "/essentials/fruits.png", label: "Fruits & Vegetables" },
    { img: "/essentials/Bakery & Dairy.png", label: "Bakery & Dairy" },
    { img: "/essentials/Beverages.png", label: "Beverages" },
    { img: "/essentials/Pulses & Grains.png", label: "Pulses & Grains" },
    { img: "/essentials/Gourmet & Global.png", label: "Gourmet & Global" },
    { img: "/essentials/Snacks.png", label: "Snacks" },
    { img: "/essentials/Dessert.png", label: "Dessert" },
    { img: "/essentials/Coffee Essentials.png", label: "Coffee Essentials" },
    { img: "/essentials/Instant Noodles.png", label: "Instant Noodles" },
    { img: "/essentials/Frozen Food.png", label: "Frozen Food" },
    { img: "/essentials/Personal Care.png", label: "Personal Care" },
    { img: "/essentials/Oils & Spices.png", label: "Oils & Spices" },
    { img: "/essentials/Home Care & Hygiene.png", label: "Home Care & Hygiene" },
    { img: "/essentials/Bath & Beauty.png", label: "Bath & Beauty" },
    { img: "/essentials/Makeup.png", label: "Makeup" },
    { img: "/essentials/Men's Care.png", label: "Men's Care" },
    { img: "/essentials/Baby Care.png", label: "Baby Care" },
    { img: "/essentials/Cleaning & Household.png", label: "Cleaning & Household" },
    { img: "/essentials/Kitchenware & Appliances.png", label: "Kitchenware & Appliances" },
    { img: "/essentials/Frozen Desserts.png", label: "Frozen Desserts" },
    { img: "/essentials/Fashion.png", label: "Fashion" },
    { img: "/essentials/Apparel.png", label: "Apparel" },
    { img: "/essentials/Electronics.png", label: "Electronics" },
    { img: "/essentials/Furniture.png", label: "Furniture" },
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

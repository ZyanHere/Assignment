const Essentials = () => {
  const categories = [
    { img: "/essentials/fruits.png", label: "Fruits & Vegetables" },
    { img: "/essentials/fruits.png", label: "Bakery & Dairy" },
    { img: "/essentials/fruits.png", label: "Beverages" },
    { img: "/essentials/fruits.png", label: "Pulses & Grains" },
    { img: "/essentials/fruits.png", label: "Gourmet & Global" },
    { img: "/essentials/fruits.png", label: "Snacks" },
    { img: "/essentials/fruits.png", label: "Dessert" },
    { img: "/essentials/fruits.png", label: "Coffee Essentials" },
    { img: "/essentials/fruits.png", label: "Instant Noodles" },
    { img: "/essentials/fruits.png", label: "Frozen Food" },
    { img: "/essentials/fruits.png", label: "Personal Care" },
    { img: "/essentials/fruits.png", label: "Oils & Spices" },
    { img: "/essentials/fruits.png", label: "Home Care & Hygiene" },
    { img: "/essentials/fruits.png", label: "Bath & Beauty" },
    { img: "/essentials/fruits.png", label: "Makeup" },
    { img: "/essentials/fruits.png", label: "Men's Care" },
    { img: "/essentials/fruits.png", label: "Baby Care" },
    { img: "/essentials/fruits.png", label: "Cleaning & Household" },
    { img: "/essentials/fruits.png", label: "Kitchenware & Appliances" },
    { img: "/essentials/fruits.png", label: "Frozen Desserts" },
    { img: "/essentials/fruits.png", label: "Fashion" },
    { img: "/essentials/fruits.png", label: "Apparel" },
    { img: "/essentials/fruits.png", label: "Electronics" },
    { img: "/essentials/fruits.png", label: "Furniture" },
  ];

  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-black pl-4">
        Daily Essentials
      </h2>
      <div className="grid grid-cols-8 gap-6">
        {categories.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="bg-[#EFFAFB] p-4 rounded-lg shadow-md w-[140px] h-[140px] flex items-center justify-center">
              <img
                src={item.img}
                alt={item.label}
                className="w-[116px] h-[82px] object-cover"
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

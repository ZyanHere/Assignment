import Image from "next/image";

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
    <section className="p-4 md:p-6">
      <h2 className="text-2xl font-semibold mb-6 text-black pl-4">
        Daily Essentials
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4 ">
        {categories.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center p-1 ">
            <div className="bg-gradient-to-br from-blue-200 to-yellow-50 p-2 rounded-lg  w-full aspect-square flex items-center justify-center shadow-lg cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1.5">
            <Image
                src={item.img}
                alt={item.label}
                width={116}
                height={82}
                className="object-contain"
              />
            </div>
            <span className="mt-2 text-xs md:text-sm font-medium text-black line-clamp-2">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Essentials;

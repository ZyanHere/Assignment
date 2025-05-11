import Image from "next/image";
import Link from "next/link";

const Essentials = () => {
  const categories = [
    { img: "/home/essentials/fruits.png", label: "Fruits & Vegetables", slug: "fruits-vegetables" },
    { img: "/home/essentials/Bakery & Dairy.png", label: "Bakery & Dairy", slug: "bakery-dairy" },
    { img: "/home/essentials/Beverages.png", label: "Beverages", slug: "beverages" },
    { img: "/home/essentials/Pulses & Grains.png", label: "Pulses & Grains", slug: "pulses-grains" },
    { img: "/home/essentials/Gourmet & Global.png", label: "Gourmet & Global", slug: "gourmet-global" },
    { img: "/home/essentials/Snacks.png", label: "Snacks", slug: "snacks" },
    { img: "/home/essentials/Dessert.png", label: "Dessert", slug: "dessert" },
    { img: "/home/essentials/Coffee Essentials.png", label: "Coffee Essentials", slug: "coffee-essentials" },
    { img: "/home/essentials/Instant Noodles.png", label: "Instant Noodles", slug: "instant-noodles" },
    { img: "/home/essentials/Frozen Food.png", label: "Frozen Food", slug: "frozen-food" },
    { img: "/home/essentials/Personal Care.png", label: "Personal Care", slug: "personal-care" },
    { img: "/home/essentials/Oils & Spices.png", label: "Oils & Spices", slug: "oils-spices" },
    { img: "/home/essentials/Home Care & Hygiene.png", label: "Home Care & Hygiene", slug: "home-care-hygiene" },
    { img: "/home/essentials/Bath & Beauty.png", label: "Bath & Beauty", slug: "bath-beauty" },
    { img: "/home/essentials/Makeup.png", label: "Makeup", slug: "makeup" },
    { img: "/home/essentials/Men's Care.png", label: "Men's Care", slug: "mens-care" },
    { img: "/home/essentials/Baby Care.png", label: "Baby Care", slug: "baby-care" },
    { img: "/home/essentials/Cleaning & Household.png", label: "Cleaning & Household", slug: "cleaning-household" },
    { img: "/home/essentials/Kitchenware & Appliances.png", label: "Kitchenware & Appliances", slug: "kitchenware-appliances" },
    { img: "/home/essentials/Frozen Desserts.png", label: "Frozen Desserts", slug: "frozen-desserts" },
    { img: "/home/essentials/Fashion.png", label: "Fashion", slug: "fashion" },
    { img: "/home/essentials/Apparel.png", label: "Apparel", slug: "apparel" },
    { img: "/home/essentials/Electronics.png", label: "Electronics", slug: "electronics" },
    { img: "/home/essentials/Furniture.png", label: "Furniture", slug: "furniture" },
  ];

  return (
    <section className="p-4 md:p-6">
      <h2 className="text-2xl font-semibold mb-6 text-black pl-4">
        Daily Essentials
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4 ">
        {categories.map((item, index) => (
          <Link
            href={`/categories/${item.slug}`} 
            key={index} 
            className="flex flex-col items-center text-center p-1"
          >
            <div className="bg-gradient-to-br from-blue-200 to-yellow-50 p-2 rounded-lg w-full aspect-square flex items-center justify-center shadow-lg cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1.5 ">
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
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Essentials;

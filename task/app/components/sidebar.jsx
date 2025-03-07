"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/", icon: "/sidebar/home.png" },
    { name: "Categories", path: "/categories", icon: "/sidebar/categories.png"},
    { name: "Stores", path: "/stores", icon: "/sidebar/stores.png" },
    { name: "Cart", path: "/cart", icon: "/sidebar/cart.png" },
    { name: "Orders", path: "/orders", icon: "/sidebar/orders.png" },
  ];

  return (
    <div className="w-[260px] h-screen bg-white shadow-md p-5">
      <div className="flex justify-left">
        <Image src="/auth-asset/logo.png" alt="logo" width={66} height={50} />
      </div>

      {/* navigation */}
      <nav className="flex flex-col mt-[7px] gap-2 ">
        {navItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <div
              className={`flex items-center gap-4 p-3 cursor-pointer 
                        ${
                          pathname === item.path
                            ? "bg-[#FFFBEA] text-[#FBC02D] font-semibold border-r-4 border-[#FBC02D]"
                            : "text-gray-700 hover:bg-[#FFFDE7]"
                        }`}
            >
              <Image src={item.icon} alt={item.name} width={24} height={24} />
              <span className="text-lg">{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* Settings */}
      <div className="mt-180">
        <Link href="/settings">
          <div className="flex items-center gap-4 p-3 cursor-pointer transition-colors duration-200 text-gray-700 hover:text-black">
            <Image src="/sidebar/settings.png" alt="Settings" width={24} height={24} />
            <span className="text-lg">Settings</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

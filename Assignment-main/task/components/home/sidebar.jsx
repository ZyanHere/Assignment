"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/", icon: "/home/sidebar/home.png" },
    { name: "Categories", path: "/categories", icon: "/home/sidebar/categories2.png"},
    { name: "Stores", path: "/stores", icon: "/home/sidebar/stores2.png" },
    { name: "Cart", path: "/cart", icon: "/home/sidebar/cart2.png" },
    { name: "Orders", path: "/orders", icon: "/home/sidebar/orders2.png" },
  ];

  return (
    <div className="w-[280px] h-screen bg-gray-50 shadow-sm border-r border-gray-100 p-6 flex flex-col">
      {/* Logo */}
      <Link href="/" className="pb-6 mb-6 border-b border-gray-100">
        <Image 
          src="/auth-asset/logo.png" 
          alt="Logo" 
          width={80} 
          height={60}
          className="hover:scale-105 transition-transform"
        />
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <div
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
                ${
                  pathname === item.path
                    ? "bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:pl-4"
                }`}
            >
              <Image 
                src={item.icon} 
                alt={item.name} 
                width={22} 
                height={22}
                className={`${pathname === item.path ? 'opacity-100' : 'opacity-70'}`}
              />
              <span className="text-[15px]">{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* Settings */}
      <div className="pt-6 border-t border-gray-100">
        <Link href="/settings">
          <div className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition hover:pl-4">
            <Image
              src="/home/sidebar/settings.png"
              alt="Settings"
              width={22}
              height={22}
              className="opacity-70"
            />
            <span className="text-[15px]">Settings</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
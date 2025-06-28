"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "Stores", path: "/stores" },
  { name: "Cart", path: "/cart" },
  { name: "Orders", path: "/orders" },
];

const NavLinks = ({ isMobile = false }) => {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        isMobile ? "flex flex-col gap-6 mt-6" : "hidden md:flex items-center gap-8"
      )}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.name}
            href={item.path}
            className={clsx(
              "relative px-2 py-1 text-lg font-medium group",
              isActive ? "text-blue-700" : "text-gray-900 hover:text-blue-500"
            )}
          >
            <span
              className={clsx(
                "absolute inset-x-0 -bottom-1 h-0.5 transition-transform duration-300",
                isActive
                  ? "bg-blue-500 scale-x-100"
                  : "bg-blue-500 origin-left scale-x-0 group-hover:scale-x-100"
              )}
            ></span>
            <span
              className={clsx(
                "relative block transition-all duration-200",
                isActive ? "" : "group-hover:translate-y-[-2px]"
              )}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;

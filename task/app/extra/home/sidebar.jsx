// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const Sidebar = () => {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);

//   const navItems = [
//     { name: "Home", path: "/", icon: "/home/sidebar/home.png" },
//     { name: "Categories", path: "/categories", icon: "/home/sidebar/categories2.png" },
//     { name: "Stores", path: "/stores", icon: "/home/sidebar/stores2.png" },
//     { name: "Cart", path: "/cart", icon: "/home/sidebar/cart2.png" },
//     { name: "Orders", path: "/orders", icon: "/home/sidebar/orders2.png" },
//   ];

//   const SidebarContent = (
//     <>
//       <Link href="/" onClick={() => setOpen(false)} className="pb-6 mb-6 border-b border-gray-100">
//         <Image
//           src="/auth-asset/logo.png"
//           alt="Logo"
//           width={80}
//           height={60}
//           className="hover:scale-105 transition-transform"
//         />
//       </Link>

//       <nav className="flex flex-col gap-1 flex-1">
//         {navItems.map((item) => (
//           <Link key={item.name} href={item.path} onClick={() => setOpen(false)}>
//             <div
//               className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
//                 ${pathname === item.path
//                   ? "bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 font-semibold shadow-sm"
//                   : "text-gray-600 hover:bg-gray-50 hover:pl-4"
//                 }`}
//             >
//               <Image
//                 src={item.icon}
//                 alt={item.name}
//                 width={22}
//                 height={22}
//                 className={`${pathname === item.path ? "opacity-100" : "opacity-70"}`}
//               />
//               <span className="text-[15px]">{item.name}</span>
//             </div>
//           </Link>
//         ))}
//       </nav>

//       <div className="pt-6 border-t border-gray-100">
//         <Link href="/settings" onClick={() => setOpen(false)}>
//           <div className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition hover:pl-4">
//             <Image
//               src="/home/sidebar/settings.png"
//               alt="Settings"
//               width={22}
//               height={22}
//               className="opacity-70"
//             />
//             <span className="text-[15px]">Settings</span>
//           </div>
//         </Link>
//       </div>
//     </>
//   );

//   return (
//     <>
//       {/* Hamburger visible only below lg (laptop) */}
//       <button
//         onClick={() => setOpen(true)}
//         className="lg:hidden fixed top-4 left-4 z-[9999] p-2 bg-white rounded-md shadow"
//         aria-label="Open menu"
//       >
//         <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2}
//              viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </button>

//       {/* Sidebar: only for large (laptop and up) */}
//       <div className="w-[280px] hidden lg:flex h-screen bg-gray-50 shadow-sm border-r border-gray-100 p-6 flex-col">
//         {SidebarContent}
//       </div>

//       {/* Mobile Drawer: for screens < lg */}
//       {open && (
//         <>
//           <div
//             onClick={() => setOpen(false)}
//             className="fixed inset-0 bg-black/40 z-[9998]"
//           />
//           <div className="fixed top-0 left-0 bottom-0 z-[9999] w-[260px] bg-gray-50 shadow-md p-6">
//             {SidebarContent}
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Sidebar;

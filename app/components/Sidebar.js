"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  
  BarChart,
  Globe,
  Car ,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: <Home className="w-5 h-5 mr-2" /> },
{ href: "/dashboard/users", label: "Cars", icon: <Car className="w-5 h-5 mr-2" /> },
    { href: "/dashboard/admin", label: "Admin", icon: <BarChart className="w-5 h-5 mr-2" /> },
    { href: "/dashboard/country", label: "Countries", icon: <Globe className="w-5 h-5 mr-2" /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings className="w-5 h-5 mr-2" /> },
    { href: "/dashboard/logout", label: "Logout", icon: <LogOut className="w-5 h-5 mr-2" /> },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r shadow-sm px-5 py-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800">Car Rental</h2>
      </div>

      <nav className="flex flex-col space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  FolderTree,
  Building,
  Mail,
  MessageSquare,
  Star,
  Users,
  Settings,
  UserCircle,
  LogOut,
  Home,
  PlusSquare,
  FolderOpen,
  Handshake,
  ChevronDown,
  ChevronRight,
  User,
} from "lucide-react";
import { useState } from "react";
import { Agent } from "http";

const menu = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Properties",
    href: "/admin/properties",
    icon: Building2,
  },
  {
    title: "Add Property",
    href: "/admin/properties/add",
    icon: PlusSquare,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: Building,
  },
  {
    title: "Add Project",
    href: "/admin/projects/add",
    icon: FolderOpen,
  },
  {
    title: "Services",
    href: "/admin/services",
    icon: Handshake,
  },
  {
    title: "Enquiries",
    href: "/admin/enquiries",
    icon: Mail,
  },
  {
    title: "Contact Messages",
    href: "/admin/contacts",
    icon: MessageSquare,
  },
  {
    title: "Hero",
    href: "/admin/hero",
    icon: Home,
  },
  {
    title: "Testimonials",
    href: "/admin/testimonials",
    icon: Star,
  },
  {
    title: "Agents",
    href: "/admin/agents",
    icon: User,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  
  
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    // Clear all session data
    localStorage.removeItem("admin");
    sessionStorage.removeItem("admin");
    document.cookie = "admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    
    // Redirect to login
    router.push("/admin/login");
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#081B37] flex flex-col shadow-2xl transition-all duration-300 z-50 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Logo */}
      <div className="h-24 border-b border-white/10 flex items-center px-4">
        <Home
          size={38}
          className="text-[#C79A54] flex-shrink-0"
        />
        {!collapsed && (
          <div className="ml-3 overflow-hidden">
            <h1 className="text-white text-2xl font-bold truncate">
              HomeLuxe
            </h1>
            <p className="text-gray-400 text-xs tracking-[4px]">
              ADMIN PANEL
            </p>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-24 bg-[#C79A54] text-white rounded-full p-1.5 shadow-lg hover:scale-110 transition-transform"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-6 scrollbar-thin scrollbar-thumb-[#C79A54] scrollbar-track-transparent">
        {!collapsed && (
          <p className="text-gray-400 uppercase text-xs mb-5 ml-3">
            Main Menu
          </p>
        )}

        <div className="space-y-1.5">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 group ${
                  active
                    ? "bg-[#C79A54] text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                } ${collapsed ? "justify-center px-2" : ""}`}
                title={collapsed ? item.title : ""}
              >
                <Icon
                  size={20}
                  className={`flex-shrink-0 ${
                    active ? "text-white" : "group-hover:text-white"
                  }`}
                />
                {!collapsed && (
                  <span className="font-medium whitespace-nowrap">
                    {item.title}
                  </span>
                )}
                {active && !collapsed && (
                  <span className="ml-auto w-1.5 h-8 bg-white rounded-full"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-3 font-semibold text-white transition-all hover:from-red-700 hover:to-red-800 hover:shadow-lg hover:scale-[1.02] ${
            collapsed ? "px-2" : "px-4"
          }`}
          title={collapsed ? "Logout" : ""}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
        
        {!collapsed && (
          <p className="text-gray-500 text-xs text-center mt-3">
            © 2024 HomeLuxe. All rights reserved.
          </p>
        )}
      </div>
    </aside>
  );
}
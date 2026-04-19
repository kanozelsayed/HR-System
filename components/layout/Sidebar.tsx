"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // ✅ كل item عنده roles بتحدد مين يشوفه
  const allMenuItems = [
    { name: "Job Feed", icon: "💼", href: "/jobs", roles: ["company", "seeker"] },
    { name: "Candidates", icon: "👥", href: "/candidates", roles: ["company"] },
    { name: "Your Activity", icon: "📊", href: "/dashboard", roles: ["company"] },
    { name: "My Applications", icon: "📝", href: "/dashboard", roles: ["seeker"] },
    { name: "Messages", icon: "💬", href: "#", roles: ["company", "seeker"] },
    { name: "Settings", icon: "⚙️", href: "#", roles: ["company", "seeker"] },
  ];

  // ✅ فلتر الـ items حسب الـ role
  const menuItems = allMenuItems.filter(
    (item) => !user || item.roles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>

      {/* Header */}
      <div className="h-16 flex items-center px-4 border-b border-gray-100 gap-3">
        <button onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-50 rounded-lg text-gray-500 transition-colors">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {!isCollapsed && (
          <span className="text-lg font-semibold text-gray-800 tracking-tight">SmartHire AI</span>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              pathname === item.href
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}>
            <span className="text-lg opacity-80">{item.icon}</span>
            {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button onClick={handleLogout}
          className={`w-full flex items-center gap-3 p-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all ${isCollapsed ? "justify-center" : ""}`}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!isCollapsed && <span className="text-sm font-semibold">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
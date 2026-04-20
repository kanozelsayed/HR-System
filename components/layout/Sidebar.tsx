"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, user } = useAuth(); // ✅ سحبنا بيانات المستخدم واللوج أوت مرة واحدة

  // ✅ المنيو كاملة مع تعديل Roles لـ employer
  const allMenuItems = [
    { name: "Job Feed", icon: "💼", href: "/jobs", roles: ["employer", "seeker"] },
    { name: "Candidates", icon: "👥", href: "/candidates", roles: ["employer"] },
    { name: "Your Activity", icon: "📊", href: "/dashboard", roles: ["employer"] },
    { name: "My Applications", icon: "📝", href: "/dashboard", roles: ["seeker"] },
    { name: "Messages", icon: "💬", href: "#", roles: ["employer", "seeker"] },
    { name: "Settings", icon: "⚙️", href: "#", roles: ["employer", "seeker"] },
  ];

  // ✅ فلترة العناصر بناءً على الـ role اللي جاي من الباكيند (employer)
  const menuItems = allMenuItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  const [isCollapsed, setIsCollapsed] = useState(false);

  // التحكم في حجم السايد بار بناءً على الشاشة
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 flex-shrink-0
      ${isCollapsed ? "w-16" : "w-64"}`}>

      {/* Header */}
      <div className="h-16 flex items-center px-3 border-b border-gray-100 gap-3">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-50 rounded-lg text-gray-500 transition-colors flex-shrink-0"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {!isCollapsed && (
          <span className="text-lg font-semibold text-gray-800 tracking-tight whitespace-nowrap overflow-hidden">
            SmartHire AI
          </span>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all
              ${isCollapsed ? "justify-center" : ""}
              ${pathname === item.href
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            {!isCollapsed && (
              <span className="text-sm font-medium whitespace-nowrap overflow-hidden">
                {item.name}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 p-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all
            ${isCollapsed ? "justify-center" : ""}`}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {!isCollapsed && <span className="text-sm font-semibold">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
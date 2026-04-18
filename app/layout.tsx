"use client"; // Must be client-side to use 'usePathname'

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

// 1. استدعاء الـ Provider اللي عملناه في ملف الـ AuthContext
import { AuthProvider } from "./context/AuthContext"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/"; 

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="bg-gray-50 text-gray-900 font-sans">
        
        {/* 2. بنلف الـ Layout كله بالـ AuthProvider */}
        {/* English Comment: Wrapping the application with AuthProvider to enable Global State access */}
        <AuthProvider>
          
          {!isAuthPage && <Navbar />}
          
          <div className="flex min-h-[calc(100vh-64px)]"> 
            {!isAuthPage && <Sidebar />}
            
            <main className={`flex-1 overflow-y-auto ${!isAuthPage ? "p-6" : ""}`}>
              {/* 3. الـ children هنا هم كل صفحات ، دلوقتي كلهم يقدروا يستخدموا useAuth */}
              {children}
            </main>
          </div>

        </AuthProvider>

      </body>
    </html>
  );
}
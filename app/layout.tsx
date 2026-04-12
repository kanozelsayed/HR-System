"use client"; // Must be client-side to use 'usePathname'

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

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
  // 1. Initialize usePathname to track the current URL
  const pathname = usePathname();

  // 2. Logic to check if we are currently on the Login or Signup page
  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/";; 

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="bg-gray-50 text-gray-900 font-sans">
        
        {/* 3. CONDITIONAL RENDERING: Navbar only shows if NOT an auth page */}
        {!isAuthPage && <Navbar />}
        
        <div className="flex min-h-[calc(100vh-64px)]"> 
          
          {/* 4. CONDITIONAL RENDERING: Sidebar only shows if NOT an auth page */}
          {!isAuthPage && <Sidebar />}
          
          <main className={`flex-1 overflow-y-auto ${!isAuthPage ? "p-6" : ""}`}>
            {/* 5. Inject the page content (Login, Signup, or Dashboard) */}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
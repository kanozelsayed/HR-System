"use client";

import { BriefcaseBusiness } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <BriefcaseBusiness className="w-6 h-6" />
          <span>SmartHire AI</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all shadow-sm">
          Post a Job
        </button>
      </div>
    </nav>
  );
}
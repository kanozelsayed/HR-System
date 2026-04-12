"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

/**
 * Main Content of the Dashboard
 * This component extracts the 'name' from URL parameters to personalize the UI
 */
function DashboardContent() {
  const searchParams = useSearchParams();
  
  // Get the name from URL (?name=...) or default to 'User'
  const userName = searchParams.get("name") || "User";
  
  // Extract the first letter for the profile avatar
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        
        {/* Header with Dynamic Profile Avatar */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">HR Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, {userName}!</p>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Dynamic Circle with User Initial */}
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-200 ring-4 ring-white transition-transform hover:scale-105">
              {userInitial}
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {["Active Jobs", "New Candidates", "Interviews"].map((stat) => (
            <div key={stat} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{stat}</p>
              <p className="text-3xl font-black text-blue-600">0</p>
            </div>
          ))}
        </div>

        {/* Placeholder Content */}
        <div className="bg-white p-20 rounded-[2rem] border-2 border-dashed border-gray-200 text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to start hiring, {userName}?</h3>
          <p className="text-gray-400 max-w-xs mx-auto text-sm">
            Your workspace is ready. Once you post your first job, the data will populate here.
          </p>
        </div>
      </div>
    </div>
  );
}

// Wrapping with Suspense to prevent Prerendering errors on Vercel
export default function FakeDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
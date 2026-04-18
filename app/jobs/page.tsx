"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
}

export default function JobsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // 1. Protection: Wait for Auth and check user existence
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }

    // 2. API Configuration (Using Environment Variables)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

    const fetchJobs = async () => {
      try {
        const res = await fetch(`${apiUrl}/jobs/`, {
          headers: { 
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json"
          },
        });

        if (res.status === 401) {
          throw new Error("Session expired. Please log in again.");
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          setError(data.detail || "Invalid data format received from server.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user, authLoading, router]);

  // Loading State UI
  if (authLoading || loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Loading jobs...</p>
      </div>
    );
  }

  // Error State UI
  if (error) {
    return (
      <div className="p-8 text-center max-w-md mx-auto bg-red-50 rounded-2xl mt-12 border border-red-100 shadow-sm">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <p className="text-red-700 font-semibold mb-6">{error}</p>
        <button 
          onClick={() => router.push("/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Job Feed</h1>
          <p className="text-gray-500 mt-1">Discover your next career move</p>
        </div>
        <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-blue-200 shadow-lg">
          {jobs.length} Positions
        </span>
      </header>

      {jobs.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <div className="text-5xl mb-4">📂</div>
          <p className="text-gray-400 text-xl font-medium">No jobs posted yet.</p>
          <p className="text-gray-300 text-sm mt-2">New opportunities will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
                  <span className="text-xl group-hover:filter group-hover:invert transition-all">💼</span>
                </div>
                <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Active
                </span>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {job.title}
              </h2>
              
              <div className="flex items-center text-gray-400 text-sm mt-2 mb-4">
                <span className="mr-1">📍</span> {job.location}
              </div>

              <p className="text-gray-600 leading-relaxed text-sm line-clamp-3 mb-6">
                {job.description}
              </p>
              
              <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                <button className="text-blue-600 text-sm font-bold hover:text-blue-800 transition-colors">
                  View Details
                </button>
                <span className="text-gray-300">→</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
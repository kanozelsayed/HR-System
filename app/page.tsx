"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function LandingPage() {
  const navRef = useRef<HTMLElement>(null);
  // 1. STATE for Role Selection Modal
  const [showRoleModal, setShowRoleModal] = useState(false);

  // Navbar Shadow on Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.style.boxShadow =
          window.scrollY > 10 ? "0 1px 12px rgba(0,0,0,0.06)" : "none";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for Reveal Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight)
          el.classList.add("visible");
      });
    }, 100);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      bg: "#EFF6FF",
      title: "AI Screening",
      desc: "Automatically review and rank every application the moment it arrives — no manual effort needed.",
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth="1.8">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      ),
    },
    {
      bg: "#ECFDF5",
      title: "Smart Matching",
      desc: "AI matches candidates to roles based on skills, experience, and culture fit — instantly.",
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth="1.8">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
      ),
    },
    {
      bg: "#F5F3FF",
      title: "Team Management",
      desc: "Keep your entire workforce organized — roles, attendance, performance, and growth all in one place.",
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#7C3AED" strokeWidth="1.8">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      bg: "#FFF7ED",
      title: "Hiring Insights",
      desc: "Understand your pipeline at a glance. AI surfaces what's working and where to improve.",
      icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#EA580C" strokeWidth="1.8">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
  ];

  const steps = [
    {
      label: "Post",
      title: "Create a Job in Seconds",
      desc: "Describe the role and let AI write the job post, set requirements, and publish it — ready to attract the right candidates immediately.",
      color: "bg-blue-50 text-blue-700 border-blue-100",
    },
    {
      label: "Screen",
      title: "AI Reviews Every Application",
      desc: "SmartHire AI reads every CV, scores each candidate against your requirements, and surfaces the best matches to your team.",
      color: "bg-violet-50 text-violet-700 border-violet-100",
    },
    {
      label: "Hire",
      title: "Make Confident Decisions",
      desc: "Schedule interviews, collaborate with your team, send offers, and onboard — all from one clean, intelligent dashboard.",
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
  ];

  return (
    <>
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1);
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 0.1s; }
        .d2 { transition-delay: 0.2s; }
        .d3 { transition-delay: 0.3s; }
        .d4 { transition-delay: 0.4s; }
        .hover-card { transition: all 0.2s; }
        .hover-card:hover { transform: translateY(-3px); border-color: #93C5FD !important; }
        .btn-main:hover { background: #1d4ed8 !important; transform: translateY(-1px); }
        .btn-outline:hover { background: #F9FAFB; transform: translateY(-1px); }
        .pulse-dot { animation: pdot 2s infinite; }
        @keyframes pdot {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.5; transform:scale(0.8); }
        }
        .orb { animation: orb 2s infinite; }
        @keyframes orb {
          0%,100% { transform:scale(1); }
          50% { transform:scale(1.35); }
        }
      `}</style>

      <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden relative">

        {/* NAVBAR */}
        <nav
          ref={navRef}
          className="sticky top-0 z-50 bg-white border-b border-gray-100 transition-all"
          style={{ padding: "0 2.5rem", height: "58px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <span style={{ fontSize: "19px", fontWeight: 500, letterSpacing: "-0.3px" }}>
            <span className="text-blue-600">SmartHire</span>
            <span className="text-gray-900">.ai</span>
          </span>
          <Link
            href="/login"
            className="text-sm font-medium border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-all"
          >
            Sign In
          </Link>
        </nav>

        {/* HERO */}
        <section className="text-center max-w-3xl mx-auto px-6 pt-24 pb-20">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-xs font-medium text-blue-700 mb-8">
            <span className="pulse-dot w-1.5 h-1.5 bg-blue-500 rounded-full inline-block" />
            AI-Powered Hiring Platform
          </div>

          <h1 className="reveal d1 font-medium leading-tight tracking-tight text-gray-900 mb-6"
            style={{ fontSize: "clamp(36px,5.5vw,60px)", letterSpacing: "-1.5px" }}>
            Hire Smarter,<br />
            <span className="text-blue-600">Not Harder.</span>
          </h1>

          <p className="reveal d2 text-gray-500 leading-relaxed max-w-lg mx-auto mb-10"
            style={{ fontSize: "16px", lineHeight: "1.8" }}>
            SmartHire.ai uses AI to automate your hiring process — from screening candidates to scheduling interviews — so your team can focus on hiring, not paperwork
          </p>

          <div className="reveal d3 flex gap-3 justify-center flex-wrap mb-16">
            <button
              onClick={() => setShowRoleModal(true)}
              className="btn-main px-8 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg transition-all active:scale-[0.98]"
            >
              Get Started Free
            </button>
            <button
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline px-8 py-3 border border-gray-200 text-sm font-medium rounded-lg transition-all active:scale-[0.98]"
            >
              See How It Works  →
            </button>
          </div>

          {/* MINI DASHBOARD PREVIEW */}
          <div className="reveal d4 bg-white border border-gray-100 rounded-2xl p-5 max-w-lg mx-auto text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs text-gray-400 font-medium">SmartHire AI — Active</span>
            </div>
            <div className="space-y-2">
              {[
                "Reviewing incoming applications...",
                "Matching candidates to open roles...",
                "Scheduling interviews automatically...",
              ].map((msg, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  <span className="text-xs text-gray-500">{msg}</span>
                  <span className="ml-auto text-xs text-green-500 font-medium">Done</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="max-w-5xl mx-auto px-6 py-24">
          <p className="reveal text-xs font-medium text-blue-600 text-center tracking-widest uppercase mb-3">What We Do</p>
          <h2 className="reveal d1 text-3xl font-medium text-center tracking-tight mb-14">Everything you need to hire better</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div key={i} className={`reveal d${i + 1} hover-card bg-white border border-gray-100 rounded-2xl p-5`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: f.bg }}>{f.icon}</div>
                <p className="text-sm font-medium mb-2">{f.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 px-6 text-center max-w-2xl mx-auto">
          <h2 className="reveal text-4xl font-medium tracking-tight mb-5">Your next great hire starts here.</h2>
          <button
            onClick={() => setShowRoleModal(true)}
            className="reveal d2 btn-main px-8 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg transition-all active:scale-[0.98]"
          >
            Get Started for Free
          </button>
        </section>

        {/* ROLE SELECTION MODAL */}
        {showRoleModal && (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowRoleModal(false)}
          >
            <div 
              className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowRoleModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center mb-10">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-2">Join SmartHire.ai</h2>
                <p className="text-gray-500 text-sm">Select how you want to use the platform to get started</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Seeker Card */}
                <Link 
                  href="/signup?role=seeker"
                  className="group p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50/30 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Job Seeker</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed">Find your dream job and get matched with AI-powered insights.</p>
                </Link>

                {/* Partner Card */}
                <Link 
                  href="/signup?role=partner"
                  className="group p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50/30 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#4f46e5" strokeWidth="2">
                      <path d="M3 21h18M3 7v1a3 3 0 006 0V7m6 0v1a3 3 0 006 0V7M4 21V4a2 2 0 012-2h12a2 2 0 012 2v17M9 21h6" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">Hiring Partner</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed">Post jobs and let AI score resumes to find the best talent.</p>
                </Link>
              </div>

              <p className="mt-8 text-center text-xs text-gray-400">
                Already have an account? <Link href="/login" className="text-blue-600 hover:underline font-medium">Sign In</Link>
              </p>
            </div>
          </div>
        )}

        <footer className="px-10 py-6 flex items-center justify-between border-t border-gray-100 flex-wrap gap-3">
          <span className="text-sm font-medium"><span className="text-blue-600">SmartHire</span>.ai</span>
          <span className="text-xs text-gray-400">© 2026 SmartHire.ai — All rights reserved.</span>
        </footer>
      </div>
    </>
  );
}
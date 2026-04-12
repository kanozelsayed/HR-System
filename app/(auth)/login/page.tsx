"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  // ─── STATE MANAGEMENT ──────────────────────────────────────────────────────
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isValid, setIsValid] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // ─── TOAST HANDLER ─────────────────────────────────────────────────────────
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ─── REAL-TIME VALIDATION LOGIC ───────────────────────────────────────────
  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 8;

    setIsValid(isEmailValid && isPasswordValid);

    const newErrors = { ...errors };
    if (isEmailValid) delete newErrors.email;
    if (isPasswordValid) delete newErrors.password;
    setErrors(newErrors);
  }, [email, password]);

  // ─── EVENT HANDLERS ────────────────────────────────────────────────────────
  const handleBlur = (field: "email" | "password") => {
    setTouched({ ...touched, [field]: true });
    validateField(field);
  };

  const validateField = (field: "email" | "password") => {
    const newErrors = { ...errors };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (field === "email") {
      if (!email) newErrors.email = "Email is required";
      else if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address";
      else delete newErrors.email;
    }
    if (field === "password") {
      if (!password) newErrors.password = "Password is required";
      else if (password.length < 8) newErrors.password = "Minimum 8 characters";
      else delete newErrors.password;
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);

    // تمثيلية التواصل مع السيرفر
    setTimeout(() => {
      setIsSubmitting(false);
      
      // تجربة الدخول ببيانات افتراضية
      if (email === "admin@smarthire.ai" && password === "password123") {
        showToast("Login successful! Welcome back.", "success");
        
        // الانتقال للداشبورد بعد ثانية واحدة
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        showToast("Invalid credentials. Please try again.", "error");
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 relative font-sans">
      
      {/* ── BACK TO HOME BUTTON ── */}
      <button 
        onClick={() => router.push("/")}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-all font-medium text-sm group"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-1 transition-transform">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Home
      </button>

      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-all">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2 tracking-tight">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-8 text-sm font-medium">Sign in to manage your hiring process</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              onBlur={() => handleBlur("email")}
              className={`w-full px-4 py-2.5 border rounded-xl outline-none transition-all duration-200 ${
                touched.email && errors.email ? "border-red-500 bg-red-50/30" : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {touched.email && errors.email && <p className="text-red-500 text-[10px] mt-1 ml-2 font-medium">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onBlur={() => handleBlur("password")}
                className={`w-full px-4 py-2.5 border rounded-xl outline-none transition-all duration-200 ${
                  touched.password && errors.password ? "border-red-500 bg-red-50/30" : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {touched.password && errors.password && <p className="text-red-500 text-[10px] mt-1 ml-2 font-medium">{errors.password}</p>}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
              isValid && !isSubmitting
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-[0.98]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </span>
            ) : "Login"}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup/role" className="text-blue-600 font-bold hover:underline transition-all underline-offset-4">Sign up</Link>
        </p>
      </div>

      {/* Toast UI */}
      {toast && (
        <div className={`fixed top-10 right-10 z-[100] flex items-center px-6 py-3 rounded-2xl shadow-2xl border text-white transition-all duration-500 animate-in fade-in slide-in-from-top-10 ${
          toast.type === "success" ? "bg-emerald-500 border-emerald-400" : "bg-red-500 border-red-400"
        }`}>
          <span className="mr-3 text-lg">{toast.type === "success" ? "✅" : "❌"}</span>
          <p className="text-sm font-semibold tracking-wide">{toast.message}</p>
        </div>
      )}
    </div>
  );
}
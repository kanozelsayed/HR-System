"use client";

import { useState, useEffect, FormEvent, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";

function LoginContent() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isValid, setIsValid] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const validateField = (field: "email" | "password", value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (field === "email") {
        if (!value) newErrors.email = "Email is required";
        else if (!emailRegex.test(value)) newErrors.email = "Invalid email";
        else delete newErrors.email;
      }
      if (field === "password") {
        if (!value) newErrors.password = "Password is required";
        else if (value.length < 8) newErrors.password = "Min 8 characters";
        else delete newErrors.password;
      }
      return newErrors;
    });
  };

  const handleBlur = (field: "email" | "password") => {
    const value = field === "email" ? email : password;
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsValid(emailRegex.test(email) && password.length >= 8);
  }, [email, password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // ✅ Using the environment variable URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

    try {
      const response = await axios.post(`${apiUrl}/company/login`, {
        email: cleanEmail,
        password: cleanPassword,
      });

      const { access_token, user } = response.data;

      // ✅ Saving standard data to AuthContext
      login({
        name: user.name,
        email: user.email,
        role: "company",
        token: access_token,
      });

      showToast("Login successful! Redirecting...", "success");
      
      // Navigate to Jobs Feed
      setTimeout(() => router.push("/jobs"), 1000);

    } catch (error: any) {
      console.error("Login Error Details:", error.response?.data);
      const errorMsg = error.response?.data?.detail || "Invalid email or password";
      showToast(errorMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 relative font-sans text-gray-900">
      <button
        onClick={() => router.push("/")}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-all font-medium text-sm group"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
          className="group-hover:-translate-x-1 transition-transform">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Home
      </button>

      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2 tracking-tight">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-8 text-sm font-medium">Sign in to manage your hiring process.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email" 
              placeholder="e.g. kenzy3@test.com"
              onBlur={() => handleBlur("email")}
              onChange={(e) => { setEmail(e.target.value); if (touched.email) validateField("email", e.target.value); }}
              className={`w-full px-4 py-2.5 border rounded-xl outline-none transition-all ${
                touched.email && errors.email ? "border-red-500 bg-red-50/30" : "border-gray-200 focus:border-blue-500"
              }`}
              value={email}
            />
            {touched.email && errors.email && <p className="text-red-500 text-[10px] mt-1 ml-2">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                onBlur={() => handleBlur("password")}
                onChange={(e) => { setPassword(e.target.value); if (touched.password) validateField("password", e.target.value); }}
                className={`w-full px-4 py-2.5 border rounded-xl outline-none transition-all ${
                  touched.password && errors.password ? "border-red-500 bg-red-50/30" : "border-gray-200 focus:border-blue-500"
                }`}
                value={password}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-[10px] font-bold uppercase">
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {touched.password && errors.password && <p className="text-red-500 text-[10px] mt-1 ml-2">{errors.password}</p>}
          </div>

          <button type="submit" disabled={!isValid || isSubmitting}
            className={`w-full py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ${
              isValid && !isSubmitting ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 font-bold hover:underline underline-offset-4">Sign up</Link>
        </p>
      </div>

      {toast && (
        <div className={`fixed top-10 right-10 z-[100] flex items-center px-6 py-3 rounded-2xl shadow-2xl border text-white transition-all duration-500 ${
          toast.type === "success" ? "bg-emerald-500 border-emerald-400" : "bg-red-500 border-red-400"
        }`}>
          <span className="mr-3 text-lg">{toast.type === "success" ? "✅" : "❌"}</span>
          <p className="text-sm font-semibold">{toast.message}</p>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 text-blue-600 font-medium italic">Loading Login...</div>}>
      <LoginContent />
    </Suspense>
  );
}
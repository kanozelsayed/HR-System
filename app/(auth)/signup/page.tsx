"use client";

import { useState, useEffect, FormEvent, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

// ─── HELPERS & CONFIGURATION ────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Calculates password strength score (0-4)
 */
const getStrengthScore = (val: string) => {
  if (!val) return 0;
  let s = 0;
  if (val.length >= 8) s++;
  if (/[A-Z]/.test(val) && /[a-z]/.test(val)) s++;
  if (/[0-9]/.test(val)) s++;
  if (/[^A-Za-z0-9]/.test(val)) s++;
  return s;
};

const STRENGTH_CONFIG: Record<number, { label: string; color: string; width: string }> = {
  1: { label: "Weak", color: "bg-red-500", width: "w-1/4" },
  2: { label: "Fair", color: "bg-orange-400", width: "w-2/4" },
  3: { label: "Good", color: "bg-blue-500", width: "w-3/4" },
  4: { label: "Strong", color: "bg-green-500", width: "w-full" },
};

// ─── MAIN CONTENT COMPONENT ──────────────────────────────────────────────────
function SignUpContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State for user role (seeker/partner) derived from URL
  const [role, setRole] = useState(searchParams.get("role") || "seeker");

  // Form data state management
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    companyName: "",
    industry: "",
    customIndustry: "", 
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Helper to trigger toast notifications
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  /**
   * Field-level validation logic
   */
  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "email" && !EMAIL_RE.test(value)) error = "Invalid email format";
    if (name === "password" && value.length < 8) error = "Min 8 characters required";
    if (name === "confirmPassword" && value !== formData.password) error = "Passwords don't match";
    
    // Role-specific validation
    if (role === "seeker") {
      if ((name === "firstname" || name === "lastname") && !value.trim()) error = "Required";
    } else {
      if (name === "companyName" && !value.trim()) error = "Required";
      if (name === "industry" && !value) error = "Required";
      if (name === "customIndustry" && formData.industry === "other" && !value.trim()) error = "Please specify";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  /**
   * Effect to handle overall form validity (enables/disables submit button)
   */
  useEffect(() => {
    const isEmailValid = EMAIL_RE.test(formData.email);
    const isPassValid = formData.password.length >= 8;
    const isConfirmValid = formData.confirmPassword === formData.password && formData.confirmPassword !== "";

    let isRoleValid = false;
    if (role === "partner") {
      const isIndustryValid = formData.industry === "other" 
        ? formData.customIndustry.trim() !== "" 
        : formData.industry !== "";
      isRoleValid = formData.companyName.trim() !== "" && isIndustryValid;
    } else {
      isRoleValid = formData.firstname.trim() !== "" && formData.lastname.trim() !== "";
    }

    setIsValid(isEmailValid && isPassValid && isConfirmValid && isRoleValid);
  }, [formData, role]);

  /**
   * Handles input changes and clears conditional fields
   */
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => {
      const newState = { ...prev, [name]: value };
      if (name === "industry" && value !== "other") {
        newState.customIndustry = "";
      }
      return newState;
    });

    if (touched[name]) validateField(name, value);
  };

  /**
   * Handles blur events to trigger validation styling
   */
  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, (formData as any)[name]);
  };

  /**
   * Simulated signup submission
   * English Comments: Capturing name and passing it to dashboard for personalization
   */
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      showToast("Account created successfully!", "success");

      // Logic to pass user's name to dashboard
      const userName = role === "partner" ? formData.companyName : formData.firstname;

      setTimeout(() => {
        // Navigating with name parameter
        router.push(`/dashboard?name=${userName}`);
      }, 1500);
    }, 2000);
  };

  const score = getStrengthScore(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 relative font-sans text-gray-900">
      
      {/* Back Button */}
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
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 tracking-tight">Create Account</h2>

        {/* ROLE SWITCHER WITH ICONS */}
        <div className="flex p-1 bg-gray-100 rounded-2xl mb-8">
          <button
            type="button"
            onClick={() => setRole("seeker")}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-xl text-xs font-bold transition-all ${
              role === "seeker" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Seeker
          </button>
          <button
            type="button"
            onClick={() => setRole("partner")}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-xl text-xs font-bold transition-all ${
              role === "partner" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Partner
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          
          {role === "seeker" ? (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-300">
              <input
                placeholder="First Name"
                className={`w-full px-4 py-2 border rounded-xl outline-none transition-all ${touched.firstname && errors.firstname ? "border-red-500" : "border-gray-200 focus:border-blue-500"}`}
                value={formData.firstname}
                onChange={(e) => handleChange("firstname", e.target.value)}
                onBlur={() => handleBlur("firstname")}
              />
              <input
                placeholder="Last Name"
                className={`w-full px-4 py-2 border rounded-xl outline-none transition-all ${touched.lastname && errors.lastname ? "border-red-500" : "border-gray-200 focus:border-blue-500"}`}
                value={formData.lastname}
                onChange={(e) => handleChange("lastname", e.target.value)}
                onBlur={() => handleBlur("lastname")}
              />
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-300">
              <input
                placeholder="Company Name"
                className={`w-full px-4 py-2 border rounded-xl outline-none transition-all ${touched.companyName && errors.companyName ? "border-red-500" : "border-gray-200 focus:border-blue-500"}`}
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                onBlur={() => handleBlur("companyName")}
              />
              
              <select
                className={`w-full px-4 py-2 border rounded-xl outline-none bg-white transition-all ${
                  touched.industry && errors.industry ? "border-red-500" : "border-gray-200 focus:border-blue-500"
                } ${formData.industry === "" ? "text-gray-400" : "text-gray-900"}`}
                value={formData.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
                onBlur={() => handleBlur("industry")}
              >
                <option value="" disabled hidden>Select Industry</option>
                <option value="tech">Tech</option>
                <option value="finance">Finance</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>

              {formData.industry === "other" && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <input
                    placeholder="Please specify your industry"
                    className={`w-full px-4 py-2 border border-blue-200 rounded-xl outline-none bg-blue-50/30 focus:border-blue-500 transition-all text-sm`}
                    value={formData.customIndustry}
                    onChange={(e) => handleChange("customIndustry", e.target.value)}
                    onBlur={() => handleBlur("customIndustry")}
                  />
                </div>
              )}
            </div>
          )}

          <input
            type="email"
            placeholder="Email Address"
            className={`w-full px-4 py-2 border rounded-xl outline-none transition-all ${touched.email && errors.email ? "border-red-500" : "border-gray-200 focus:border-blue-500"}`}
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full px-4 py-2 border rounded-xl outline-none transition-all ${touched.password && errors.password ? "border-red-500" : "border-gray-200 focus:border-blue-500"}`}
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() => handleBlur("password")}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 hover:text-gray-600 transition-colors">
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          {formData.password && (
            <div className="mt-1 px-1">
              <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-500 ${STRENGTH_CONFIG[score]?.color} ${STRENGTH_CONFIG[score]?.width}`} />
              </div>
              <p className={`text-[9px] font-bold mt-1 uppercase tracking-tighter ${STRENGTH_CONFIG[score]?.color.replace("bg-", "text-")}`}>
                {STRENGTH_CONFIG[score]?.label} Password
              </p>
            </div>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            className={`w-full px-4 py-2 border rounded-xl outline-none transition-all ${touched.confirmPassword && errors.confirmPassword ? "border-red-500" : "border-gray-200 focus:border-blue-500"}`}
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            onBlur={() => handleBlur("confirmPassword")}
          />

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-3 rounded-2xl font-bold text-sm transition-all mt-4 ${isValid && !isSubmitting ? "bg-blue-600 text-white shadow-lg shadow-blue-100 active:scale-95 hover:bg-blue-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline transition-all underline-offset-4">Sign In</Link>
        </p>
      </div>

      {toast && (
        <div className={`fixed top-10 right-10 z-[100] px-6 py-3 rounded-2xl shadow-2xl text-white transition-all animate-in slide-in-from-top-10 ${toast.type === "success" ? "bg-emerald-500 border border-emerald-400" : "bg-red-500 border border-red-400"}`}>
          <div className="flex items-center gap-2 font-medium">
            <span>{toast.type === "success" ? "✅" : "❌"}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── FINAL EXPORT WRAPPED IN SUSPENSE ────────────────────────────────────────
export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 text-blue-600 font-medium italic animate-pulse text-lg">Loading Signup...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
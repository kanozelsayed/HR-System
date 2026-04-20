import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ الصفحات دي محتاجة login بس
const PROTECTED = ["/jobs", "/dashboard", "/candidates"];

// ✅ الصفحات دي للـ employer (الشركة) بس
const COMPANY_ONLY = ["/candidates"];

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user")?.value;
  const pathname = request.nextUrl.pathname;

  // لو مش logged in وبيحاول يدخل protected page
  if (PROTECTED.some((p) => pathname.startsWith(p)) && !userCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ التحقق من صلاحيات صفحة الـ Candidates
  if (COMPANY_ONLY.some((p) => pathname.startsWith(p)) && userCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(userCookie));
      
      // 🚨 التعديل الجوهري هنا: بنقارن بـ employer مش company
      if (parsed.role !== "employer") { 
        return NextResponse.redirect(new URL("/jobs", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/jobs/:path*", "/dashboard/:path*", "/candidates/:path*"],
};
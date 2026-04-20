"use client";

import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_APPLICATIONS = [
  { id: 1, company: "SmartHire AI", role: "Frontend Developer", date: "Apr 15, 2026", status: "Shortlisted", match: 92 },
  { id: 2, company: "Tech Solutions", role: "React Engineer", date: "Apr 12, 2026", status: "Pending", match: 78 },
  { id: 3, company: "FutureMind", role: "UI Developer", date: "Apr 10, 2026", status: "Rejected", match: 55 },
  { id: 4, company: "DevCorp", role: "Full Stack Developer", date: "Apr 8, 2026", status: "Pending", match: 84 },
  { id: 5, company: "CloudBase", role: "Next.js Developer", date: "Apr 5, 2026", status: "Shortlisted", match: 88 },
];

const RECOMMENDED_JOBS = [
  { id: 1, title: "Senior React Developer", company: "NovaTech", location: "Cairo", match: 95 },
  { id: 2, title: "Frontend Engineer", company: "PixelWorks", location: "Remote", match: 89 },
  { id: 3, title: "UI/UX Developer", company: "DesignHub", location: "Alexandria", match: 82 },
];

const MOCK_JOBS = [
  { id: 1, title: "Frontend Developer", applicants: 24, shortlisted: 8, avgMatch: 78 },
  { id: 2, title: "React Engineer", applicants: 18, shortlisted: 5, avgMatch: 82 },
  { id: 3, title: "UI/UX Designer", applicants: 31, shortlisted: 10, avgMatch: 74 },
  { id: 4, title: "Full Stack Developer", applicants: 15, shortlisted: 4, avgMatch: 88 },
];

const MOCK_TOP_CANDIDATES = [
  { id: 1, name: "Nour El-Din", role: "Mobile Developer", score: 95 },
  { id: 2, name: "Ahmed Ali", role: "Frontend Developer", score: 92 },
  { id: 3, name: "Laila Karim", role: "UX Researcher", score: 89 },
];

// ─── Shared Helper Components ─────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Shortlisted: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Pending: "bg-amber-50 text-amber-700 border-amber-100",
    Rejected: "bg-red-50 text-red-700 border-red-100",
  };
  const icons: Record<string, string> = {
    Shortlisted: "✅", Pending: "⏳", Rejected: "❌",
  };
  return (
    <span className={`px-3 py-1 rounded-full border text-xs font-bold flex items-center gap-1 w-fit ${styles[status]}`}>
      {icons[status]} {status}
    </span>
  );
}

function MatchBar({ score }: { score: number }) {
  const color = score >= 85 ? "bg-emerald-500" : score >= 65 ? "bg-amber-400" : "bg-red-400";
  const badge = score >= 85 ? "text-emerald-600 bg-emerald-50 border-emerald-100" : score >= 65 ? "text-amber-600 bg-amber-50 border-amber-100" : "text-red-600 bg-red-50 border-red-100";
  return (
    <div className="flex items-center gap-2 w-full max-w-[160px]">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-black ${badge}`}>{score}%</span>
    </div>
  );
}

// ─── Seeker Dashboard ─────────────────────────────────────────────────────────

function ProfileStrength({ score }: { score: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-slate-600">Profile Strength</span>
        <span className="text-xs font-black text-blue-600">{score}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700"
          style={{ width: `${score}%` }} />
      </div>
      <p className="text-[10px] text-slate-400 mt-1">
        {score >= 80 ? "🔥 Strong profile! You're getting noticed." : "💡 Complete your profile to get more matches."}
      </p>
    </div>
  );
}

function SeekerDashboard() {
  const { user } = useAuth();
  const userName = user?.name || "Guest";
  const userInitial = userName.charAt(0).toUpperCase();

  const shortlisted = MOCK_APPLICATIONS.filter(a => a.status === "Shortlisted").length;
  const pending = MOCK_APPLICATIONS.filter(a => a.status === "Pending").length;
  const rejected = MOCK_APPLICATIONS.filter(a => a.status === "Rejected").length;
  const avgMatch = Math.round(MOCK_APPLICATIONS.reduce((sum, a) => sum + a.match, 0) / MOCK_APPLICATIONS.length);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Dashboard</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Welcome back, <span className="text-blue-600 font-bold">{userName}</span>! Here's your job hunt summary.
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-200 ring-4 ring-white">
            {userInitial}
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Applied", value: MOCK_APPLICATIONS.length, color: "text-blue-600", bg: "bg-blue-50", dot: "bg-blue-400" },
            { label: "Shortlisted", value: shortlisted, color: "text-emerald-600", bg: "bg-emerald-50", dot: "bg-emerald-400" },
            { label: "Pending", value: pending, color: "text-amber-600", bg: "bg-amber-50", dot: "bg-amber-400" },
            { label: "Avg AI Match", value: `${avgMatch}%`, color: "text-purple-600", bg: "bg-purple-50", dot: "bg-purple-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className={`w-8 h-8 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <div className={`w-3 h-3 rounded-full ${stat.dot}`} />
              </div>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-100">
                {userInitial}
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{userName}</h3>
                <p className="text-xs text-slate-400">{user?.email}</p>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 mt-1 inline-block">
                  Job Seeker
                </span>
              </div>
            </div>
            <ProfileStrength score={72} />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 text-sm">Application Status</h3>
            <div className="space-y-3">
              {[
                { label: "Shortlisted", count: shortlisted, color: "bg-emerald-500" },
                { label: "Pending Review", count: pending, color: "bg-amber-400" },
                { label: "Rejected", count: rejected, color: "bg-red-400" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-slate-600">{item.label}</span>
                    <span className="text-xs font-black text-slate-700">{item.count}/{MOCK_APPLICATIONS.length}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${(item.count / MOCK_APPLICATIONS.length) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">My Applications</h3>
            <span className="text-xs text-slate-400 font-medium">{MOCK_APPLICATIONS.length} total</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-3 text-left font-bold text-slate-600 text-xs">Company & Role</th>
                <th className="px-6 py-3 text-left font-bold text-slate-600 text-xs">AI Match</th>
                <th className="px-6 py-3 text-left font-bold text-slate-600 text-xs">Status</th>
                <th className="px-6 py-3 text-left font-bold text-slate-600 text-xs">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_APPLICATIONS.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/60 transition-all">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800 text-sm">{app.company}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{app.role}</p>
                  </td>
                  <td className="px-6 py-4"><MatchBar score={app.match} /></td>
                  <td className="px-6 py-4"><StatusBadge status={app.status} /></td>
                  <td className="px-6 py-4"><span className="text-xs text-slate-400">{app.date}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Company Dashboard ────────────────────────────────────────────────────────

function CompanyDashboard() {
  const { user } = useAuth();
  const userName = user?.name || "Guest";
  const userInitial = userName.charAt(0).toUpperCase();

  const totalApplicants = MOCK_JOBS.reduce((sum, j) => sum + j.applicants, 0);
  const totalShortlisted = MOCK_JOBS.reduce((sum, j) => sum + j.shortlisted, 0);
  const avgMatch = Math.round(MOCK_JOBS.reduce((sum, j) => sum + j.avgMatch, 0) / MOCK_JOBS.length);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">HR Dashboard</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Welcome back, <span className="text-blue-600 font-bold">{userName}</span>! Here's your hiring overview.
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-200 ring-4 ring-white">
            {userInitial}
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Active Jobs", value: MOCK_JOBS.length, color: "text-blue-600", dot: "bg-blue-400", bg: "bg-blue-50" },
            { label: "Total Applicants", value: totalApplicants, color: "text-purple-600", dot: "bg-purple-400", bg: "bg-purple-50" },
            { label: "Shortlisted", value: totalShortlisted, color: "text-emerald-600", dot: "bg-emerald-400", bg: "bg-emerald-50" },
            { label: "Avg AI Match", value: `${avgMatch}%`, color: "text-amber-600", dot: "bg-amber-400", bg: "bg-amber-50" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className={`w-8 h-8 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <div className={`w-3 h-3 rounded-full ${stat.dot}`} />
              </div>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 text-sm">Hiring Funnel</h3>
            <div className="space-y-3">
              {[
                { label: "Applied", count: totalApplicants, color: "bg-blue-500", max: totalApplicants },
                { label: "Reviewed", count: Math.round(totalApplicants * 0.65), color: "bg-purple-500", max: totalApplicants },
                { label: "Shortlisted", count: totalShortlisted, color: "bg-emerald-500", max: totalApplicants },
                { label: "Interviewed", count: Math.round(totalShortlisted * 0.4), color: "bg-amber-400", max: totalApplicants },
              ].map((step) => (
                <div key={step.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-slate-600">{step.label}</span>
                    <span className="text-xs font-black text-slate-700">{step.count}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${step.color} transition-all duration-700`}
                      style={{ width: `${(step.count / step.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 text-sm">🏆 Top Candidates</h3>
            <div className="space-y-3">
              {MOCK_TOP_CANDIDATES.map((c, i) => (
                <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/60 hover:bg-slate-100/60 transition-all">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white ${i === 0 ? "bg-amber-400" : i === 1 ? "bg-slate-400" : "bg-orange-400"}`}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.role}</p>
                  </div>
                  <MatchBar score={c.score} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Jobs Performance</h3>
            <span className="text-xs text-slate-400 font-medium">{MOCK_JOBS.length} active jobs</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-3 text-left font-bold text-slate-600 text-xs">Job Title</th>
                <th className="px-6 py-3 text-left font-bold text-slate-600 text-xs">Applicants</th>
                <th className="px-6 py-3 text-left font-bold text-slate-600 text-xs">Shortlisted</th>
                <th className="px-6 py-3 text-left font-bold text-slate-600 text-xs">Avg AI Match</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_JOBS.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/60 transition-all">
                  <td className="px-6 py-4"><p className="font-bold text-slate-800">{job.title}</p></td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-blue-600">{job.applicants}</span>
                    <span className="text-xs text-slate-400 ml-1">applicants</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-emerald-600">{job.shortlisted}</span>
                      <span className="text-xs text-slate-400">({Math.round((job.shortlisted / job.applicants) * 100)}%)</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><MatchBar score={job.avgMatch} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Smart Router & Protection ────────────────────────────────────────────────

function DashboardContent() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // 🛡️ حماية المسار: لو المستخدم مش مسجل يرجعه للـ Login
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
    </div>
  );

  if (!user) return null;

  // ✅ Seeker Dashboard
  if (user?.role === "seeker") return <SeekerDashboard />;

  // ✅ Company Dashboard (كلمة employer اللي جاية من الباكيند)
  if (user?.role === "employer") return <CompanyDashboard />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-red-500 font-bold">Unauthorized Access</p>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
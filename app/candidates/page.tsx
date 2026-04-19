"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

interface Candidate {
  id: number;
  name: string;
  role: string;
  email: string;
  score: number;
  status: "Shortlisted" | "Pending" | "Rejected";
  feedback: {
    strengths: string[];
    weaknesses: string[];
    recommendation: string;
  };
}

const MOCK_CANDIDATES: Candidate[] = [
  { id: 1, name: "Ahmed Ali", role: "Senior Frontend Developer", email: "ahmed.ali@example.com", score: 92, status: "Shortlisted", feedback: { strengths: ["Expert React architectural knowledge", "Strong optimization skills"], weaknesses: ["Minimal backend experience"], recommendation: "Highly recommended for lead roles." }},
  { id: 2, name: "Sara Hassan", role: "Product Designer", email: "sara.h@example.com", score: 84, status: "Shortlisted", feedback: { strengths: ["Clean UI aesthetics", "User-centric flow design"], weaknesses: ["New to design system documentation"], recommendation: "Great fit for the design team." }},
  { id: 3, name: "Mohamed Omar", role: "React Developer", email: "mo.omar@example.com", score: 76, status: "Pending", feedback: { strengths: ["Quick learner", "Solid JavaScript basics"], weaknesses: ["Needs to improve on TypeScript types"], recommendation: "Good potential for a mid-level role." }},
  { id: 4, name: "Laila Karim", role: "UX Researcher", email: "laila.k@example.com", score: 89, status: "Shortlisted", feedback: { strengths: ["Deep user interviewing skills", "Data-driven insights"], weaknesses: ["Basic visual design skills"], recommendation: "Strong asset for the research phase." }},
  { id: 5, name: "Youssef Zaid", role: "Frontend Engineer", email: "y.zaid@example.com", score: 62, status: "Pending", feedback: { strengths: ["Punctual", "Basic CSS/HTML mastery"], weaknesses: ["Struggles with complex state management"], recommendation: "Requires mentorship and training." }},
  { id: 6, name: "Nour El-Din", role: "Mobile Developer", email: "nour.e@example.com", score: 95, status: "Shortlisted", feedback: { strengths: ["React Native expert", "Published 5+ apps"], weaknesses: ["Strong opinion on architecture"], recommendation: "Perfect match for the mobile team." }},
  { id: 7, name: "Mariam Soliman", role: "Quality Assurance", email: "mariam.s@example.com", score: 81, status: "Pending", feedback: { strengths: ["Eye for detail", "Excellent bug reporting"], weaknesses: ["Basic automation testing knowledge"], recommendation: "Solid manual tester moving to automation." }},
  { id: 8, name: "Hassan Mahmoud", role: "Backend Developer", email: "hassan.m@example.com", score: 55, status: "Rejected", feedback: { strengths: ["Knowledge of Python"], weaknesses: ["Fails to follow REST principles", "Poor documentation"], recommendation: "Not suitable for the current requirements." }},
  { id: 9, name: "Jana Wael", role: "Graphic Designer", email: "jana.w@example.com", score: 79, status: "Pending", feedback: { strengths: ["Creative branding", "Fast delivery"], weaknesses: ["Needs to learn web accessibility"], recommendation: "Talented but needs web-specific guidance." }},
  { id: 10, name: "Omar Farouk", role: "Software Engineer", email: "omar.f@example.com", score: 88, status: "Shortlisted", feedback: { strengths: ["Strong Algorithms base", "Clean code enthusiast"], weaknesses: ["Lack of direct React experience"], recommendation: "Fast learner, hire for logical strength." }}
];

// ✅ Progress Bar Component
function ScoreProgressBar({ score }: { score: number }) {
  const getColor = () => {
    if (score >= 85) return "bg-emerald-500";
    if (score >= 65) return "bg-amber-400";
    return "bg-red-400";
  };

  const getBadgeStyle = () => {
    if (score >= 85) return "text-emerald-600 bg-emerald-50 border-emerald-100";
    if (score >= 65) return "text-amber-600 bg-amber-50 border-amber-100";
    return "text-red-600 bg-red-50 border-red-100";
  };

  return (
    <div className="flex items-center gap-3 w-full max-w-[200px]">
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${getColor()}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`px-2.5 py-1 rounded-full border text-xs font-black whitespace-nowrap ${getBadgeStyle()}`}>
        {score}%
      </span>
    </div>
  );
}

export default function CandidateListPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Protected Route - Company only
  useEffect(() => {
    if (!authLoading && (!user || user.role !== "company")) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const openFeedback = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const getScoreStyle = (score: number) => {
    if (score >= 85) return "text-emerald-600 bg-emerald-50 border-emerald-100";
    if (score >= 65) return "text-amber-600 bg-amber-50 border-amber-100";
    return "text-red-600 bg-red-50 border-red-100";
  };

  if (authLoading) return (
    <div className="p-10 text-center text-slate-500 font-medium">
      Loading SmartHire AI...
    </div>
  );

  return (
    <div className="p-10 max-w-6xl mx-auto bg-white min-h-screen">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Candidate Ranking</h1>
          <p className="text-slate-500 text-sm mt-1">
            AI-driven analysis for {MOCK_CANDIDATES.length} applicants.
          </p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold border border-blue-100">
          AI Match Scores
        </div>
      </header>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 font-bold text-slate-700">Candidate</th>
              <th className="px-6 py-4 font-bold text-slate-700">AI Match Score</th>
              <th className="px-6 py-4 font-bold text-slate-700 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_CANDIDATES.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/80 transition-all group">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {c.name}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{c.role}</div>
                </td>
                <td className="px-6 py-4">
                  <ScoreProgressBar score={c.score} />
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => openFeedback(c)}
                    className="text-blue-600 hover:text-blue-800 font-bold tracking-wide transition-all"
                  >
                    View Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ AI Feedback Modal - Compact */}
      {isModalOpen && selectedCandidate && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

            {/* Modal Header */}
            <div className="px-6 py-4 flex justify-between items-center border-b border-slate-100 bg-slate-50/50">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">AI Feedback</h3>
                <p className="text-xs text-blue-600 font-bold uppercase mt-0.5">{selectedCandidate.name}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-900 transition-colors p-1.5 bg-white rounded-full shadow-sm"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 space-y-4">

              {/* Score Row */}
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center border-2 flex-shrink-0 ${getScoreStyle(selectedCandidate.score)}`}>
                  <span className="text-lg font-black">{selectedCandidate.score}%</span>
                  <span className="text-[7px] uppercase font-bold opacity-70">Score</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800 mb-1.5">Overall Match</h4>
                  <ScoreProgressBar score={selectedCandidate.score} />
                  <p className="text-xs text-slate-400 italic mt-1">
                    {selectedCandidate.score > 80 ? "Excellent" : "Moderate"} alignment with job requirements.
                  </p>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  <h5 className="text-emerald-700 font-black text-[9px] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Strengths
                  </h5>
                  <ul className="space-y-1.5">
                    {selectedCandidate.feedback.strengths.map((s, i) => (
                      <li key={i} className="text-xs text-slate-600 font-medium leading-relaxed">• {s}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                  <h5 className="text-red-700 font-black text-[9px] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Weaknesses
                  </h5>
                  <ul className="space-y-1.5">
                    {selectedCandidate.feedback.weaknesses.map((w, i) => (
                      <li key={i} className="text-xs text-slate-600 font-medium leading-relaxed">• {w}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="bg-blue-600 px-5 py-4 rounded-2xl shadow-lg shadow-blue-100">
                <h5 className="text-blue-100 font-bold text-[9px] uppercase tracking-widest mb-1">
                  AI Recommendation
                </h5>
                <p className="text-white text-xs font-medium leading-relaxed">
                  "{selectedCandidate.feedback.recommendation}"
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-white text-slate-900 border border-slate-200 px-6 py-2 rounded-xl font-bold text-sm hover:bg-slate-900 hover:text-white transition-all duration-300"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
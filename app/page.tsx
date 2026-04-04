import { MOCK_JOBS } from "../constants/jobs";
import JobCard from "../components/layout/features/jobs/JobCard";

export default function JobFeedPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recommended for you</h1>
          <p className="text-gray-500 text-sm">Based on your profile and skills</p>
        </div>
        <button className="text-blue-600 text-sm font-semibold hover:underline">Filters</button>
      </header>

      <div className="grid gap-4">
        {MOCK_JOBS.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      
      {MOCK_JOBS.length === 0 && (
        <div className="text-center py-20 bg-white border rounded-xl">
          <p className="text-gray-400">No jobs found at the moment.</p>
        </div>
      )}
    </div>
  );
}
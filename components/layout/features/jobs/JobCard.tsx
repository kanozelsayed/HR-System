import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          {/* Logo Placeholder */}
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl">
            {job.company.charAt(0)}
          </div>
          
          <div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-600 text-sm">{job.company}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                {job.location}
              </span>
              <span className="text-xs font-medium px-2 py-1 bg-green-50 text-green-700 rounded-md">
                {job.type}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="font-bold text-gray-900">{job.salary}</p>
          <p className="text-xs text-gray-400 mt-1">{job.postedAt}</p>
        </div>
      </div>
      
      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
          Apply Now
        </button>
        <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <span className="text-gray-400">Save</span>
        </button>
      </div>
    </div>
  );
}
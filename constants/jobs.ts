import { Job } from "@/types/job";

export const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Frontend Developer (React)",
    company: "SmartHire AI",
    location: "Remote",
    type: "Full-time",
    salary: "$2000 - $3000",
    postedAt: "1 day ago"
  },
  {
    id: "2",
    title: "AI Engineer",
    company: "Tech Solutions",
    location: "Cairo, Egypt",
    type: "part time",
    salary: "$3000 - $7000",
    postedAt: "3 hours ago"
  },
   {
   id: "3",
  title: "Data Scientist (AI & ML)",
  company: "FutureMind",
  salary: "$4000 - $6000",
  location: "New York, USA (Remote)",
  type: "Full-time",
  postedAt: "2 hours ago",
  description: "Looking for an expert to build and deploy machine learning models for CV screening automation."
},
];
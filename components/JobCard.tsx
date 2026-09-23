import Link from "next/link";
import { Job, WorkplaceType, EmploymentType } from "@/lib/prisma";
import { Building2, MapPin, DollarSign, Clock, Briefcase } from "lucide-react";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    workplaceType: WorkplaceType;
    employmentType: EmploymentType;
    salaryMin: number | null;
    salaryMax: number | null;
    currency: string;
    skills?: string | null;
    createdAt: Date;
    _count?: {
      applications: number;
    };
  };
  isManager?: boolean;
}

export function JobCard({ job, isManager }: JobCardProps) {
  const formatEmploymentType = (type: EmploymentType) => {
    switch (type) {
      case "FULL_TIME":
        return "Full-time";
      case "PART_TIME":
        return "Part-time";
      case "CONTRACT":
        return "Contract";
      case "INTERNSHIP":
        return "Internship";
      default:
        return type;
    }
  };

  const formatWorkplaceType = (type: WorkplaceType) => {
    switch (type) {
      case "REMOTE":
        return "Remote";
      case "HYBRID":
        return "Hybrid";
      case "ON_SITE":
        return "On-site";
      default:
        return type;
    }
  };

  const formatSalary = (
    min: number | null,
    max: number | null,
    currency: string
  ) => {
    if (!min && !max) return null;
    const formatNumber = (num: number) =>
      num >= 1000 ? `$${(num / 1000).toFixed(0)}k` : `$${num}`;

    if (min && max) return `${formatNumber(min)} - ${formatNumber(max)} / yr`;
    if (min) return `From ${formatNumber(min)} / yr`;
    return `Up to ${formatNumber(max!)} / yr`;
  };

  const salaryDisplay = formatSalary(
    job.salaryMin,
    job.salaryMax,
    job.currency
  );
  const skillsList = job.skills
    ? job.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-blue-500/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 font-bold text-lg">
              {job.company.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400 transition-colors">
                <Link href={`/jobs/${job.id}`}>
                  <span className="absolute inset-0" />
                  {job.title}
                </Link>
              </h3>
              <p className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                <Building2 className="h-4 w-4" />
                {job.company}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/50">
              {formatWorkplaceType(job.workplaceType)}
            </span>
            <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {formatEmploymentType(job.employmentType)}
            </span>
          </div>
        </div>

        {/* Details row */}
        <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {job.location}
          </span>
          {salaryDisplay && (
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <DollarSign className="h-3.5 w-3.5" />
              {salaryDisplay}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {new Date(job.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Skills Tags */}
        {skillsList.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {skillsList.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {skill}
              </span>
            ))}
            {skillsList.length > 4 && (
              <span className="text-xs text-zinc-400 self-center">
                +{skillsList.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {isManager && job._count && (
        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
          <span>{job._count.applications} Applicants</span>
          <span className="text-blue-600 dark:text-blue-400 font-medium">
            Manage &rarr;
          </span>
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import { prisma, WorkplaceType, EmploymentType } from "@/lib/prisma";
import { JobCard } from "@/components/JobCard";
import { Search, MapPin, Filter, Briefcase, RefreshCcw } from "lucide-react";

export const dynamic = "force-dynamic";

interface JobsPageProps {
  searchParams: Promise<{
    q?: string;
    location?: string;
    workplace?: string;
    type?: string;
  }>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const q = params.q?.trim() || "";
  const location = params.location?.trim() || "";
  const workplace = params.workplace as WorkplaceType | undefined;
  const type = params.type as EmploymentType | undefined;

  const whereClause: any = {
    status: "ACTIVE",
  };

  if (q) {
    whereClause.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { company: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
      { skills: { contains: q, mode: "insensitive" } },
    ];
  }

  if (location) {
    whereClause.location = { contains: location, mode: "insensitive" };
  }

  if (workplace) {
    whereClause.workplaceType = workplace;
  }

  if (type) {
    whereClause.employmentType = type;
  }

  let jobs: any[] = [];
  try {
    jobs = await prisma.job.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Explore Open Opportunities
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Discover verified roles from top tech companies and innovative
          startups
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-8 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <form
          method="GET"
          action="/jobs"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {/* Keyword Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Title, skills, or company"
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              name="location"
              defaultValue={location}
              placeholder="City, country, or Remote"
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          {/* Workplace Type */}
          <div>
            <select
              name="workplace"
              defaultValue={workplace || ""}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 px-3 text-sm text-zinc-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            >
              <option value="">All Workplace Types</option>
              <option value="REMOTE">Remote</option>
              <option value="HYBRID">Hybrid</option>
              <option value="ON_SITE">On-site</option>
            </select>
          </div>

          {/* Submit */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>
            {(q || location || workplace || type) && (
              <Link
                href="/jobs"
                className="flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                title="Reset filters"
              >
                <RefreshCcw className="h-4 w-4" />
              </Link>
            )}
          </div>
        </form>
      </div>

      {/* Results Header */}
      <div className="mb-4 flex items-center justify-between text-sm text-zinc-500">
        <span>
          Showing {jobs.length} position{jobs.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Job Grid */}
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-12 text-center bg-white/50 dark:bg-zinc-900/50">
          <Briefcase className="mx-auto h-12 w-12 text-zinc-400" />
          <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">
            No matching jobs found
          </h3>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Try adjusting your search filters or check back later for new
            openings.
          </p>
          <div className="mt-6">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700"
            >
              Clear all filters
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

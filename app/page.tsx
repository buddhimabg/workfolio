import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { JobCard } from "@/components/JobCard";
import {
  Search,
  Briefcase,
  Sparkles,
  Building2,
  Users,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let recentJobs: any[] = [];
  try {
    recentJobs = await prisma.job.findMany({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  } catch (err) {
    console.warn(
      "Could not fetch recent jobs (database may not be connected yet):",
      err
    );
  }

  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-transparent dark:from-blue-950/20 dark:via-zinc-950 dark:to-transparent pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300 mb-6 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            The Next-Gen Career & Hiring Platform
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl dark:text-white max-w-4xl mx-auto leading-tight">
            Discover your next role, or hire{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              world-class talent
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Workfolio connects ambitious job seekers with leading companies.
            Streamlined applications, transparent salaries, and direct hiring
            manager access.
          </p>

          {/* Quick Search Form */}
          <div className="mt-10 max-w-2xl mx-auto">
            <form
              action="/jobs"
              method="GET"
              className="flex flex-col sm:flex-row items-center gap-2 rounded-2xl border border-zinc-300 bg-white p-2 shadow-xl shadow-blue-500/5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <input
                  type="text"
                  name="q"
                  placeholder="Job title, keywords, or company..."
                  className="w-full rounded-xl bg-transparent py-3 pl-11 pr-4 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition-colors"
              >
                Search Roles
              </button>
            </form>

            {/* Popular Searches */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-500">
              <span>Popular:</span>
              <Link
                href="/jobs?q=Frontend"
                className="rounded-full bg-zinc-100 px-3 py-1 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors"
              >
                Frontend Engineer
              </Link>
              <Link
                href="/jobs?q=Full+Stack"
                className="rounded-full bg-zinc-100 px-3 py-1 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors"
              >
                Full Stack
              </Link>
              <Link
                href="/jobs?workplace=REMOTE"
                className="rounded-full bg-zinc-100 px-3 py-1 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors"
              >
                Remote
              </Link>
              <Link
                href="/jobs?q=Design"
                className="rounded-full bg-zinc-100 px-3 py-1 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors"
              >
                Product Designer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Featured Opportunities
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Top roles open right now across modern startups and tech companies
            </p>
          </div>
          <Link
            href="/jobs"
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors"
          >
            View all jobs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {recentJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-12 text-center bg-white/50 dark:bg-zinc-900/50">
            <Briefcase className="mx-auto h-12 w-12 text-zinc-400" />
            <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">
              No job postings yet
            </h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              Be the first to list an open opportunity on Workfolio and reach
              eager candidates.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                href="/dashboard/jobs/new"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                Post the First Job
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Hiring CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-900 dark:bg-zinc-900/90 text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-zinc-800">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-lg bg-blue-500/20 text-blue-400 px-3 py-1 text-xs font-semibold mb-4">
              <Building2 className="h-4 w-4" />
              For Employers & Hiring Teams
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl tracking-tight">
              Ready to hire top engineering & design talent?
            </h2>
            <p className="mt-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
              Publish your roles to a fast-growing community of active job
              seekers. Filter candidates, review resumes, and manage interview
              pipelines all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/dashboard/jobs/new"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-500 transition-colors"
              >
                Post an Open Position
              </Link>
              <Link
                href="/register"
                className="rounded-xl border border-zinc-700 bg-zinc-800 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors"
              >
                Create Employer Account
              </Link>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 top-0 hidden lg:flex items-center pr-16 opacity-10 pointer-events-none">
            <Users className="h-80 w-80 text-white" />
          </div>
        </div>
      </section>
    </div>
  );
}

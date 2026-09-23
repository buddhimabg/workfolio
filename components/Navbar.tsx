import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logoutUser } from "@/app/actions/auth";
import { JoblyLogo } from "@/components/CompanyLogos";
import { Bell, ChevronDown, LogOut, Plus } from "lucide-react";

export async function Navbar() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <JoblyLogo className="h-8 w-8" />
          <span className="font-bold text-2xl tracking-tight text-zinc-900 dark:text-white">
            Jobly
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/jobs"
            className="text-sm font-semibold text-zinc-700 hover:text-[#5438DC] dark:text-zinc-300 dark:hover:text-[#8B5CF6] transition-colors"
          >
            Find Jobs
          </Link>
          <Link
            href="/companies"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            Companies
          </Link>
          <Link
            href="/resources"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            Career Resources
          </Link>
          <Link
            href="/salary-insights"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            Salary Insights
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/jobs/new"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-[#5438DC] hover:bg-[#472ec4] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all active:scale-[0.98]"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            Post a Job
          </Link>

          {/* Notification Bell */}
          <div className="relative">
            <button
              type="button"
              className="p-2 rounded-xl text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white">
                1
              </span>
            </button>
          </div>

          {/* User Profile Pill */}
          {session ? (
            <div className="flex items-center gap-3 pl-2 border-l border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-amber-400 to-indigo-600 p-[2px]">
                  <div className="h-full w-full rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center font-bold text-xs text-[#5438DC] overflow-hidden">
                    {session.name.slice(0, 2).toUpperCase()}
                  </div>
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white leading-tight">
                    Hi, {session.name.split(" ")[0]}
                  </span>
                  <span className="text-[10px] text-zinc-500 capitalize">
                    {session.role === "HIRING_MANAGER"
                      ? "Hiring Manager"
                      : "Job Seeker"}
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
              </div>

              <form action={logoutUser}>
                <button
                  type="submit"
                  title="Sign Out"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              {/* Default Mock Alex display when browsing before sign-in, with quick Sign In action */}
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-xl hover:bg-zinc-50 p-1.5 transition-colors"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 p-[2px]">
                  <div className="h-full w-full rounded-full bg-zinc-100 flex items-center justify-center font-bold text-xs text-[#5438DC]">
                    AM
                  </div>
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white leading-tight">
                    Hi, Alex
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    Hiring Manager
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

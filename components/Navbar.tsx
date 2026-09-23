import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logoutUser } from "@/app/actions/auth";
import { Briefcase, User, PlusCircle, FileText, LogOut } from "lucide-react";

export async function Navbar() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
            <Briefcase className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">
              Work<span className="text-blue-600">folio</span>
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/jobs"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            Explore Jobs
          </Link>
          {session?.role === "HIRING_MANAGER" && (
            <Link
              href="/dashboard/jobs"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              Manage Postings
            </Link>
          )}
          {session?.role === "JOB_SEEKER" && (
            <Link
              href="/dashboard/my-applications"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
            >
              My Applications
            </Link>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              {session.role === "HIRING_MANAGER" ? (
                <Link
                  href="/dashboard/jobs/new"
                  className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-all"
                >
                  <PlusCircle className="h-4 w-4" />
                  Post a Job
                </Link>
              ) : (
                <Link
                  href="/dashboard/my-applications"
                  className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
                >
                  <FileText className="h-4 w-4" />
                  My Applications
                </Link>
              )}

              <div className="flex items-center gap-2 border-l border-zinc-200 dark:border-zinc-800 pl-3">
                <div className="text-right hidden md:block">
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {session.name}
                  </p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    {session.role === "HIRING_MANAGER"
                      ? "Manager"
                      : "Job Seeker"}
                  </p>
                </div>
                <form action={logoutUser}>
                  <button
                    type="submit"
                    title="Sign Out"
                    className="p-2 rounded-lg text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

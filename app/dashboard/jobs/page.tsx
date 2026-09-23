import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma, JobStatus } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { toggleJobStatus, deleteJob } from "@/app/actions/jobs";
import {
  Briefcase,
  PlusCircle,
  Users,
  Eye,
  Trash2,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ManagerJobsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "HIRING_MANAGER" && session.role !== "ADMIN") {
    redirect("/jobs");
  }

  let jobs: any[] = [];
  try {
    jobs = await prisma.job.findMany({
      where: { postedById: session.id },
      include: {
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error loading manager jobs:", error);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Job Management Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Manage your open listings, review inbound candidates, and track
            hiring progress.
          </p>
        </div>

        <Link
          href="/dashboard/jobs/new"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          Create New Job Post
        </Link>
      </div>

      {/* Jobs List */}
      {jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 font-bold text-lg">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                      {job.title}
                    </h2>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        job.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200"
                          : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      }`}
                    >
                      {job.status === "ACTIVE" ? "Active" : "Closed"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {job.company} • {job.location} • Posted{" "}
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* Applicants Counter and link */}
                <Link
                  href={`/dashboard/jobs/${job.id}/applicants`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/50 px-3.5 py-2 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  <Users className="h-4 w-4" />
                  {job._count.applications} Candidate
                  {job._count.applications === 1 ? "" : "s"}
                </Link>

                {/* View Public Listing */}
                <Link
                  href={`/jobs/${job.id}`}
                  className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  title="View live listing"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>

                {/* Toggle status form */}
                <form
                  action={async () => {
                    "use server";
                    await toggleJobStatus(job.id, job.status);
                  }}
                >
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    title={
                      job.status === "ACTIVE"
                        ? "Close position"
                        : "Re-open position"
                    }
                  >
                    {job.status === "ACTIVE" ? (
                      <>
                        <ToggleRight className="h-4 w-4 text-emerald-600" />
                        <span>Active</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="h-4 w-4 text-zinc-400" />
                        <span>Closed</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Delete form */}
                <form
                  action={async () => {
                    "use server";
                    await deleteJob(job.id);
                  }}
                >
                  <button
                    type="submit"
                    className="p-2 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Delete job post"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-12 text-center bg-white/50 dark:bg-zinc-900/50">
          <Briefcase className="mx-auto h-12 w-12 text-zinc-400" />
          <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">
            No job listings yet
          </h3>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Publish your first job post to start accepting applications from
            talent around the world.
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard/jobs/new"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              <PlusCircle className="h-4 w-4" />
              Post Your First Job
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

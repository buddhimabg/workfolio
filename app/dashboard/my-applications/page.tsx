import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma, ApplicationStatus } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  ExternalLink,
  FileText,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MyApplicationsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  let applications: any[] = [];
  try {
    applications = await prisma.application.findMany({
      where: { applicantId: session.id },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            company: true,
            location: true,
            workplaceType: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error loading user applications:", error);
  }

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "SUBMITTED":
        return {
          label: "Submitted",
          classes:
            "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300",
        };
      case "UNDER_REVIEW":
        return {
          label: "Under Review",
          classes:
            "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300",
        };
      case "INTERVIEWING":
        return {
          label: "Interviewing",
          classes:
            "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300",
        };
      case "OFFERED":
        return {
          label: "Offer Extended",
          classes:
            "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300",
        };
      case "REJECTED":
        return {
          label: "Not Selected",
          classes:
            "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400",
        };
      default:
        return {
          label: status,
          classes:
            "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
        };
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          My Applications
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Track the status of all your submitted job applications
        </p>
      </div>

      {/* Applications List */}
      {applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((app) => {
            const badge = getStatusBadge(app.status);
            return (
              <div
                key={app.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 font-bold text-lg">
                    {app.job.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                      <Link
                        href={`/jobs/${app.job.id}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {app.job.title}
                      </Link>
                    </h2>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5" />
                        {app.job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {app.job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        Submitted {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badge.classes}`}
                  >
                    {badge.label}
                  </span>

                  <Link
                    href={`/jobs/${app.job.id}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    View Job
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-12 text-center bg-white/50 dark:bg-zinc-900/50">
          <FileText className="mx-auto h-12 w-12 text-zinc-400" />
          <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">
            You haven&apos;t applied to any jobs yet
          </h3>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
            Explore open opportunities across startups and tech leaders and
            submit your first application.
          </p>
          <div className="mt-6">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              <Briefcase className="h-4 w-4" />
              Browse Open Jobs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

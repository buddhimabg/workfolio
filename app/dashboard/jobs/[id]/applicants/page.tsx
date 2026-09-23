import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { ApplicantStatusSelect } from "@/components/ApplicantStatusSelect";
import {
  ChevronLeft,
  Users,
  ExternalLink,
  Mail,
  Phone,
  FileText,
  Globe,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface ApplicantsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ApplicantsPage({ params }: ApplicantsPageProps) {
  const { id } = await params;
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  let job: any = null;
  try {
    job = await prisma.job.findUnique({
      where: { id },
      include: {
        applications: {
          include: {
            applicant: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });
  } catch (error) {
    console.error("Error loading applicants:", error);
  }

  if (!job) {
    notFound();
  }

  if (job.postedById !== session.id && session.role !== "ADMIN") {
    redirect("/dashboard/jobs");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/jobs"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white mb-3"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to my job postings
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Applicants for &ldquo;{job.title}&rdquo;
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {job.company} • {job.location} • {job.applications.length} total
              applicant
              {job.applications.length === 1 ? "" : "s"}
            </p>
          </div>
          <Link
            href={`/jobs/${job.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            View live job listing
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Applicants List */}
      {job.applications.length > 0 ? (
        <div className="space-y-4">
          {job.applications.map((app: any) => (
            <div
              key={app.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                      {app.applicant.name}
                    </h2>
                    <span className="flex items-center gap-1 text-xs text-zinc-400">
                      <Clock className="h-3.5 w-3.5" />
                      Applied {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      {app.applicant.email}
                    </span>
                    {app.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        {app.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">Status:</span>
                  <ApplicantStatusSelect
                    applicationId={app.id}
                    jobId={job.id}
                    currentStatus={app.status}
                  />
                </div>
              </div>

              {/* Links and Cover Note */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Resume and Portfolio */}
                <div className="flex flex-wrap gap-3">
                  {app.resumeUrl && (
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50/50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300 transition-colors"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      View Resume / CV
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {app.portfolioUrl && (
                    <a
                      href={app.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 transition-colors"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      Portfolio / Website
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                {/* Cover Note */}
                {app.coverLetter && (
                  <div className="md:col-span-2 rounded-xl bg-zinc-50 p-4 text-xs leading-relaxed text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300">
                    <p className="font-semibold text-zinc-900 dark:text-white mb-1">
                      Applicant Note:
                    </p>
                    <p className="whitespace-pre-line">{app.coverLetter}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-12 text-center bg-white/50 dark:bg-zinc-900/50">
          <Users className="mx-auto h-12 w-12 text-zinc-400" />
          <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-white">
            No applicants yet
          </h3>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
            Candidates who apply to this role will appear here with their
            resumes and contact details.
          </p>
        </div>
      )}
    </div>
  );
}

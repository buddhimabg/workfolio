import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma, WorkplaceType, EmploymentType } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { JobApplicationForm } from "@/components/JobApplicationForm";
import {
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Users,
  ChevronLeft,
  Settings,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface JobDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const session = await getSession();

  let job: any = null;
  let hasApplied = false;

  try {
    job = await prisma.job.findUnique({
      where: { id },
      include: {
        postedBy: {
          select: {
            id: true,
            name: true,
            email: true,
            companyName: true,
            companyWebsite: true,
          },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });

    if (session && job) {
      const existingApplication = await prisma.application.findUnique({
        where: {
          jobId_applicantId: {
            jobId: id,
            applicantId: session.id,
          },
        },
      });
      hasApplied = !!existingApplication;
    }
  } catch (error) {
    console.error("Error loading job:", error);
  }

  if (!job) {
    notFound();
  }

  const isOwner = session?.id === job.postedById;

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
        .map((s: string) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to all jobs
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Job Information (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 font-bold text-2xl shadow-sm">
                  {job.company.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {job.title}
                  </h1>
                  <p className="flex items-center gap-1.5 text-base text-zinc-600 dark:text-zinc-400 mt-1">
                    <Building2 className="h-4 w-4" />
                    {job.company}
                  </p>
                </div>
              </div>

              {isOwner && (
                <Link
                  href={`/dashboard/jobs/${job.id}/applicants`}
                  className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  <Settings className="h-4 w-4" />
                  Manage Applicants ({job._count.applications})
                </Link>
              )}
            </div>

            {/* Badges and metadata */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200/50">
                <Briefcase className="h-3.5 w-3.5" />
                {formatWorkplaceType(job.workplaceType)}
              </span>
              <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {formatEmploymentType(job.employmentType)}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                <MapPin className="h-3.5 w-3.5" />
                {job.location}
              </span>
              {salaryDisplay && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <DollarSign className="h-3.5 w-3.5" />
                  {salaryDisplay}
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                <Clock className="h-3.5 w-3.5" />
                Posted {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Skills */}
            {skillsList.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Relevant Skills & Technologies
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skillsList.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Job Description */}
            <div className="mt-8 border-t border-zinc-100 dark:border-zinc-800 pt-6">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                About the Role
              </h2>
              <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {job.description}
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && (
              <div className="mt-8 border-t border-zinc-100 dark:border-zinc-800 pt-6">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Key Qualifications & Requirements
                </h2>
                <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {job.requirements}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar / Application Section (1 col) */}
        <div className="space-y-6">
          <JobApplicationForm
            jobId={job.id}
            isLoggedIn={!!session}
            hasApplied={hasApplied}
          />

          {/* Company Card */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
              About the Employer
            </h3>
            <p className="mt-3 font-semibold text-zinc-900 dark:text-white">
              {job.company}
            </p>
            {job.postedBy?.companyWebsite && (
              <a
                href={job.postedBy.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-xs text-blue-600 hover:underline dark:text-blue-400"
              >
                Visit company website &rarr;
              </a>
            )}
            <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
              <Users className="h-4 w-4" />
              <span>Hiring Manager: {job.postedBy?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

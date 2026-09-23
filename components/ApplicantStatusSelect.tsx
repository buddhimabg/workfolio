"use client";

import { useTransition } from "react";
import { updateApplicationStatus } from "@/app/actions/jobs";
import { ApplicationStatus } from "@/lib/prisma";

interface ApplicantStatusSelectProps {
  applicationId: string;
  jobId: string;
  currentStatus: ApplicationStatus;
}

export function ApplicantStatusSelect({
  applicationId,
  jobId,
  currentStatus,
}: ApplicantStatusSelectProps) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    startTransition(async () => {
      await updateApplicationStatus(applicationId, newStatus, jobId);
    });
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "SUBMITTED":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300";
      case "UNDER_REVIEW":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300";
      case "INTERVIEWING":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300";
      case "OFFERED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300";
      case "REJECTED":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300";
      default:
        return "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300";
    }
  };

  return (
    <div className="relative inline-block">
      <select
        defaultValue={currentStatus}
        disabled={isPending}
        onChange={(e) =>
          handleStatusChange(e.target.value as ApplicationStatus)
        }
        className={`rounded-lg border px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60 transition-all ${getStatusColor(
          currentStatus
        )}`}
      >
        <option value="SUBMITTED">Submitted</option>
        <option value="UNDER_REVIEW">Under Review</option>
        <option value="INTERVIEWING">Interviewing</option>
        <option value="OFFERED">Offer Extended</option>
        <option value="REJECTED">Rejected</option>
      </select>
    </div>
  );
}

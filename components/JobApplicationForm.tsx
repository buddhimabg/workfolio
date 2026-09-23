"use client";

import { useActionState } from "react";
import { applyForJob, ActionResponse } from "@/app/actions/jobs";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Globe,
  Phone,
} from "lucide-react";
import Link from "next/link";

interface JobApplicationFormProps {
  jobId: string;
  isLoggedIn: boolean;
  hasApplied: boolean;
}

export function JobApplicationForm({
  jobId,
  isLoggedIn,
  hasApplied,
}: JobApplicationFormProps) {
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(applyForJob, {});

  if (hasApplied || state?.success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 text-center dark:border-emerald-900/50 dark:bg-emerald-950/20">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600 dark:text-emerald-400" />
        <h3 className="mt-3 text-lg font-bold text-emerald-900 dark:text-emerald-100">
          Application Submitted!
        </h3>
        <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
          The hiring team has received your profile and will review your
          submission.
        </p>
        <div className="mt-5">
          <Link
            href="/dashboard/my-applications"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
          >
            Track in My Applications
          </Link>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
        <FileText className="mx-auto h-10 w-10 text-zinc-400" />
        <h3 className="mt-3 text-base font-semibold text-zinc-900 dark:text-white">
          Ready to apply for this role?
        </h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
          Create an account or sign in to submit your resume and connect with
          the hiring manager.
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <Link
            href="/login"
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Register to Apply
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
        Apply for this Position
      </h3>
      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
        Submit your details directly to the hiring manager.
      </p>

      {state?.error && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-900">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p>{state.error}</p>
        </div>
      )}

      <form action={formAction} className="mt-5 space-y-4">
        <input type="hidden" name="jobId" value={jobId} />

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Resume / CV Link (Google Drive, Dropbox, LinkedIn, PDF URL) *
          </label>
          <div className="relative mt-1">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="url"
              name="resumeUrl"
              required
              placeholder="https://drive.google.com/your-resume.pdf"
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Portfolio / GitHub / Personal Website (Optional)
          </label>
          <div className="relative mt-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="url"
              name="portfolioUrl"
              placeholder="https://github.com/yourhandle or portfolio link"
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Phone Number (Optional)
          </label>
          <div className="relative mt-1">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="tel"
              name="phone"
              placeholder="+1 (555) 000-0000"
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Brief Note / Cover Letter
          </label>
          <textarea
            name="coverLetter"
            rows={3}
            placeholder="Tell the team why you're a great fit for this position..."
            className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 p-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 px-4 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 disabled:opacity-60 transition-colors"
        >
          {isPending ? "Submitting application..." : "Submit Application"}
          {!isPending && <Send className="h-4 w-4" />}
        </button>
      </form>
    </div>
  );
}

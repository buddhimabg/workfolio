"use client";

import { useActionState } from "react";
import { createJob, ActionResponse } from "@/app/actions/jobs";
import Link from "next/link";
import {
  Briefcase,
  ArrowLeft,
  PlusCircle,
  AlertCircle,
  Building2,
} from "lucide-react";

export default function NewJobPage() {
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(createJob, {});

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/jobs"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to my job postings
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Create a New Job Listing
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Reach thousands of qualified developers, designers, and tech
          professionals.
        </p>
      </div>

      {state?.error && (
        <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-900">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{state.error}</p>
        </div>
      )}

      {/* Form */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Job Title */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Senior Frontend Engineer, Product Designer"
                className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 px-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Company Name *
              </label>
              <div className="relative mt-1">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  name="company"
                  required
                  placeholder="e.g. Acme Corp"
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 pl-9 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Location *
              </label>
              <input
                type="text"
                name="location"
                required
                placeholder="e.g. Remote, San Francisco, CA, London, UK"
                className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 px-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>

            {/* Workplace Type */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Workplace Setting *
              </label>
              <select
                name="workplaceType"
                defaultValue="REMOTE"
                className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 px-3 text-sm text-zinc-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              >
                <option value="REMOTE">Remote (Work anywhere)</option>
                <option value="HYBRID">Hybrid</option>
                <option value="ON_SITE">On-site</option>
              </select>
            </div>

            {/* Employment Type */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Employment Type *
              </label>
              <select
                name="employmentType"
                defaultValue="FULL_TIME"
                className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 px-3 text-sm text-zinc-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              >
                <option value="FULL_TIME">Full-time</option>
                <option value="PART_TIME">Part-time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>

            {/* Salary Min */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Minimum Annual Salary (USD)
              </label>
              <input
                type="number"
                name="salaryMin"
                placeholder="e.g. 90000"
                step="5000"
                className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 px-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>

            {/* Salary Max */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Maximum Annual Salary (USD)
              </label>
              <input
                type="number"
                name="salaryMax"
                placeholder="e.g. 130000"
                step="5000"
                className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 px-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>

            {/* Skills */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Required Skills & Technologies (Comma-separated)
              </label>
              <input
                type="text"
                name="skills"
                placeholder="e.g. React, Next.js, TypeScript, Tailwind CSS, PostgreSQL"
                className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 px-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Job Description *
              </label>
              <textarea
                name="description"
                rows={6}
                required
                placeholder="Describe the company, the mission, and what the candidate will be doing day-to-day..."
                className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>

            {/* Requirements */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Key Qualifications & Responsibilities
              </label>
              <textarea
                name="requirements"
                rows={4}
                placeholder="• 3+ years of experience with React / Next.js&#10;• Experience with relational databases like PostgreSQL&#10;• Strong communication skills"
                className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <Link
              href="/dashboard/jobs"
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 disabled:opacity-60 transition-colors"
            >
              {isPending ? "Publishing job..." : "Publish Job Listing"}
              {!isPending && <PlusCircle className="h-4 w-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

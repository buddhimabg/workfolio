"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { registerUser, AuthState } from "@/app/actions/auth";
import {
  Briefcase,
  UserCheck,
  Building2,
  ArrowRight,
  Lock,
  Mail,
  User,
  AlertCircle,
} from "lucide-react";

export default function RegisterPage() {
  const [role, setRole] = useState<"JOB_SEEKER" | "HIRING_MANAGER">(
    "JOB_SEEKER"
  );
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    registerUser,
    {}
  );

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Briefcase className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Create your Workfolio account
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Join as a job seeker looking for opportunities, or as a hiring
            manager looking for top talent
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-2 gap-3 rounded-xl bg-zinc-100 p-1.5 dark:bg-zinc-800">
          <button
            type="button"
            onClick={() => setRole("JOB_SEEKER")}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all ${
              role === "JOB_SEEKER"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-white"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <UserCheck className="h-4 w-4" />
            Job Seeker
          </button>
          <button
            type="button"
            onClick={() => setRole("HIRING_MANAGER")}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all ${
              role === "HIRING_MANAGER"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-white"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            <Building2 className="h-4 w-4" />
            Hiring Manager
          </button>
        </div>

        {state?.error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-900">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{state.error}</p>
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="role" value={role} />

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Full name
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-zinc-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder={
                  role === "HIRING_MANAGER"
                    ? "Sarah Jenkins (Recruiter)"
                    : "Jane Doe"
                }
                className="block w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Email address
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-zinc-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="block w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
              />
            </div>
          </div>

          {role === "HIRING_MANAGER" && (
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Company / Organization name
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Building2 className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  placeholder="e.g. Stripe, Linear, Vercel"
                  className="block w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
                />
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-zinc-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                placeholder="At least 6 characters"
                className="block w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60 transition-all"
          >
            {isPending
              ? "Creating account..."
              : `Sign Up as ${
                  role === "HIRING_MANAGER" ? "Manager" : "Job Seeker"
                }`}
            {!isPending && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

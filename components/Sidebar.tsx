"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DeskChairIllustration } from "@/components/Illustrations";
import {
  Home,
  Briefcase,
  Star,
  MessageSquare,
  User,
  FileText,
  LayoutDashboard,
  PlusSquare,
  FolderKanban,
  FileSpreadsheet,
  Building,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const mainLinks = [
    { label: "Home", href: "/", icon: Home },
    {
      label: "My Applications",
      href: "/dashboard/my-applications",
      icon: Briefcase,
    },
    { label: "Saved Jobs", href: "/saved-jobs", icon: Star },
    { label: "Messages", href: "/messages", icon: MessageSquare, badge: 3 },
    { label: "Profile", href: "/profile", icon: User },
    { label: "Resume Builder", href: "/resume-builder", icon: FileText },
  ];

  const companyLinks = [
    {
      label: "Company Dashboard",
      href: "/dashboard/jobs",
      icon: LayoutDashboard,
    },
    { label: "Post a Job", href: "/dashboard/jobs/new", icon: PlusSquare },
    { label: "Manage Jobs", href: "/dashboard/jobs", icon: FolderKanban },
    { label: "Applications", href: "/dashboard/jobs", icon: FileSpreadsheet },
    { label: "Company Profile", href: "/company-profile", icon: Building },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col justify-between shrink-0 p-4 border-r border-zinc-100 bg-white min-h-[calc(100vh-4rem)] dark:border-zinc-800 dark:bg-zinc-950">
      <div className="space-y-6">
        {/* Main User Navigation */}
        <div className="space-y-1">
          {mainLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#F0EDFF] text-[#5438DC] font-semibold dark:bg-[#5438DC]/20 dark:text-[#A78BFA]"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 ${
                      isActive
                        ? "text-[#5438DC] dark:text-[#A78BFA]"
                        : "text-zinc-500"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EDE9FE] text-[11px] font-bold text-[#5438DC] dark:bg-purple-950 dark:text-purple-300">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <hr className="border-zinc-100 dark:border-zinc-800" />

        {/* Company Navigation */}
        <div className="space-y-1">
          {companyLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#F0EDFF] text-[#5438DC] font-semibold dark:bg-[#5438DC]/20 dark:text-[#A78BFA]"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isActive
                      ? "text-[#5438DC] dark:text-[#A78BFA]"
                      : "text-zinc-500"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Promo Card */}
      <div className="mt-8 rounded-2xl bg-gradient-to-b from-[#F5F3FF] to-[#EDE9FE]/70 p-4 text-center border border-purple-100/80 dark:bg-zinc-900 dark:border-zinc-800">
        <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
          Hire the best talent
        </h4>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Post your job and reach thousands of qualified candidates.
        </p>

        <Link
          href="/dashboard/jobs/new"
          className="mt-3.5 inline-block w-full rounded-xl bg-[#5438DC] hover:bg-[#472ec4] py-2 px-3 text-xs font-semibold text-white shadow-sm shadow-purple-500/20 transition-colors"
        >
          Post a Job
        </Link>

        {/* Office Illustration */}
        <div className="mt-3 flex justify-center">
          <DeskChairIllustration className="w-24 h-20" />
        </div>
      </div>
    </aside>
  );
}

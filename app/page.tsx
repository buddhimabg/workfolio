import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  GoogleLogo,
  ShopifyLogo,
  MicrosoftLogo,
  StripeLogo,
  AirbnbLogo,
  DialogLogo,
  VirtusaLogo,
  NinetyNineXLogo,
  WSO2Logo,
} from "@/components/CompanyLogos";
import {
  HeroIllustration,
  ChairIllustration,
  PaperAirplaneIllustration,
  StepProfileIcon,
  StepJobIcon,
  StepHiredIcon,
} from "@/components/Illustrations";
import {
  Search,
  MapPin,
  Bookmark,
  ChevronRight,
  Code2,
  Palette,
  TrendingUp,
  BarChart3,
  Briefcase,
  Handshake,
  Headphones,
  Monitor,
  Check,
} from "lucide-react";

export const dynamic = "force-dynamic";

function getCompanyLogo(company: string) {
  const norm = company.toLowerCase();
  if (norm.includes("google")) return <GoogleLogo />;
  if (norm.includes("shopify")) return <ShopifyLogo />;
  if (norm.includes("microsoft")) return <MicrosoftLogo />;
  if (norm.includes("stripe")) return <StripeLogo />;
  if (norm.includes("airbnb")) return <AirbnbLogo />;
  if (norm.includes("dialog")) return <DialogLogo />;
  if (norm.includes("virtusa")) return <VirtusaLogo />;
  if (norm.includes("99x")) return <NinetyNineXLogo />;
  if (norm.includes("wso2")) return <WSO2Logo />;

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-100 text-[#5438DC] font-bold text-sm">
      {company.slice(0, 2).toUpperCase()}
    </div>
  );
}

function formatSalaryMonthly(min: number | null, max: number | null) {
  if (!min && !max) return "$2,500 - $4,000";
  // If stored as annual or monthly, convert nicely
  const minM = min ? (min > 10000 ? Math.round(min / 12) : min) : null;
  const maxM = max ? (max > 10000 ? Math.round(max / 12) : max) : null;

  if (minM && maxM)
    return `$${minM.toLocaleString()} - $${maxM.toLocaleString()}`;
  if (minM) return `From $${minM.toLocaleString()}`;
  return `Up to $${maxM?.toLocaleString()}`;
}

export default async function HomePage() {
  let topJobs: any[] = [];
  try {
    topJobs = await prisma.job.findMany({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch (err) {
    console.error("Failed to load jobs from database:", err);
  }

  // Fallback demo items if database had none
  const displayJobs =
    topJobs.length > 0
      ? topJobs
      : [
          {
            id: "1",
            title: "Senior Product Designer",
            company: "Google",
            location: "Colombo, Sri Lanka",
            employmentType: "FULL_TIME",
            workplaceType: "ON_SITE",
            salaryMin: 30000,
            salaryMax: 48000,
            createdAt: new Date(),
          },
          {
            id: "2",
            title: "UI/UX Designer",
            company: "Shopify",
            location: "Remote",
            employmentType: "FULL_TIME",
            workplaceType: "REMOTE",
            salaryMin: 36000,
            salaryMax: 60000,
            createdAt: new Date(),
          },
          {
            id: "3",
            title: "Frontend Developer",
            company: "Microsoft",
            location: "Colombo, Sri Lanka",
            employmentType: "FULL_TIME",
            workplaceType: "HYBRID",
            salaryMin: 24000,
            salaryMax: 42000,
            createdAt: new Date(),
          },
          {
            id: "4",
            title: "Product Marketing Manager",
            company: "Stripe",
            location: "Singapore (Remote)",
            employmentType: "FULL_TIME",
            workplaceType: "REMOTE",
            salaryMin: 48000,
            salaryMax: 78000,
            createdAt: new Date(),
          },
          {
            id: "5",
            title: "Customer Support Specialist",
            company: "Airbnb",
            location: "Colombo, Sri Lanka",
            employmentType: "PART_TIME",
            workplaceType: "ON_SITE",
            salaryMin: 9600,
            salaryMax: 14400,
            createdAt: new Date(),
          },
        ];

  const categories = [
    {
      title: "Software Development",
      count: "12,345",
      icon: Code2,
      color: "bg-[#EDE9FE] text-[#7C3AED]",
    },
    {
      title: "Design & Creative",
      count: "4,230",
      icon: Palette,
      color: "bg-[#FFE4E6] text-[#E11D48]",
    },
    {
      title: "Marketing & Growth",
      count: "6,789",
      icon: TrendingUp,
      color: "bg-[#DCFCE7] text-[#16A34A]",
    },
    {
      title: "Data & Analytics",
      count: "3,456",
      icon: BarChart3,
      color: "bg-[#E0F2FE] text-[#0284C7]",
    },
    {
      title: "Product Management",
      count: "2,345",
      icon: Briefcase,
      color: "bg-[#F3E8FF] text-[#9333EA]",
    },
    {
      title: "Sales & Business",
      count: "5,678",
      icon: Handshake,
      color: "bg-[#FFEDD5] text-[#EA580C]",
    },
    {
      title: "Customer Support",
      count: "2,100",
      icon: Headphones,
      color: "bg-[#FEF3C7] text-[#D97706]",
    },
    {
      title: "IT & Networking",
      count: "1,234",
      icon: Monitor,
      color: "bg-[#CFFAFE] text-[#0891B2]",
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* 1. HERO SECTION WITH SEARCH CARD */}
      <section className="relative rounded-3xl bg-gradient-to-r from-[#F0EDFF] via-[#F7F5FF] to-[#EDE9FE] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 mb-8">
          {/* Headline & Subtitle */}
          <div className="lg:col-span-8 space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-zinc-900 leading-[1.15]">
              Find the job <br className="hidden sm:inline" />
              that fits <span className="text-[#5438DC]">your life</span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 max-w-xl leading-relaxed">
              Discover opportunities, grow your career, and build the future you
              deserve.
            </p>
          </div>

          {/* 3D Illustration */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <HeroIllustration className="w-64 h-56 sm:w-80 sm:h-64" />
          </div>
        </div>

        {/* Floating Search Card */}
        <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-xl shadow-purple-500/5 border border-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <form
            action="/jobs"
            method="GET"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center"
          >
            {/* Input 1: Job title or keyword */}
            <div className="lg:col-span-4">
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Job title or keyword
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  name="q"
                  placeholder="e.g. UI/UX Designer"
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-[#5438DC] focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
            </div>

            {/* Input 2: Location */}
            <div className="lg:col-span-4">
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Colombo, Sri Lanka"
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-[#5438DC] focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
            </div>

            {/* Input 3: Job type */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Job type
              </label>
              <select
                name="type"
                defaultValue=""
                className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-3 text-sm text-zinc-900 focus:border-[#5438DC] focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              >
                <option value="">Any type</option>
                <option value="FULL_TIME">Full-time</option>
                <option value="PART_TIME">Part-time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full mt-5 sm:mt-0 rounded-xl bg-[#5438DC] hover:bg-[#472ec4] py-2.5 px-4 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all active:scale-[0.98]"
              >
                Search Jobs
              </button>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-zinc-500">
              Popular Searches:
            </span>
            {[
              "Designer",
              "Developer",
              "Marketing",
              "Data Analyst",
              "Product Manager",
            ].map((tag) => (
              <Link
                key={tag}
                href={`/jobs?q=${encodeURIComponent(tag)}`}
                className="rounded-full bg-zinc-100 hover:bg-zinc-200 px-3 py-1 text-zinc-700 font-medium transition-colors dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. BROWSE BY CATEGORY */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Browse by category
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Explore jobs by your field of interest
            </p>
          </div>
          <Link
            href="/jobs"
            className="text-xs font-semibold text-[#5438DC] hover:underline flex items-center gap-1"
          >
            View all categories
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.title}
                  href={`/jobs?q=${encodeURIComponent(
                    cat.title.split(" ")[0]
                  )}`}
                  className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:border-[#5438DC]/40 hover:shadow-md transition-all text-center dark:bg-zinc-900 dark:border-zinc-800"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl mb-2.5 transition-transform group-hover:scale-105 ${cat.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-zinc-900 line-clamp-2 dark:text-white leading-tight">
                    {cat.title}
                  </span>
                  <span className="text-[10px] text-zinc-400 mt-1">
                    ({cat.count})
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right Carousel Arrow Button */}
          <button
            type="button"
            className="hidden xl:flex absolute -right-3 top-1/2 -translate-y-1/2 h-8 w-8 items-center justify-center rounded-full bg-white shadow-md border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
            title="Next categories"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* 3. MAIN 2-COLUMN SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Top Job Picks For You */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Top job picks for you
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                New opportunities based on your profile and preferences
              </p>
            </div>
            <Link
              href="/jobs"
              className="text-xs font-semibold text-[#5438DC] hover:underline"
            >
              View all jobs
            </Link>
          </div>

          {/* Job List */}
          <div className="space-y-3">
            {displayJobs.map((job, idx) => {
              const workplaceLabel =
                job.workplaceType === "REMOTE"
                  ? "Remote"
                  : job.workplaceType === "HYBRID"
                  ? "Hybrid"
                  : "On-site";
              const employmentLabel =
                job.employmentType === "FULL_TIME"
                  ? "Full-time"
                  : job.employmentType === "PART_TIME"
                  ? "Part-time"
                  : "Contract";

              const times = ["2h ago", "5h ago", "1d ago", "1d ago", "2d ago"];
              const timeDisplay = times[idx % times.length];

              return (
                <div
                  key={job.id}
                  className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white p-5 border border-zinc-100 shadow-sm hover:border-[#5438DC]/40 hover:shadow-md transition-all dark:bg-zinc-900 dark:border-zinc-800"
                >
                  {/* Left info */}
                  <div className="flex items-start gap-4">
                    {getCompanyLogo(job.company)}

                    <div>
                      <h3 className="font-bold text-base text-zinc-900 group-hover:text-[#5438DC] transition-colors dark:text-white dark:group-hover:text-[#8B5CF6]">
                        <Link href={`/jobs/${job.id}`}>
                          <span className="absolute inset-0" />
                          {job.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {job.company} • {job.location}
                      </p>

                      {/* Badges */}
                      <div className="mt-2.5 flex items-center gap-2">
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">
                          {employmentLabel}
                        </span>
                        <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                          {workplaceLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right info */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-zinc-900 dark:text-white">
                        {formatSalaryMonthly(job.salaryMin, job.salaryMax)}
                      </span>
                      <button
                        type="button"
                        className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 transition-colors z-10"
                        title="Bookmark job"
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-[11px] text-zinc-400">/ month</span>
                    <span className="text-[11px] text-zinc-400 mt-1">
                      {timeDisplay}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View all jobs centered button */}
          <div className="pt-2 text-center">
            <Link
              href="/jobs"
              className="inline-block rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 px-6 py-2.5 text-xs font-semibold text-[#5438DC] shadow-sm transition-colors"
            >
              View all jobs
            </Link>
          </div>
        </div>

        {/* Right Column: Widgets */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. For Hiring Managers Card */}
          <div className="relative rounded-3xl bg-[#F4F2FF] border border-purple-100 p-6 overflow-hidden shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <div className="relative z-10 max-w-[200px]">
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white">
                For Hiring Managers
              </h3>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Find the right talent for your team and grow your business.
              </p>

              <ul className="mt-4 space-y-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                <li className="flex items-center gap-2">
                  <Check
                    className="h-3.5 w-3.5 text-[#5438DC] shrink-0"
                    strokeWidth={3}
                  />
                  <span>Post jobs in minutes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check
                    className="h-3.5 w-3.5 text-[#5438DC] shrink-0"
                    strokeWidth={3}
                  />
                  <span>Access quality candidates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check
                    className="h-3.5 w-3.5 text-[#5438DC] shrink-0"
                    strokeWidth={3}
                  />
                  <span>Powerful hiring tools</span>
                </li>
              </ul>

              <div className="mt-5">
                <Link
                  href="/dashboard/jobs/new"
                  className="inline-block rounded-xl bg-[#5438DC] hover:bg-[#472ec4] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition-colors"
                >
                  Post a Job
                </Link>
              </div>
            </div>

            {/* 3D Purple Office Chair Graphic */}
            <div className="absolute -right-2 bottom-0 pointer-events-none">
              <ChairIllustration className="w-32 h-44" />
            </div>
          </div>

          {/* 2. Featured Company Card */}
          <div className="rounded-2xl bg-white border border-zinc-100 p-5 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400">
              Featured Company
            </h4>

            <div className="flex items-center gap-4">
              <DialogLogo className="h-14 w-14 shrink-0" />
              <div>
                <h5 className="font-bold text-sm text-zinc-900 dark:text-white">
                  Dialog Axiata
                </h5>
                <p className="text-xs text-zinc-500">Colombo, Sri Lanka</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Telecommunications
                </p>
                <p className="text-[11px] text-zinc-400">1,234 Employees</p>
              </div>
            </div>

            <Link
              href="/jobs?q=Dialog"
              className="block w-full text-center rounded-xl border border-zinc-200 py-2 text-xs font-semibold text-[#5438DC] hover:bg-zinc-50 transition-colors dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              View Company
            </Link>
          </div>

          {/* 3. Recommended for you Card */}
          <div className="rounded-2xl bg-white border border-zinc-100 p-5 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
                Recommended for you
              </h4>
            </div>

            <div className="space-y-3">
              {/* Item 1 */}
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <VirtusaLogo className="h-7 w-7 shrink-0" />
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-white">
                      Data Analyst
                    </p>
                    <p className="text-[10px] text-zinc-400">
                      Virtusa • Hybrid
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-[11px]">
                  $1,800 - $2,800
                </span>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <NinetyNineXLogo className="h-7 w-7 shrink-0" />
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-white">
                      Graphics Designer
                    </p>
                    <p className="text-[10px] text-zinc-400">99x • Remote</p>
                  </div>
                </div>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-[11px]">
                  $900 - $1,500
                </span>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <WSO2Logo className="h-7 w-7 shrink-0" />
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-white">
                      DevOps Engineer
                    </p>
                    <p className="text-[10px] text-zinc-400">WSO2 • On-site</p>
                  </div>
                </div>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-[11px]">
                  $2,500 - $3,800
                </span>
              </div>
            </div>

            <div className="pt-2 text-center border-t border-zinc-100 dark:border-zinc-800">
              <Link
                href="/jobs"
                className="text-xs font-semibold text-[#5438DC] hover:underline"
              >
                View all
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THREE ONBOARDING STEP CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="flex items-center gap-4 rounded-2xl bg-[#F4F2FF] p-6 border border-purple-100/60 dark:bg-zinc-900 dark:border-zinc-800">
          <StepProfileIcon className="h-12 w-12 shrink-0" />
          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
              Create your profile
            </h4>
            <p className="mt-1 text-xs text-zinc-500 leading-relaxed dark:text-zinc-400">
              Build a professional profile and get noticed by top employers.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center gap-4 rounded-2xl bg-[#FFF5F2] p-6 border border-rose-100/60 dark:bg-zinc-900 dark:border-zinc-800">
          <StepJobIcon className="h-12 w-12 shrink-0" />
          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
              Find the perfect job
            </h4>
            <p className="mt-1 text-xs text-zinc-500 leading-relaxed dark:text-zinc-400">
              Search and apply for jobs that match your skills and goals.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-center gap-4 rounded-2xl bg-[#F0FBF7] p-6 border border-emerald-100/60 dark:bg-zinc-900 dark:border-zinc-800">
          <StepHiredIcon className="h-12 w-12 shrink-0" />
          <div>
            <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
              Get hired & grow
            </h4>
            <p className="mt-1 text-xs text-zinc-500 leading-relaxed dark:text-zinc-400">
              Step into your new role and build the career you love.
            </p>
          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER SUBSCRIPTION BANNER */}
      <section className="rounded-2xl bg-[#F4F2FF] border border-purple-100 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 dark:bg-zinc-900 dark:border-zinc-800">
        <div className="flex items-center gap-4">
          <PaperAirplaneIllustration className="h-12 w-12 shrink-0" />
          <div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white">
              Don&apos;t miss new opportunities
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Subscribe to get job alerts and career tips
            </p>
          </div>
        </div>

        {/* Subscribe Form */}
        <form
          action="/register"
          method="GET"
          className="flex w-full md:w-auto items-center gap-2 max-w-md"
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="w-full md:w-72 rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-[#5438DC] focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-[#5438DC] hover:bg-[#472ec4] px-5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-purple-500/20 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}

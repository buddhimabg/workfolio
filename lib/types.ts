/**
 * Workfolio / Jobly Design System & Domain Entity Types
 */

// -------------------------------------------------------------
// Enums & Status Literals
// -------------------------------------------------------------

export type UserRole = "JOB_SEEKER" | "HIRING_MANAGER" | "ADMIN";

export type JobStatus = "ACTIVE" | "DRAFT" | "CLOSED" | "ARCHIVED";

export type ApplicationStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "INTERVIEWING"
  | "OFFERED"
  | "REJECTED";

export type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "INTERNSHIP"
  | "FREELANCE";

export type WorkStyle = "REMOTE" | "HYBRID" | "ON_SITE";

// -------------------------------------------------------------
// Entity Interfaces
// -------------------------------------------------------------

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  role: UserRole;
  title?: string | null;
  bio?: string | null;
  skills?: string[] | string | null;
  resumeUrl?: string | null;
  companyId?: string | null;
  company?: Company | null;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string | null;
  website?: string | null;
  industry?: string | null;
  location?: string | null;
  employeeCount?: number | string | null;
  description?: string | null;
  jobs?: Job[];
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface JobCategory {
  id: string;
  title: string;
  slug: string;
  icon?: string | null;
  count: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyId?: string | null;
  companyLogo?: string | null;
  location: string;
  city?: string | null;
  country?: string | null;
  workStyle: WorkStyle;
  jobType: JobType;
  salaryMin?: number | null;
  salaryMax?: number | null;
  currency: string;
  description: string;
  requirements?: string | null;
  skills?: string[] | string | null;
  status: JobStatus;
  postedById: string;
  postedBy?: User | null;
  applications?: Application[];
  applicationsCount?: number;
  featured?: boolean;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface Application {
  id: string;
  jobId: string;
  job?: Job;
  applicantId: string;
  applicant?: User;
  resumeUrl?: string | null;
  coverLetter?: string | null;
  portfolioUrl?: string | null;
  phone?: string | null;
  status: ApplicationStatus;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface SavedJob {
  id: string;
  userId: string;
  jobId: string;
  job?: Job;
  savedAt: Date | string;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  sender?: User;
  recipientId: string;
  content: string;
  isRead: boolean;
  createdAt: Date | string;
}

export interface Thread {
  id: string;
  participants: User[];
  lastMessage?: Message | null;
  updatedAt: Date | string;
  unreadCount?: number;
}


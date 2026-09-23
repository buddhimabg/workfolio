"use server";

import { prisma, WorkplaceType, EmploymentType, JobStatus, ApplicationStatus } from "@/lib/prisma";
import { requireHiringManager, requireJobSeeker, requireUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface ActionResponse {
  error?: string;
  success?: boolean;
}

export async function createJob(
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  let manager;
  try {
    manager = await requireHiringManager();
  } catch {
    return { error: "You must be signed in as a Hiring Manager to post jobs." };
  }

  const title = formData.get("title") as string;
  const company = (formData.get("company") as string) || manager.companyName || "";
  const location = formData.get("location") as string;
  const workplaceType = (formData.get("workplaceType") as WorkplaceType) || "REMOTE";
  const employmentType = (formData.get("employmentType") as EmploymentType) || "FULL_TIME";
  const salaryMin = formData.get("salaryMin") ? parseInt(formData.get("salaryMin") as string, 10) : null;
  const salaryMax = formData.get("salaryMax") ? parseInt(formData.get("salaryMax") as string, 10) : null;
  const description = formData.get("description") as string;
  const requirements = formData.get("requirements") as string;
  const skills = formData.get("skills") as string;

  if (!title || !company || !location || !description) {
    return { error: "Please fill in all required job fields." };
  }

  let newJobId: string;
  try {
    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        workplaceType,
        employmentType,
        salaryMin,
        salaryMax,
        description,
        requirements,
        skills,
        status: "ACTIVE",
        postedById: manager.id,
      },
    });
    newJobId = job.id;
  } catch (error: any) {
    console.error("Job creation error:", error);
    return { error: error.message || "Failed to create job posting." };
  }

  revalidatePath("/jobs");
  revalidatePath("/dashboard/jobs");
  redirect(`/jobs/${newJobId}`);
}

export async function applyForJob(
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  let user;
  try {
    user = await requireUser();
  } catch {
    return { error: "You must be logged in to apply for this job." };
  }

  const jobId = formData.get("jobId") as string;
  const resumeUrl = formData.get("resumeUrl") as string;
  const coverLetter = formData.get("coverLetter") as string;
  const portfolioUrl = formData.get("portfolioUrl") as string;
  const phone = formData.get("phone") as string;

  if (!jobId) {
    return { error: "Invalid job identifier." };
  }

  try {
    const existing = await prisma.application.findUnique({
      where: {
        jobId_applicantId: {
          jobId,
          applicantId: user.id,
        },
      },
    });

    if (existing) {
      return { error: "You have already applied for this position." };
    }

    await prisma.application.create({
      data: {
        jobId,
        applicantId: user.id,
        resumeUrl,
        coverLetter,
        portfolioUrl,
        phone,
        status: "SUBMITTED",
      },
    });

    revalidatePath(`/jobs/${jobId}`);
    revalidatePath("/dashboard/my-applications");
    return { success: true };
  } catch (error: any) {
    console.error("Application submission error:", error);
    return { error: error.message || "Failed to submit application. Please try again." };
  }
}

export async function updateApplicationStatus(
  applicationId: string,
  newStatus: ApplicationStatus,
  jobId: string
) {
  await requireHiringManager();

  await prisma.application.update({
    where: { id: applicationId },
    data: { status: newStatus },
  });

  revalidatePath(`/dashboard/jobs/${jobId}/applicants`);
  revalidatePath("/dashboard/my-applications");
}

export async function toggleJobStatus(jobId: string, currentStatus: JobStatus) {
  const manager = await requireHiringManager();

  const nextStatus: JobStatus = currentStatus === "ACTIVE" ? "CLOSED" : "ACTIVE";

  await prisma.job.updateMany({
    where: { id: jobId, postedById: manager.id },
    data: { status: nextStatus },
  });

  revalidatePath("/jobs");
  revalidatePath("/dashboard/jobs");
  revalidatePath(`/jobs/${jobId}`);
}

export async function deleteJob(jobId: string) {
  const manager = await requireHiringManager();

  await prisma.job.deleteMany({
    where: { id: jobId, postedById: manager.id },
  });

  revalidatePath("/jobs");
  revalidatePath("/dashboard/jobs");
}


"use server";

import { prisma, Role } from "@/lib/prisma";
import {
  hashPassword,
  verifyPassword,
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  getSession,
} from "@/lib/auth";
import { redirect } from "next/navigation";

export interface AuthState {
  error?: string;
  success?: boolean;
}

export async function registerUser(
  _prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const name = formData.get("name") as string;
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  const password = formData.get("password") as string;
  const role = (formData.get("role") as Role) || "JOB_SEEKER";
  const companyName = formData.get("companyName") as string | undefined;

  if (!name || !email || !password) {
    return { error: "Please fill in all required fields." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "An account with this email already exists." };
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role,
        companyName: role === "HIRING_MANAGER" ? companyName || null : null,
      },
    });

    const token = await createSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyName: user.companyName,
    });

    await setSessionCookie(token);
  } catch (error: any) {
    console.error("Registration error:", error);
    return { error: error.message || "Failed to create account. Please try again." };
  }

  redirect(role === "HIRING_MANAGER" ? "/dashboard/jobs" : "/jobs");
}

export async function loginUser(
  _prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string)?.toLowerCase().trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  let userRole: Role = "JOB_SEEKER";

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "Invalid email or password." };
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return { error: "Invalid email or password." };
    }

    userRole = user.role;

    const token = await createSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyName: user.companyName,
    });

    await setSessionCookie(token);
  } catch (error: any) {
    console.error("Login error:", error);
    return { error: error.message || "Login failed. Please try again." };
  }

  redirect(userRole === "HIRING_MANAGER" ? "/dashboard/jobs" : "/jobs");
}

export async function logoutUser() {
  await clearSessionCookie();
  redirect("/login");
}

export async function getCurrentSession() {
  return getSession();
}


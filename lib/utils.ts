import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines conditional class names with Tailwind Merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats salary range with currency and shorthand 'k' notation
 * e.g., "LKR 150k – 250k / month"
 */
export function formatSalary(
  min?: number | null,
  max?: number | null,
  currency: string = "LKR"
): string {
  if (!min && !max) return "Competitive";

  const formatAmount = (val: number): string => {
    // If salary was saved as annual (> 100,000 for standard currencies like USD/LKR),
    // or if already monthly, let's format nicely:
    if (val >= 1000) {
      const kVal = val >= 1000000 ? (val / 1000000).toFixed(1) + "M" : Math.round(val / 1000) + "k";
      return kVal;
    }
    return val.toLocaleString();
  };

  if (min && max) {
    return `${currency} ${formatAmount(min)} – ${formatAmount(max)} / month`;
  }
  if (min) {
    return `From ${currency} ${formatAmount(min)} / month`;
  }
  if (max) {
    return `Up to ${currency} ${formatAmount(max)} / month`;
  }
  return "Competitive";
}

/**
 * Formats date to a human-readable relative time string
 * e.g., "just now", "2h ago", "3 days ago"
 */
export function formatTimeAgo(dateInput: Date | string | number): string {
  if (!dateInput) return "";

  const date = typeof dateInput === "object" ? dateInput : new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return "1 day ago";
  }
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks === 1) {
    return "1 week ago";
  }
  if (diffInWeeks < 4) {
    return `${diffInWeeks} weeks ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths === 1) {
    return "1 month ago";
  }
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
}

/**
 * Formats location string from city, country, and remote status
 * e.g., "Colombo, Sri Lanka" or "Remote"
 */
export function formatLocation(
  city?: string | null,
  country?: string | null,
  remote?: boolean | string | null
): string {
  const isRemote =
    remote === true ||
    (typeof remote === "string" && remote.toUpperCase() === "REMOTE");

  if (isRemote && !city && !country) {
    return "Remote";
  }

  const parts = [city, country].filter(Boolean);
  const locationString = parts.join(", ");

  if (isRemote) {
    return locationString ? `${locationString} (Remote)` : "Remote";
  }

  return locationString || "Remote";
}


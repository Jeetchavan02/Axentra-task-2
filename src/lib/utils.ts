import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// headingConfig.ts
export const headingMap: Record<string, { heading: string; subheading: string }> = {
  "/": { heading: "Dashboard", subheading: "Overview of your account and activity" },
  "/settings": { heading: "Settings", subheading: "Configure your unified login and signup experience" },
  "/analytics": { heading: "Analytics", subheading: "View detailed analytics and insights" },
  "/ui-customization": { heading: "UI Customization", subheading: "Customize the appearance of your app" },
  "/security": { heading: "Security", subheading: "Manage your security and login settings" },
};

export function formatRelativeDate(date: string | Date): string {
  const now = new Date();
  const then = new Date(date);

  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
}

export const getContactTypeBadgeColor = (type: string) => {
  type = type.toLowerCase()
  switch (type) {
    case 'vip':
      return 'bg-green-100 text-green-800'; // Calm, trusted
    case 'lead':
      return 'bg-purple-100 text-purple-800'; // Warm, optimistic
    case 'hot':
      return 'bg-red-200 text-red-900'; // Bold, urgent
    case 'new':
      return 'bg-blue-100 text-blue-800'; // Friendly, fresh
    default:
      return 'bg-gray-100 text-gray-800'; // Neutral fallback
  }
};

export const formattedDate = (date: string | null | undefined) => {
  if (!date) return "---";

  const created = new Date(date);
  if (isNaN(created.getTime())) return "---";

  const now = new Date();
  const diffTime = now.getTime() - created.getTime();

  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffTime < 1000 * 60 * 60 * 24) {
    return diffHours <= 0 ? "Just now" : `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  }

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return `${diffDays} days ago`;

  // Format as "Jul 18, 2025"
  return created.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};


export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'sending':
      return 'bg-yellow-100 text-yellow-800';
    case 'draft':
      return 'bg-gray-100 text-gray-800';
    case 'scheduled':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility for formatting location URLs
export function formatLocationSlug(city: string, location: string): string {
  return `${city.toLowerCase()}-${location.toLowerCase().replace(/\s+/g, "-")}`;
}

// Utility for phone number formatting
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

// Utility for extracting colors from CSS custom properties
export function getCSSVariable(variable: string): string {
  if (typeof window !== "undefined") {
    return getComputedStyle(document.documentElement).getPropertyValue(
      variable
    );
  }
  return "";
}

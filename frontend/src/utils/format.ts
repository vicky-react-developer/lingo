import type { Options } from "../types/common";

interface SelectOptions<T> {
  data: T[];
  label: keyof T;
  value: keyof T;
}

export function ageFromDob(dob: string): number {
  const d = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const monthDiff = now.getMonth() - d.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < d.getDate())) {
    age--;
  }
  return age;
}

export function initials(name: string): string {
  return name
    .replace(/[.]/g, " ")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();
}

export function formatSelectOptions<T>({ data, label, value }: SelectOptions<T>): Options[] {
  return data.map(item => ({ label: String(item[label]), value: String(item[value]) }))
}

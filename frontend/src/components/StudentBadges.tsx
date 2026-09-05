import { initials } from "../utils/format";

export function StatusPill({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        active ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-500"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-stone-400"}`} />
      {active ? "Active" : "Inactive"}
    </span>
  );
}

export function GenderMark({ gender }: { gender: string }) {
  return (
    <span
      className={`inline-flex px-2 py-1 items-center justify-center rounded-full text-[11px] font-semibold ${
        gender === "Female" ? "bg-rose-50 text-rose-600" : "bg-sky-50 text-sky-600"
      }`}
    >
      {gender}
    </span>
  );
}

export function Avatar({ name }: { name: string }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-800 text-[11px] font-semibold text-white">
      {initials(name)}
    </span>
  );
}

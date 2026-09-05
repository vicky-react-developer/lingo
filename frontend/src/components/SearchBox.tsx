import { Search } from "lucide-react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBox({
  value,
  onChange,
  placeholder = "Search",
  className = "",
}: SearchBoxProps) {
  return (
    <label className={`relative flex items-center w-full sm:w-72 ${className}`}>
      <Search className="absolute left-3 h-4 w-4 text-stone-400" strokeWidth={2} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-stone-300 bg-white py-2 pl-9 pr-3 text-sm text-stone-800 placeholder:text-stone-400 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
      />
    </label>
  );
}

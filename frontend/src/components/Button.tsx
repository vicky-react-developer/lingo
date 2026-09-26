import type { ButtonHTMLAttributes } from "react";
import Loader from "./Loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    onClick: () => void,
    disabled?: boolean;
    loading: boolean;
    classNames?: string;
    variant?: "filled" | "dark"
}

export default function Button({ children, onClick, disabled, loading, type, classNames, variant = "filled" }: ButtonProps) {
    const variants = {
        // default style — used across existing pages, unchanged
        filled: "h-12 rounded-lg bg-[#00C6FF] font-semibold text-base",
        // used on Register page
        dark: "h-14 rounded-xl bg-[#07115D] font-bold text-lg",
        // used on ChangePassword page
        // primary: "h-12 rounded-[10px] bg-gradient-to-br from-[#185FA5] to-[#3B8FD4] font-semibold text-sm",
    };

    const v = variants[variant] || variants.filled;

    return (
        <button
            type={type}
            className={`w-full text-white my-3 flex items-center justify-center gap-2 disabled:opacity-70 ${v} ${classNames || ""}`}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {children}
            {loading && <Loader />}
        </button>
    )
}
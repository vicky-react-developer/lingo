import Loader from "./Loader";

export default function Button({ children, onClick, disabled, loading, type, classNames, variant = "filled" }) {
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
            disabled={disabled}
        >
            {children}
            {loading && <Loader />}
        </button>
    )
}
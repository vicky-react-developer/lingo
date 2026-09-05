export default function Field({ label, value, onChange, name, type, classNames, variant = "filled", ...props }) {
    const variants = {
        // default style — used across existing pages, unchanged
        filled: {
            label: "text-white",
            input: "bg-white border-none text-center placeholder-[#bfbfbf] focus:ring-2 focus:ring-[#00C6FF]",
        },
        // used on Register page
        outline: {
            label: "text-black",
            input: "bg-white border border-gray-200 text-left px-4 placeholder-gray-400 focus:border-[#07115D] focus:ring-1 focus:ring-[#07115D]",
        },
        // used on ChangePassword page
        soft: {
            label: "text-[#888]",
            input: "bg-[#F8FBFF] border border-[#D0E4F5] text-left placeholder-[#bfbfbf] focus:border-[#185FA5] focus:ring-1 focus:ring-[#185FA5]",
        },
    };

    const v = variants[variant] || variants.filled;

    return (
        <div className="mb-3">
            <label className={`block text-sm font-semibold mb-1.5 ${v.label}`}>
                {label}
            </label>
            <input
                type={type}
                className={`w-full h-12 rounded-lg text-base text-black outline-none ${v.input} ${classNames || ""}`}
                name={name}
                value={value}
                onChange={onChange}
                {...props}
                placeholder={label}
            />
        </div>
    )
}
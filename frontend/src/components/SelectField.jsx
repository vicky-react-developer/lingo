export default function SelectField({ label, value, onChange, name, options = [], classNames, variant = "filled", ...props }) {
    const variants = {
        // default style — matches Field's filled variant, used across existing pages
        filled: {
            label: "text-white text-sm font-semibold mb-1.5",
            select: "bg-white border-none rounded-lg text-center placeholder-[#bfbfbf] focus:ring-2 focus:ring-[#00C6FF]",
        },
        // used on Register page
        outline: {
            label: "text-black text-sm font-semibold mb-1.5",
            select: "bg-white border border-gray-200 rounded-lg text-left px-4 focus:border-[#07115D] focus:ring-1 focus:ring-[#07115D]",
        },
        // used on MyProfile page
        soft: {
            label: "text-[#888] text-[11px] font-semibold uppercase tracking-[0.5px] mb-[5px]",
            select: "bg-[#F8FBFF] border-[1.5px] border-[#D0E4F5] rounded-[10px] text-left cursor-pointer focus:border-[#185FA5] focus:ring-1 focus:ring-[#185FA5]",
        },
    };

    const v = variants[variant] || variants.filled;
    const emptyOptionLabel = variant === "outline" || variant === "soft" ? label : "Select...";

    return (
        <div className="mb-3">
            <label className={`block ${v.label}`}>
                {label}
            </label>
            <select
                className={`w-full h-12 text-base text-black outline-none ${v.select} ${classNames || ""}`}
                name={name}
                value={value}
                onChange={onChange}
                {...props}
            >
                <option value="">{emptyOptionLabel}</option>
                {options.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
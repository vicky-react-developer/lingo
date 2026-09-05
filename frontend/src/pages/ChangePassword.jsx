import { useState } from "react";
import { Lock, Eye, EyeOff, ShieldAlert, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { changeUserPassword } from "../services/userService";
import Header from "../components/Header";
import Field from "../components/Field";
import Button from "../components/Button";

export default function ChangePassword() {
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
        setSuccess("");
    };

    const toggleVisibility = (name) => {
        setShowPasswords(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const handleSubmit = async () => {
        if (!form.currentPassword) {
            setError("Current password is required.");
            return;
        }
        if (!form.newPassword) {
            setError("New password is required.");
            return;
        }
        if (form.newPassword.length < 6) {
            setError("New password must be at least 6 characters.");
            return;
        }
        if (form.newPassword !== form.confirmPassword) {
            setError("New passwords do not match.");
            return;
        }
        if (form.currentPassword === form.newPassword) {
            setError("New password must be different from the current password.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await changeUserPassword({
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
            });

            if (res?.success) {
                setSuccess("Password changed successfully!");
                setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                setError(res?.message || "Failed to change password. Please try again.");
            }
        } catch (e) {
            setError(e.message || "Failed to change password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { label: "Current Password", name: "currentPassword", hint: null },
        { label: "New Password", name: "newPassword", hint: "Minimum 6 characters" },
        { label: "Confirm New Password", name: "confirmPassword", hint: null },
    ];

    const getStrength = (pwd) => {
        if (!pwd) return null;
        if (pwd.length < 6) return { label: "Too short", color: "#E53935", width: "20%" };
        if (pwd.length < 8) return { label: "Weak", color: "#FB8C00", width: "40%" };
        if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd))
            return { label: "Strong", color: "#43A047", width: "100%" };
        if (/[A-Z]/.test(pwd) || /[0-9]/.test(pwd))
            return { label: "Fair", color: "#FDD835", width: "65%" };
        return { label: "Weak", color: "#FB8C00", width: "40%" };
    };

    const strength = getStrength(form.newPassword);

    return (
        <div className="min-h-screen bg-[#F4F7FB] pb-10">
            {/* Header */}
            <Header primaryTitle="Change Password" />

            <div className="max-w-[480px] mx-auto px-4 py-6">

                {/* Info banner */}
                <div className="bg-[#E6F1FB] rounded-xl px-4 py-3 mb-5 flex gap-2.5 items-start">
                    <ShieldAlert size={18} className="text-[#185FA5] mt-0.5 shrink-0" />
                    <div className="text-[13px] text-[#185FA5] leading-relaxed">
                        For your security, choose a strong password that you don't use elsewhere.
                    </div>
                </div>

                {/* Alerts */}
                {success && (
                    <div className="rounded-[10px] px-3.5 py-2.5 text-[13px] mb-3.5 flex items-center gap-2 bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32]">
                        <CheckCircle2 size={16} /> {success}
                    </div>
                )}
                {error && (
                    <div className="rounded-[10px] px-3.5 py-2.5 text-[13px] mb-3.5 flex items-center gap-2 bg-[#FFEBEE] border border-[#EF9A9A] text-[#C62828]">
                        <AlertCircle size={16} /> {error}
                    </div>
                )}

                {/* Card */}
                <div className="bg-white rounded-2xl px-5 py-6 shadow-[0_1px_6px_rgba(0,0,0,0.07)]">
                    {fields.map((field) => (
                        <div key={field.name} className="mb-4">
                            <div className="relative">
                                <Field
                                    variant="soft"
                                    label={field.label}
                                    name={field.name}
                                    type={showPasswords[field.name] ? "text" : "password"}
                                    value={form[field.name]}
                                    onChange={handleChange}
                                    classNames="pl-10 pr-10"
                                />

                                <Lock
                                    size={16}
                                    className="absolute left-3 top-[50px] -translate-y-1/2 text-[#185FA5]"
                                />

                                <button
                                    type="button"
                                    onClick={() => toggleVisibility(field.name)}
                                    className="absolute right-3 top-[50px] -translate-y-1/2 text-[#aaa] hover:text-[#185FA5] transition-colors"
                                >
                                    {showPasswords[field.name] ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            {field.hint && (
                                <div className="text-[11px] text-[#aaa] mt-1 pl-0.5">{field.hint}</div>
                            )}

                            {/* Password strength bar — only for newPassword */}
                            {field.name === "newPassword" && strength && (
                                <div className="mt-2">
                                    <div className="h-1 bg-[#EDF2F7] rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-300"
                                            style={{ width: strength.width, background: strength.color }}
                                        />
                                    </div>
                                    <div className="text-[11px] font-semibold mt-0.5" style={{ color: strength.color }}>
                                        {strength.label}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={loading}
                        loading={loading}
                    >
                        {loading ? "Updating..." : (
                            <>
                                <ShieldCheck size={16} /> Update Password
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
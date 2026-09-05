import { useState, useEffect } from "react";
import {
    User, Contact, AtSign, Phone, Calendar, GraduationCap, Building2, MapPin,
    IdCard, Briefcase, Home, CheckCircle2, AlertCircle, Pencil, Check,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile } from "../services/userService";
import Header from "../components/Header";
import Field from "../components/Field";
import SelectField from "../components/SelectField";
import Button from "../components/Button";

const FIELD_CONFIG = [
    { label: "Full Name", name: "name", type: "text", icon: User, required: true },
    { label: "Father's Name", name: "fatherName", type: "text", icon: Contact, required: true },
    { label: "Username", name: "userName", type: "text", icon: AtSign, required: true },
    { label: "Phone Number", name: "phoneNumber", type: "tel", icon: Phone, required: true },
    { label: "Date of Birth", name: "dateOfBirth", type: "date", icon: Calendar, required: true },
    { label: "Qualification", name: "qualification", type: "text", icon: GraduationCap, required: true },
    { label: "Organisation", name: "organisation", type: "text", icon: Building2, required: true },
    { label: "Place", name: "place", type: "text", icon: MapPin, required: true },
];

const SELECT_FIELDS = [
    {
        label: "Gender", name: "gender", icon: IdCard, required: true,
        options: ["Male", "Female", "Other"]
    },
    {
        label: "Role", name: "role", icon: Briefcase, required: true,
        options: ["Student", "Faculty"]
    },
];

const EMPTY_FORM = {
    name: "", fatherName: "", userName: "", phoneNumber: "",
    dateOfBirth: "", qualification: "", organisation: "",
    place: "", address: "", gender: "", role: "",
};

export default function MyProfile() {
    const { user, fetchUser } = useAuth();

    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [form, setForm] = useState(EMPTY_FORM);

    useEffect(() => {
        if (user) {
            setForm(prev => ({
                ...prev,
                name: user.name || "",
                fatherName: user.fatherName || "",
                userName: user.userName || "",
                phoneNumber: user.phoneNumber || "",
                dateOfBirth: user.dateOfBirth || "",
                qualification: user.qualification || "",
                organisation: user.organisation || "",
                place: user.place || "",
                address: user.address || "",
                gender: user.gender || "",
                role: user.role || "",
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
        setSuccess("");
    };

    const handleSave = async () => {
        for (const f of FIELD_CONFIG) {
            if (f.required && !form[f.name]?.trim()) {
                setError(`${f.label} is required.`);
                return;
            }
        }
        for (const f of SELECT_FIELDS) {
            if (f.required && !form[f.name]) {
                setError(`${f.label} is required.`);
                return;
            }
        }
        if (!/^[0-9]{10,15}$/.test(form.phoneNumber)) {
            setError("Phone number must be 10–15 digits.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const payload = {
                name: form.name,
                fatherName: form.fatherName,
                userName: form.userName,
                phoneNumber: form.phoneNumber,
                dateOfBirth: form.dateOfBirth,
                qualification: form.qualification,
                organisation: form.organisation,
                place: form.place,
                address: form.address,
                gender: form.gender,
                role: form.role,
            };

            const res = await updateUserProfile(payload);
            if (res?.success) {
                setSuccess("Profile updated successfully!");
                setEditing(false);
                if (fetchUser) fetchUser();
            } else {
                setError(res?.message || "Update failed. Please try again.");
            }
        } catch (e) {
            setError(e.message || "Update failed. Please try again.");
        } finally {
            setLoading(false);
            window.scrollTo(0, 0);
        }
    };

    const handleCancel = () => {
        setEditing(false);
        setError("");
        setSuccess("");
        if (user) {
            setForm({
                name: user.name || "",
                fatherName: user.fatherName || "",
                userName: user.userName || "",
                phoneNumber: user.phoneNumber || "",
                dateOfBirth: user.dateOfBirth || "",
                qualification: user.qualification || "",
                organisation: user.organisation || "",
                place: user.place || "",
                address: user.address || "",
                gender: user.gender || "",
                role: user.role || "",
            });
        }
    };

    const avatarLetter = user?.name?.[0]?.toUpperCase() || "?";

    return (
        <div className="min-h-screen bg-[#F4F7FB] pb-10">
            <Header primaryTitle="My profile" />

            <div className="max-w-[560px] mx-auto px-4 py-6">

                {/* Avatar Card */}
                <div className="bg-white rounded-2xl shadow-[0_1px_6px_rgba(0,0,0,0.07)] px-5 py-7 mb-4 flex flex-col items-center text-center">
                    <div className="w-[76px] h-[76px] rounded-full bg-gradient-to-br from-[#185FA5] to-[#3B8FD4] text-white text-[30px] font-bold flex items-center justify-center mb-3.5 shadow-[0_4px_14px_rgba(24,95,165,0.25)]">
                        {avatarLetter}
                    </div>
                    <div className="font-semibold text-lg text-[#1a1a1a]">{user?.name}</div>
                    <div className="text-[13px] text-[#888] mt-[3px]">@{user?.userName}</div>
                    <div className="text-xs text-[#aaa] mt-0.5">{user?.email}</div>
                    <span className="mt-2 inline-block px-3 py-[3px] rounded-[20px] bg-[#E6F1FB] text-[#185FA5] text-xs font-semibold">
                        {user?.role || "Student"}
                    </span>
                </div>

                {/* Alerts */}
                {success && (
                    <div className="rounded-[10px] px-3.5 py-2.5 text-[13px] mb-3 flex items-center gap-2 bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32]">
                        <CheckCircle2 size={16} /> {success}
                    </div>
                )}
                {error && (
                    <div className="rounded-[10px] px-3.5 py-2.5 text-[13px] mb-3 flex items-center gap-2 bg-[#FFEBEE] border border-[#EF9A9A] text-[#C62828]">
                        <AlertCircle size={16} /> {error}
                    </div>
                )}

                {/* Info / Edit Card */}
                <div className="bg-white rounded-2xl shadow-[0_1px_6px_rgba(0,0,0,0.07)] p-5">
                    <div className="flex items-center justify-between mb-[18px]">
                        <span className="font-semibold text-sm text-[#185FA5]">Account Information</span>
                        {!editing && (
                            <button
                                className="flex items-center gap-1.5 bg-[#E6F1FB] text-[#185FA5] rounded-lg px-3.5 py-1.5 text-[13px] font-medium hover:bg-[#D0E4F5] transition-colors"
                                onClick={() => setEditing(true)}
                            >
                                <Pencil size={14} /> Edit
                            </button>
                        )}
                    </div>

                    {/* Text fields — one per row */}
                    <div className="flex flex-col">
                        {FIELD_CONFIG.map(field => {
                            const Icon = field.icon;
                            return (
                                <div key={field.name} className="mb-[14px]">
                                    {editing ? (
                                        <div className="relative">
                                            <Field
                                                variant="soft"
                                                label={field.label}
                                                type={field.type}
                                                name={field.name}
                                                value={form[field.name]}
                                                onChange={handleChange}
                                                classNames="pl-10"
                                            />
                                            <Icon size={15} className="absolute left-3 top-[51px] -translate-y-1/2 text-[#185FA5]" />
                                        </div>
                                    ) : (
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888] mb-[5px]">{field.label}</label>
                                            <div className="text-sm text-[#1a1a1a] bg-[#F8FBFF] border border-[#EDF2F7] rounded-[10px] px-3.5 py-2.5">
                                                {form[field.name] || <span className="text-[#bbb]">—</span>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Select fields — one per row */}
                        {SELECT_FIELDS.map(field => {
                            const Icon = field.icon;
                            return (
                                <div key={field.name} className="mb-[14px]">
                                    {editing ? (
                                        <div className="relative">
                                            <SelectField
                                                variant="soft"
                                                label={field.label}
                                                name={field.name}
                                                value={form[field.name]}
                                                onChange={handleChange}
                                                options={field.options.map(opt => ({ label: opt, value: opt }))}
                                                classNames="pl-10"
                                            />
                                            <Icon size={15} className="absolute left-3 top-[51px] -translate-y-1/2 text-[#185FA5] pointer-events-none" />
                                        </div>
                                    ) : (
                                        <div>
                                            <label className="block text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888] mb-[5px]">{field.label}</label>
                                            <div className="text-sm text-[#1a1a1a] bg-[#F8FBFF] border border-[#EDF2F7] rounded-[10px] px-3.5 py-2.5">
                                                {form[field.name] || <span className="text-[#bbb]">—</span>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Address — full width, textarea */}
                        <div className="mb-[14px]">
                            {editing ? (
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888] mb-[5px]">Address</label>
                                    <div className="relative">
                                        <Home size={15} className="absolute left-3 top-[15px] text-[#185FA5]" />
                                        <textarea
                                            name="address"
                                            value={form.address}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full text-sm text-black outline-none bg-[#F8FBFF] border-[1.5px] border-[#D0E4F5] rounded-[10px] focus:border-[#185FA5] focus:ring-1 focus:ring-[#185FA5] pl-10 pr-3 pt-2.5 pb-2.5 resize-y"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888] mb-[5px]">Address</label>
                                    <div className="text-sm text-[#1a1a1a] bg-[#F8FBFF] border border-[#EDF2F7] rounded-[10px] px-3.5 py-2.5 min-h-[60px] whitespace-pre-wrap">
                                        {form.address || <span className="text-[#bbb]">—</span>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {editing && (
                        <div className="flex gap-2.5 mt-2">
                            <button
                                className="flex-1 h-12 rounded-[10px] bg-[#F4F7FB] text-[#555] border border-[#ddd] font-medium text-sm hover:bg-[#e8ecf1] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <div className="flex-[2]">
                                <Button
                                    onClick={handleSave}
                                    disabled={loading}
                                    loading={loading}
                                    classNames="my-0"
                                >
                                    {loading ? "Saving..." : (
                                        <>
                                            <Check size={16} /> Save
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Member since */}
                {user?.createdAt && (
                    <div className="text-center text-xs text-[#bbb] mt-2">
                        Member since {new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric", month: "long", day: "numeric"
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
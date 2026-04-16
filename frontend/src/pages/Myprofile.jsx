import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile } from "../services/userService";
import Header from "../components/Header";
import "./MyProfile.css";

const FIELD_CONFIG = [
    { label: "Full Name", name: "name", type: "text", icon: "bi-person", required: true },
    { label: "Father's Name", name: "fatherName", type: "text", icon: "bi-person-lines-fill", required: true },
    { label: "Username", name: "userName", type: "text", icon: "bi-at", required: true },
    { label: "Phone Number", name: "phoneNumber", type: "tel", icon: "bi-telephone", required: true },
    { label: "Date of Birth", name: "dateOfBirth", type: "date", icon: "bi-calendar3", required: true },
    { label: "Qualification", name: "qualification", type: "text", icon: "bi-mortarboard", required: true },
    { label: "Organisation", name: "organisation", type: "text", icon: "bi-building", required: true },
    { label: "Place", name: "place", type: "text", icon: "bi-geo", required: true },
];

const SELECT_FIELDS = [
    {
        label: "Gender", name: "gender", icon: "bi-person-badge", required: true,
        options: ["Male", "Female", "Other"]
    },
    {
        label: "Role", name: "role", icon: "bi-person-workspace", required: true,
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
        <div className="profile-page">
            <Header primaryTitle="My profile" />

            <div className="profile-container">

                {/* Avatar Card */}
                <div className="profile-card avatar-card">
                    <div className="avatar-circle">{avatarLetter}</div>
                    <div className="avatar-name">{user?.name}</div>
                    <div className="avatar-username">@{user?.userName}</div>
                    <div className="avatar-email">{user?.email}</div>
                    <span className="avatar-role-badge">{user?.role || "Student"}</span>
                </div>

                {/* Alerts */}
                {success && (
                    <div className="alert alert-success">
                        <i className="bi bi-check-circle-fill"></i> {success}
                    </div>
                )}
                {error && (
                    <div className="alert alert-error">
                        <i className="bi bi-exclamation-circle-fill"></i> {error}
                    </div>
                )}

                {/* Info / Edit Card */}
                <div className="profile-card info-card">
                    <div className="info-card-header">
                        <span className="info-card-title">Account Information</span>
                        {!editing && (
                            <button className="btn-edit" onClick={() => setEditing(true)}>
                                <i className="bi bi-pencil"></i> Edit
                            </button>
                        )}
                    </div>

                    {/* Text fields — one per row */}
                    <div className="fields-list">
                        {FIELD_CONFIG.map(field => (
                            <div key={field.name} className="field-row">
                                <label className="field-label">{field.label}</label>
                                {editing ? (
                                    <div className="input-wrap">
                                        <span className="input-icon">
                                            <i className={`bi ${field.icon}`}></i>
                                        </span>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={form[field.name]}
                                            onChange={handleChange}
                                            className="field-input"
                                        />
                                    </div>
                                ) : (
                                    <div className="field-value">
                                        {form[field.name] || <span className="field-empty">—</span>}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Select fields — one per row */}
                        {SELECT_FIELDS.map(field => (
                            <div key={field.name} className="field-row">
                                <label className="field-label">{field.label}</label>
                                {editing ? (
                                    <div className="input-wrap">
                                        <span className="input-icon">
                                            <i className={`bi ${field.icon}`}></i>
                                        </span>
                                        <select
                                            name={field.name}
                                            value={form[field.name]}
                                            onChange={handleChange}
                                            className="field-input field-select"
                                        >
                                            <option value="">Select...</option>
                                            {field.options.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    <div className="field-value">
                                        {form[field.name] || <span className="field-empty">—</span>}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Address — full width, textarea */}
                        <div className="field-row">
                            <label className="field-label">Address</label>
                            {editing ? (
                                <div className="input-wrap input-wrap--textarea">
                                    <span className="input-icon input-icon--top">
                                        <i className="bi bi-house"></i>
                                    </span>
                                    <textarea
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        rows={3}
                                        className="field-input field-textarea"
                                    />
                                </div>
                            ) : (
                                <div className="field-value field-value--address">
                                    {form.address || <span className="field-empty">—</span>}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {editing && (
                        <div className="action-buttons">
                            <button
                                className="btn-cancel"
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                className={`btn-save${loading ? " btn-save--loading" : ""}`}
                                onClick={handleSave}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status"></span>
                                        Saving...
                                    </>
                                ) : (
                                    <><i className="bi bi-check2"></i> Save Changes</>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Member since */}
                {user?.createdAt && (
                    <div className="member-since">
                        Member since {new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric", month: "long", day: "numeric"
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
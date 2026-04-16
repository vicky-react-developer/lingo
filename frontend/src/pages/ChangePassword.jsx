import { useState } from "react";
import { changeUserPassword } from "../services/userService";
import "./ChangePassword.css";
import Header from "../components/Header";

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
        <div className="cp-page">
            {/* Header */}
            <Header primaryTitle="Change Password" />

            <div className="cp-container">

                {/* Info banner */}
                <div className="cp-info-banner">
                    <i className="bi bi-shield-lock cp-info-icon"></i>
                    <div className="cp-info-text">
                        For your security, choose a strong password that you don't use elsewhere.
                    </div>
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

                {/* Card */}
                <div className="cp-card">
                    {fields.map((field) => (
                        <div key={field.name} className="cp-field-row">
                            <label className="cp-field-label">{field.label}</label>

                            <div className="cp-input-wrap">
                                <span className="cp-input-icon">
                                    <i className="bi bi-lock"></i>
                                </span>
                                <input
                                    type={showPasswords[field.name] ? "text" : "password"}
                                    name={field.name}
                                    value={form[field.name]}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="cp-input"
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleVisibility(field.name)}
                                    className="cp-toggle-btn"
                                >
                                    <i className={`bi ${showPasswords[field.name] ? "bi-eye-slash" : "bi-eye"}`}></i>
                                </button>
                            </div>

                            {field.hint && (
                                <div className="cp-field-hint">{field.hint}</div>
                            )}

                            {/* Password strength bar — only for newPassword */}
                            {field.name === "newPassword" && strength && (
                                <div className="cp-strength">
                                    <div className="cp-strength-track">
                                        <div
                                            className="cp-strength-bar"
                                            style={{ width: strength.width, background: strength.color }}
                                        />
                                    </div>
                                    <div className="cp-strength-label" style={{ color: strength.color }}>
                                        {strength.label}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`cp-submit-btn${loading ? " cp-submit-btn--loading" : ""}`}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm" role="status"></span>
                                Updating...
                            </>
                        ) : (
                            <><i className="bi bi-shield-check"></i> Update Password</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
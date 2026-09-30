import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import AuthUiTemplate from "../components/AuthUiTemplate";
import Field from "../components/Field";
import Button from "../components/Button";
import type { ResetPasswordFormData } from "../types/auth";
import { useResetPasswordMutation } from "../state/api/auth.api";
import { handleApiError } from "../services/apiService";

export default function ResetPassword() {
  const [resetPassword, {isLoading: loading}] = useResetPasswordMutation();
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const resetToken = location.state?.resetToken;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
  };

  const validate = () => {
    if (!formData.password || !formData.confirmPassword) {
      setError("Please fill all the fields");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!resetToken) {
      setError("Invalid session. Please go back and verify your identity first.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setError("");

    try {
      await resetPassword({ resetToken, newPassword: formData.password }).unwrap();
      setSuccess("Password updated successfully!");
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(handleApiError(err));
    } 
  };

  return (
    <AuthUiTemplate>
      <div className="-mt-[50px]">
        <div className="login-form">
          <Field
            type="password"
            label="New Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Field
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {error && <p className="text-red-500 text-center text-[12px]">{error}</p>}
          {success && <p className="text-green-500 text-center text-[12px]">{success}</p>}

          <Button
            onClick={handleSubmit}
            loading={loading}
            disabled={loading || !!success}
          >
            Update Password
          </Button>

          <div className="text-center pb-4 text-[11px] mt-3">
            <span className="text-[#fff]">Remember your password? </span>
            <Link className="underline !text-[#00C6FF]" to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </AuthUiTemplate>
  );
}
import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { validatePhone } from "../helpers/utils";
import { forgotPasswordApi } from "../services/authService";
import AuthUiTemplate from "../components/AuthUITemplate";
import Field from "../components/Field";
import Button from "../components/Button";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    userName: "",
    mobile: "",
    dob: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
  };

  const validate = () => {
    for (const key in formData) {
      if (!formData[key]) {
        setError("Please fill all the fields");
        return false;
      }
    }
    if (!validatePhone(formData.mobile)) {
      setError("Please enter a valid mobile number");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setError("");

    try {
      // Server verifies identity and returns a short-lived reset token
      const response = await forgotPasswordApi(formData);
      // Pass the token to ResetPassword via navigation state (never in the URL)
      navigate("/reset-password", { state: { resetToken: response.resetToken } });
    } catch (err) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthUiTemplate>
      <div className="-mt-[50px]">
        <Field
          type="text"
          label="User Name"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
        />

        <Field
          type="number"
          label="Mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />

        <Field
          type="date"
          label="Date of Birth"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]}
        />

        {error && <p className="text-red-500 text-center text-[12px]">{error}</p>}

        <Button
          onClick={handleSubmit}
          disabled={loading}
          loading={loading}
        >
          Verify Identity
        </Button>
      </div>

      <div className="text-center pb-4 text-[11px] mt-3">
        <span className="text-[#fff]">Remember your password? </span>
        <Link className="underline !text-[#00C6FF]" to="/login">Sign in</Link>
      </div>
    </AuthUiTemplate>
  );
}
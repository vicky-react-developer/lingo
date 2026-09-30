import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { validatePhone } from "../helpers/utils";
import AuthUiTemplate from "../components/AuthUiTemplate";
import Field from "../components/Field";
import Button from "../components/Button";
import type { ForgotPasswordPayload } from "../types/auth";
import { useForgotPasswordMutation } from "../state/api/auth.api";
import { handleApiError } from "../services/apiService";

export default function ForgotPassword() {
  const [forgotPassword, { isLoading: loading }] = useForgotPasswordMutation();
  const [formData, setFormData] = useState<ForgotPasswordPayload>({
    userName: "",
    mobile: "",
    dob: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
  };

  const validate = () => {
    for (const key in formData) {
      if (!formData[key as keyof ForgotPasswordPayload]) {
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

    setError("");

    try {
      const response = await forgotPassword(formData).unwrap();
      navigate("/reset-password", { state: { resetToken: response.resetToken } });
    } catch (err) {
      setError(handleApiError(err));
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
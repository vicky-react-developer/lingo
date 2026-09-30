import React, { useState, type ChangeEvent } from "react";
import { useImmer } from "use-immer";
import { useNavigate, Link } from "react-router";
import { validatePhone } from "../helpers/utils";
import Footer from "../layouts/Footer";
import Field from "../components/Field";
import SelectField from "../components/SelectField";
import Button from "../components/Button";
import type { RegisterFormData, RegisterPayload } from "../types/auth";
import { useRegisterUserMutation } from "../state/api/auth.api";
import { handleApiError } from "../services/apiService";

const Register = () => {
  const navigate = useNavigate();

  const [registerUser, { isLoading: loading }] = useRegisterUserMutation();

  const [formData, setFormData] = useImmer<RegisterFormData>({
    name: {
      label: "Name",
      value: "",
      type: "text",
    },
    fatherName: {
      label: "Father Name",
      value: "",
      type: "text",
    },
    gender: {
      label: "Gender",
      value: "Male",
      type: "select",
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
      ],
    },
    role: {
      label: "Role",
      value: "Student",
      type: "select",
      options: [
        { label: "Student", value: "Student" },
        { label: "Faculty", value: "Faculty" },
      ],
    },
    age: {
      label: "Date of Birth",
      value: "",
      type: "date",
    },
    qualification: {
      label: "Qualification",
      value: "",
      type: "text",
    },
    organisation: {
      label: "Organisation",
      value: "",
      type: "text",
    },
    address: {
      label: "Address",
      value: "",
      type: "text",
    },
    place: {
      label: "Place",
      value: "",
      type: "text",
    },
    phoneNumber: {
      label: "Phone Number",
      value: "",
      type: "number",
      validation: (phone: string) => {
        if (!validatePhone(phone)) return "Enter a valid phone number";
        return null;
      },
    },
    userName: {
      label: "User Name",
      value: "",
      type: "text",
    },
    password: {
      label: "Password",
      value: "",
      type: "password",
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((draft) => {
      draft[name as keyof RegisterFormData].value = value;
    });
    if (error) setError("");
    if (success) setSuccess("");
  };

  const validate = () => {
    let key: keyof RegisterFormData;

    for (key in formData) {
      const field = formData[key];

      if (!field.value) {
        setError(`Please enter the ${field.label}`);
        return false;
      }

      if (field.validation) {
        const validationError = field.validation(field.value);

        if (validationError) {
          setError(validationError);
          return false;
        }
      }
    }

    return true;
  };


  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return; 4

    const payload = Object.fromEntries(
      Object.entries(formData).map(([key, field]) => [
        key,
        field.value,
      ])
    ) as RegisterPayload;

    setError("");
    setSuccess("");

    try {
      const response = await registerUser(payload).unwrap();
      setSuccess(response.message || "Registration successful! Redirecting to login...");

      setFormData((draft) => {
        Object.keys(draft).forEach((key) => {
          draft[key as keyof RegisterFormData].value = "";
        });
      });

      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex justify-center items-center bg-[rgb(8,18,78)] py-4 px-2">
      <div className="w-full max-w-[420px] bg-white rounded-lg p-8 shadow-lg">
        <h2 className="relative inline-block text-3xl font-extrabold text-black mb-6 pb-2">
          Registration
          <span className="absolute left-0 bottom-0 h-[3px] w-[30px] rounded-[5px] bg-gradient-to-br from-[#71b7e6] to-[#9b59b6]" />
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="max-h-[300px] overflow-y-scroll px-[5px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {Object.keys(formData).map((key) => {
              const field = formData[key as keyof RegisterFormData];

              switch (field.type) {
                case "select":
                  return (
                    <SelectField
                      key={key}
                      variant="outline"
                      label={field.label}
                      name={key}
                      value={field.value}
                      onChange={handleChange}
                      options={field.options!}
                    />
                  );

                default:
                  return (
                    <Field
                      key={key}
                      variant="outline"
                      label={field.label}
                      type={field.type}
                      placeholder={field.label}
                      name={key}
                      value={field.value}
                      onChange={handleChange}
                      {...(key === "age" && {
                        max: new Date().toISOString().split("T")[0],
                      })}
                    />
                  );
              }
            })}
          </div>

          <div className="my-4">
            {error && (
              <p className="text-red-600 text-center text-xs">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-center text-xs">{success}</p>
            )}

            <Button type="submit" variant="dark" disabled={loading} loading={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>

            <div className="text-center mt-3 font-medium text-[13px]">
              <span className="text-black">Already have an account? </span>
              <Link className="text-[#07115D] font-semibold underline" to="/login">Sign in</Link>
            </div>
          </div>
        </form>
      </div>
      <Footer backgroundColor="bg-[#030352]" textColor="text-white" />
    </div>
  );
};

export default Register;
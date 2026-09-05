import React, { useState } from "react";
import { useImmer } from "use-immer";
import { useNavigate, Link } from "react-router";
import { validatePhone } from "../helpers/utils";
import { registerUserApi } from "../services/authService";
import Footer from "../components/Footer";
import Field from "../components/Field";
import SelectField from "../components/SelectField";
import Button from "../components/Button";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useImmer({
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
      value: "",
      type: "select",
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
      ],
    },
    role: {
      label: "Role",
      value: "",
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
      validation: (phone) => {
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((draft) => {
      draft[name].value = value;
    });
    if (error) setError("");
    if (success) setSuccess("");
  };

  const validate = () => {
    for (const key in formData) {
      if (!formData[key].value) {
        setError(`Please enter the ${formData[key].label}`);
        return false;
      }
      if (
        formData[key].validation &&
        formData[key].validation(formData[key].value)
      ) {
        setError(formData[key].validation(formData[key].value));
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = Object.keys(formData).reduce((acc, key) => {
      acc[key] = formData[key].value;
      return acc;
    }, {});

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await registerUserApi(payload);
      setSuccess(response.message || "Registration successful! Redirecting to login...");

      // Reset form fields
      setFormData((draft) => {
        Object.keys(draft).forEach((key) => {
          draft[key].value = "";
        });
      });

      // Navigate to login after a short delay so user sees the success message
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
              const field = formData[key];

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
                      options={field.options}
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
      <Footer style={{ background: "#030352", color: "#fff" }} />
    </div>
  );
};

export default Register;
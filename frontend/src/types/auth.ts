import type { MessageResponse } from "./common";
import type { User, Gender, NonAdminRole } from "./users";

export interface LoginPayload {
    userName: string;
    password: string;
}

type SelectOption<T extends string = string> = {
    label: string;
    value: T;
};

interface FormField<T = string> {
    label: string;
    value: T;
    type: "text" | "select" | "date" | "number" | "password";
    options?: SelectOption[];
    validation?: (value: string) => string | null;
}

export interface RegisterFormData {
    name: FormField<string>;
    fatherName: FormField<string>;
    gender: FormField<Gender>;
    role: FormField<NonAdminRole>;
    age: FormField<string>;
    qualification: FormField<string>;
    organisation: FormField<string>;
    address: FormField<string>;
    place: FormField<string>;
    phoneNumber: FormField<string>;
    userName: FormField<string>;
    password: FormField<string>;
}

export type RegisterPayload = {
    [K in keyof RegisterFormData]: RegisterFormData[K]["value"];
};

export interface RegistrationResponse extends MessageResponse {
    data: User
}

export interface LoginResponse extends MessageResponse {
    data: User,
    token: string
}

export interface ForgotPasswordResponse extends MessageResponse {
    resetToken: string
}

export interface ForgotPasswordPayload {
    userName: string;
    mobile: string;
    dob: string;
}

export interface ResetPasswordFormData {
    password: string,
    confirmPassword: string,
}

export interface ResetPasswordPayload {
    resetToken: string;
    newPassword: string;
}


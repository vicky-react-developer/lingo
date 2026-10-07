export interface FacultyAssignment {
  facultyId: number
}

export interface User {
  id: number;
  name: string;
  role: string;
  userName: string;
  fatherName: string;
  gender: string;
  dateOfBirth: string;
  qualification: string;
  organisation: string;
  address: string;
  place: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  facultyAssignment?: FacultyAssignment | null;
}

export type Role = "Admin" | "Faculty" | "Student";
export type NonAdminRole = Exclude<Role, "Admin">;

export type Gender = "Male" | "Female" | "Other";

export interface UpdateUserStatusPayload {
  userId: number,
  payload: {
    isActive: boolean,
    role: Omit<Role, "Admin">
  }
}

export interface AssignFacultyPayload {
  studentId: number,
  payload: {
    facultyId: number
  }
}

export interface FacultyOptions {
  id: number;
  name: string
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface UserProfile {
  name: string;
  fatherName: string;
  userName: string;
  phoneNumber: string;
  dateOfBirth: string;
  qualification: string;
  organisation: string;
  place: string;
  address: string;
  gender: string;
  role: string;
}

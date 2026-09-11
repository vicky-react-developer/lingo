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

export interface UpdateUserStatusPayload {
  userId: number,
  payload: {
    isActive: boolean
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

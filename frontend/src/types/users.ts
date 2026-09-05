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
}

export interface UpdateUserStatusPayload {
  userId: number,
  payload: {
    isActive: boolean
  }
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role?: "user" | "admin";
  name?: string;
  phoneNo?: string;
  country?: string;
  dateOfBirth?: string;
  gender?: string;
  bio?: string;
  address?: string;
  emergencyContact?: string;
  accessibilityNeeds?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  name?: string;
  phoneNo?: string;
  country?: string;
  dateOfBirth?: string;
  gender?: string;
  bio?: string;
  address?: string;
  emergencyContact?: string;
  accessibilityNeeds?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}

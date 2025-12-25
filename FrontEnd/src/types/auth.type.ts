export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  role?: string;
}
export interface AuthResponse {
  status: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}
export interface LoginRequest {
  email: string;
  password: string;
  username: string;
}
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  //   confirmPassword?: string;
  name: string;
  phoneNo: number;
}

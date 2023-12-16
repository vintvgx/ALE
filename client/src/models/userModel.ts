export interface UserModel {
  pk: number; // Assuming your id field is of type AutoField or similar
  email: string;
  username: string;
  first_name: string;
  last_name: string | null;
  avatar?: string | null; // Assuming avatar is a file path
  is_active?: boolean;
  is_staff?: boolean;
  date_joined: string; // Use string or Date based on your preference
  last_login: string; // Use string or Date based on your preference
}

export interface AuthState {
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
  user: UserModel | null;
  message: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RefreshResponse {
  access: string;
}

// models/userModel.ts (or your relevant file)
export interface ChangePasswordPayload {
  newPassword1: string;
  newPassword2: string;
  oldPassword: string;
}

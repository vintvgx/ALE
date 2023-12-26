export interface UserModel {
  pk: number | undefined; // Assuming your id field is of type AutoField or similar
  id?: number | undefined;
  email: string;
  username: string;
  first_name: string;
  last_name: string | null;
  avatar?: string | null;
  is_active?: boolean;
  is_staff?: boolean;
  date_joined: string;
  last_login: string;
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

export interface SignUpPayload {
  username: string;
  email: string;
  password1: string;
  password2: string;
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

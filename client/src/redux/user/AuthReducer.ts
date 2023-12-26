import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  ChangePasswordPayload,
  LoginPayload,
  RefreshResponse,
  SignUpPayload,
  UserModel,
} from "../../models/userModel";
import axios from "axios";

const initialState: AuthState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: false,
  user: null,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ access: string; user: UserModel }>
    ) => {
      const { access, user } = action.payload;
      localStorage.setItem("access", access);
      state.access = access;
      state.isAuthenticated = true;
      state.user = user;
      state.message = "Login has succeeded";
    },
    loginFail: (state) => {
      localStorage.removeItem("access");
      state.access = null;
      state.isAuthenticated = false;
      state.user = null;
      state.message = "Login has failed";
    },
    signUpSuccess: (
      state,
      action: PayloadAction<{ access: string; user: UserModel }>
    ) => {
      const { access, user } = action.payload;
      localStorage.setItem("access", access);
      state.access = access;
      state.isAuthenticated = true;
      state.user = user;
      state.message = "Sign up has succeeded";
    },
    signUpFailure: (state) => {
      localStorage.removeItem("access");
      state.access = null;
      state.isAuthenticated = false;
      state.user = null;
      state.message = "Sign up has failed";
    },
    verifySuccess: (state) => {
      state.isAuthenticated = true;
    },
    verifyFail: (state) => {
      state.isAuthenticated = false;
    },
    getUserSuccess: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    getUserFail: (state) => {
      state.user = null;
    },
    setUser: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
    },
    refreshSuccess: (state, action: PayloadAction<{ access: string }>) => {
      const { access } = action.payload;
      localStorage.setItem("access", access);
      state.access = access;
      state.isAuthenticated = true;
      state.message = "Refresh token success";
    },
    refreshFail: (state) => {
      localStorage.removeItem("access");
      state.access = null;
      state.isAuthenticated = false;
      state.user = null;
      state.message = "Refresh token fail";
    },
    changePasswordSuccess: (state) => {
      state.message = "Change password success";
    },
    changePasswordFail: (state) => {
      state.message = "Change password fail";
    },
    signupSuccess: (state) => {
      state.message = "Verification link has been sent to your email";
    },
    signupFail: (state) => {
      state.message = "Signup fail";
    },
    activateAccountSuccess: (state) => {
      state.message = "Your account has been verified";
    },
    activateAccountFail: (state) => {
      state.message = "Verification account has failed";
    },
    resetSuccess: (state) => {
      state.message = "Reset password success";
    },
    resetFail: (state) => {
      state.message = "Reset password fail";
    },
    setSuccess: (state) => {
      state.message = "Your new password has been set";
    },
    setFail: (state) => {
      state.message = "Set new password failed";
    },
    logout: (state) => {
      localStorage.removeItem("access");
      state.access = null;
      state.isAuthenticated = false;
      state.user = null;
      state.message = "User has logged out";
    },
    closeAlert: (state) => {
      state.message = "";
    },
    guestView: (state) => {
      return {
        ...state,
      };
    },
  },
});

export const {
  loginSuccess,
  loginFail,
  signUpSuccess,
  signUpFailure,
  verifySuccess,
  verifyFail,
  getUserSuccess,
  getUserFail,
  setUser,
  refreshSuccess,
  refreshFail,
  changePasswordSuccess,
  changePasswordFail,
  signupSuccess,
  signupFail,
  activateAccountSuccess,
  activateAccountFail,
  resetSuccess,
  resetFail,
  setSuccess,
  setFail,
  logout,
  closeAlert,
  guestView,
} = authSlice.actions;

export default authSlice.reducer;

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ username, password }: LoginPayload, thunkApi): Promise<any> => {
    const { dispatch } = thunkApi;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ username, password });

    try {
      const res = await axios.post(
        "http://localhost:8000/dj-rest-auth/login/",
        body,
        config
      );
      dispatch(loginSuccess(res.data)); // Dispatch the loginSuccess action with the data
      dispatch(fetchUser(res.data.user.pk));
      return res.data; // Resolve the promise with the data if needed
    } catch (err) {
      dispatch(loginFail()); // Dispatch the loginFail action
      throw err; // Reject the promise with the error if needed
    }
  }
);

export const userSignUp = createAsyncThunk(
  "user/signup",
  async (
    { username, email, password1, password2 }: SignUpPayload,
    thunkApi
  ): Promise<any> => {
    const { dispatch } = thunkApi;
    try {
      const response = await axios.post(
        "http://localhost:8000/dj-rest-auth/registration/",
        {
          username,
          email,
          password1,
          password2,
        }
      );

      dispatch(signUpSuccess(response.data));
    } catch (error) {
      dispatch(signUpFailure());
    }
  }
);

/**
 * Thunk action for verifying the user's access token.
 * If the access token is present, it sends a request to verify it.
 * Dispatches the appropriate actions based on the verification result.
 */
export const verify = createAsyncThunk("user/verify", async (_, thunkApi) => {
  const { dispatch } = thunkApi;

  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      await axios.post(
        "http://localhost:8000/dj-rest-auth/token/verify/",
        body,
        config
      );
      dispatch(authSlice.actions.verifySuccess());
    } catch (err) {
      dispatch(authSlice.actions.verifyFail());
      //refresh token if verify fails
      await dispatch(refresh());
    }
  } else {
    dispatch(authSlice.actions.guestView());
  }
});

/**
 * Thunk action for fetching user data.
 * Checks if there is an access token in local storage.
 * If present, sends a request to retrieve user data using the access token.
 * Dispatches the appropriate actions based on the result.
 */
export const getUser = createAsyncThunk("user/getUser", async (_, thunkApi) => {
  const { dispatch } = thunkApi;

  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };

    try {
      const res = await axios.get(
        "http://localhost:8000/dj-rest-auth/user/",
        config
      );
      dispatch(authSlice.actions.getUserSuccess(res.data));
      dispatch(fetchUser(res.data.pk));
    } catch (err: any) {
      dispatch(authSlice.actions.getUserFail());
      console.error("Failed to fetch user:", err.message);
    }
  } else {
    dispatch(authSlice.actions.guestView());
  }
});

export const fetchUser = createAsyncThunk(
  "user/fetch",
  async (userId: string, thunkApi): Promise<any> => {
    const { dispatch } = thunkApi;

    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
      dispatch(setUser(res.data)); // Dispatch the setUser action with the data
      return res.data; // Resolve the promise with the data if needed
    } catch (err) {
      throw err; // Reject the promise with the error if needed
    }
  }
);

/**
 * Thunk action for refreshing the access token.
 * Checks if there is an access token in local storage.
 * If present, sends a request to refresh the access token using the refresh token.
 * Dispatches the appropriate actions based on the result.
 */
export const refresh = createAsyncThunk<
  RefreshResponse,
  void,
  { rejectValue: string }
>("auth/refresh", async (_, thunkApi) => {
  const { dispatch } = thunkApi;

  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ refresh: localStorage.getItem("refresh") });
    try {
      const res = await axios.post(
        "http://localhost:8000/dj-rest-auth/token/refresh/",
        body,
        config
      );
      dispatch(refreshSuccess(res.data));
      return res.data;
    } catch (error) {
      return dispatch(refreshFail());
    }
  } else {
    return dispatch(guestView());
  }
});

// Thunk action for changing the user's password
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (payload: ChangePasswordPayload, thunkApi): Promise<any> => {
    const { dispatch } = thunkApi;
    // Verify the access token before changing the password
    await dispatch(verify());

    // Prepare the request configuration
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    };

    // Convert the payload to JSON
    const body = JSON.stringify(payload);

    try {
      // Make a request to change the password
      await axios.post(
        "http://localhost:8000/dj-rest-auth/password/change/",
        body,
        config
      );

      // Dispatch the changePasswordSuccess action upon success
      dispatch(changePasswordSuccess());
    } catch (err) {
      // Dispatch the changePasswordFail action upon failure
      dispatch(changePasswordFail());

      // Rethrow the error to reject the promise with the error
      throw err;
    }
  }
);

// Thunk action for user logout
export const userLogout = createAsyncThunk(
  "user/logout",
  async (_, thunkApi): Promise<any> => {
    const { dispatch } = thunkApi;

    // Prepare the request configuration
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // Make a request to logout
      await axios.post("http://localhost:8000/dj-rest-auth/logout/", config);

      // Dispatch the logout action upon success
      dispatch(logout());
    } catch (err) {
      // Dispatch the logout action upon failure
      dispatch(logout());
    }
  }
);

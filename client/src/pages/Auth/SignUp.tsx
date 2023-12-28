import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { fetchUsers, userSignUp } from "../../redux/user/AuthReducer";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { usernames, emails } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    console.log("🚀 ~ file: SignUp.tsx:25 ~ SignUp ~ emails:", emails);
    console.log("🚀 ~ file: SignUp.tsx:25 ~ SignUp ~ usernames:", usernames);
  }, [emails, usernames]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
    if (/\s/.test(newUsername)) {
      setUsernameError("Username cannot include spaces");
      return;
    }

    const usernameLower = newUsername.toLowerCase();
    if (usernameLower.length <= 2) {
      setUsernameError("Username must be more than 2 characters");
    } else if (usernames?.map((u) => u.toLowerCase()).includes(usernameLower)) {
      setUsernameError("Username is already taken");
    } else {
      setUsernameError("");
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    if (!emailRegex.test(newEmail)) {
      setEmailError("Please enter a valid email address");
    } else if (
      emails?.map((e) => e.toLowerCase()).includes(newEmail.toLowerCase())
    ) {
      setEmailError("Email is already used");
    } else {
      setEmailError("");
    }
  };
  useEffect(() => {
    if (password.length > 0 && passwordTouched) {
      if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters");
      } else if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  }, [password, confirmPassword, passwordTouched]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !usernameError &&
      !emailError &&
      !passwordError &&
      password === confirmPassword
    ) {
      const signUpPayload = {
        username,
        email,
        password1: password,
        password2: confirmPassword,
      };

      try {
        dispatch(userSignUp(signUpPayload));
        navigate("/await-verification");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isFormValid = () => {
    return (
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      !usernameError &&
      !emailError &&
      !passwordError
    );
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <form
        onSubmit={handleSubmit}
        className="mt-4 w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-2">Welcome to NOD/UM</h2>

        <p className={"text-gray-600"}>Create an account to get started!</p>

        <div className="flex flex-col mt-4 justify-center items-center gap-3">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 mb-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 mb-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            // onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 mb-2 border rounded-md"
          />
          {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
          {!usernameError && username && (
            <p style={{ color: "green" }}>Username is available</p>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-3 py-2 mb-2 border rounded-md"
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          {!emailError && email && (
            <p style={{ color: "green" }}>Email is available</p>
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordTouched(true);
            }}
            className="w-full px-3 py-2 mb-2 border rounded-md"
          />
          {passwordError && passwordTouched && (
            <p style={{ color: "red" }}>{passwordError}</p>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 mb-2 border rounded-md"
          />
          {/* {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )} */}

          <button
            className={`bg-black text-white w-full px-3 py-2 rounded-md mb-3 ${
              !isFormValid() && "opacity-50 cursor-not-allowed"
            }`}
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid()}>
            Sign Up
          </button>
          {/* Other UI elements go here */}
        </div>
      </form>
    </div>
  );
};

export default SignUp;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { userLogin } from "../../redux/user/AuthReducer";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { message, isAuthenticated } = useAppSelector((state) => state.user);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      dispatch(userLogin({ username, password }));
    } catch (error) {
      setErrorMessage(message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="../feed" />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen auth-view bg-white">
      <form
        onSubmit={handleSubmit}
        className="mt-4 w-96 max-w-md text-center bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-2">Sign in to NOD/UM</h2>

        <div className="flex flex-col mt-4 justify-center items-center gap-3">
          <input
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 mb-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 mb-2 border rounded-md"
          />
          {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
          <button
            className="bg-black text-white w-full px-3 py-2 rounded-md"
            type="submit">
            Login
          </button>
        </div>
      </form>
      {message && (
        <div
          className=" mt-10 flex alert alert-danger text-red-600"
          role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default Login;

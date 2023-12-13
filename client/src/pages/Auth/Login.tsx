import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Implement your login logic here
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen auth-view bg-white">
      <form
        onSubmit={handleSubmit}
        className="mt-4 w-96 max-w-md text-center bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-2">Sign in to COMM+</h2>

        <div className="flex flex-col mt-4 justify-center items-center gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        {/* Navigate to Sign up page */}
        {/* <div className="toggle-text">
          {"Don't have an account? "}
          <span style={{ color: "blue" }}>Sign Up</span>
        </div> */}
      </form>
    </div>
  );
};

export default Login;

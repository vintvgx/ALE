import React, { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Implement your signup/login logic here
  };

  const theme = "dark"; // Replace with your theme logic

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen auth-view bg-white`}>
      <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">
          {isLogin ? "Sign in to Urban.AI" : "Welcome to Urban.AI"}
        </h2>
        {!isLogin && (
          <p className={"text-gray-600"}>Create an account to get started!</p>
        )}

        <div className="flex flex-col mt-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mb-2 border rounded-md"
            />
          )}
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
          {/* {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )} */}
          <button
            className={`bg-${theme} text-white w-full px-3 py-2 rounded-md`}
            type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
          {/* Other UI elements go here */}
        </div>
        <div
          className={`toggle-text toggle-text-light`}
          onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? (
            <>
              {"Don't have an account? "}
              <span style={{ color: "blue" }}>Sign Up</span>
            </>
          ) : (
            <>
              {"Have an account? "}
              <span style={{ color: "blue" }}>Log in</span>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignUp;

import React, { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Implement your logic to send a reset password link to the user's email
    // You can call an API or use other methods for this functionality

    // For demonstration purposes, we'll just show a success message
    setMessage(
      "An email with a reset link has been sent to your email address."
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

        <div className="flex flex-col mt-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 mb-2 border rounded-md"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
          <button
            className="bg-blue-500 text-white w-full px-3 py-2 rounded-md"
            type="submit">
            Send Reset Link
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;

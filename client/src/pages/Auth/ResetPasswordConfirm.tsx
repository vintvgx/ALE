import React, { useState } from "react";

const ResetPasswordConfirm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Implement your logic to confirm and reset the password
    // You can call an API or use other methods for this functionality

    // For demonstration purposes, we'll just show a success message
    setMessage("Your password has been successfully reset.");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

        <div className="flex flex-col mt-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 mb-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 mb-2 border rounded-md"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
          <button
            className="bg-blue-500 text-white w-full px-3 py-2 rounded-md"
            type="submit">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordConfirm;

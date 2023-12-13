import React, { useState } from "react";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Implement your change password logic here
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>

        <div className="flex flex-col mt-4 gap-3">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 mb-2 border rounded-md"
          />
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
          <button
            className="bg-black text-white w-full px-3 py-2 rounded-md"
            type="submit">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;

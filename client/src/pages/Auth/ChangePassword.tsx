import React, { useState } from "react";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/user/AuthReducer";
import { ChangePasswordPayload } from "../../models/userModel";
import { Navigate } from "react-router-dom";

const ChangePassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    // Create the payload to be sent to the changePassword action
    const payload: ChangePasswordPayload = {
      newPassword1: newPassword,
      newPassword2: confirmPassword,
      oldPassword: currentPassword,
    };

    // Dispatch the changePassword action with the payload
    dispatch(changePassword(payload));
  };

  if (!isAuthenticated && !localStorage.getItem("access")) {
    return <Navigate to="../login" />;
  }

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

import React from "react";
import { UserModel } from "../models/userModel";

const UserView: React.FC<UserModel> = ({ pk, username, email, avatar }) => {
  return (
    <div>
      <h2>User Details</h2>
      <p>ID: {pk}</p>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      {avatar && (
        <div>
          <p>Avatar:</p>
          <img
            src={avatar}
            alt={`Avatar of ${username}`}
            style={{ maxWidth: "200px", borderRadius: "420px" }}
          />
        </div>
      )}
    </div>
  );
};

export default UserView;

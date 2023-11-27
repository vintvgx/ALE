import React from "react";
import { User } from "../models/userModel";

const UserView: React.FC<User> = ({ id, username, email, bio, avatar }) => {
  return (
    <div>
      <h2>User Details</h2>
      <p>ID: {id}</p>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <p>Bio: {bio}</p>
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

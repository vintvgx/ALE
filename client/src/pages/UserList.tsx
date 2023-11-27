import React, { useEffect, useState } from "react";
import axios from "axios";
import UserView from "../components/UserView";
import { User } from "../models/userModel";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null); // State to track errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("An error occurred while fetching users.");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {error ? (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      ) : (
        users.map((user) => <UserView key={user.id} {...user} />)
      )}
    </div>
  );
};

export default UserList;

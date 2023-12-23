import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Layout, Menu } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./NavBar.css";
import { userLogout } from "../../redux/user/AuthReducer";
const { Header } = Layout;

export const NavBar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    console.log("🚀 ~ file: NavBar.tsx:15 ~ user:", user);
  });

  const userMenu = (
    <Menu>
      <Menu.Item key="settings" onClick={() => navigate("/settings")}>
        Settings
      </Menu.Item>
      <Menu.Item
        key="change-password"
        onClick={() => navigate("/change-password")}>
        Change Password
      </Menu.Item>
      <Menu.Item
        key="logout"
        onClick={() => {
          dispatch(userLogout());
        }}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="flex fixed w-screen z-20 backdrop-filter backdrop-blur-md justify-between bg-transparent">
      <span
        onClick={() => navigate("/feed")}
        className="text-black text-xl self-center cursor-pointer">
        NOD/UM
      </span>
      <div className="">
        {/* Conditional rendering for login/join buttons */}
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        className="bg-transparent outline-none border-0 no-underline-menu ant-menu-item-selected custom-menu" // Updated class name
        defaultSelectedKeys={["2"]}>
        {isAuthenticated ? (
          <div className="w-22">
            <Menu.Item key="feed" onClick={() => navigate("/feed")}>
              Feed
            </Menu.Item>
            <Menu.Item key="library" onClick={() => navigate("/library")}>
              Library
            </Menu.Item>
            <Menu.Item key="messenger" onClick={() => navigate("/messenger")}>
              Messenger
            </Menu.Item>

            <Dropdown overlay={userMenu} trigger={["click"]}>
              <Menu.Item key="avatar">
                <Avatar src={user?.avatar} />
              </Menu.Item>
            </Dropdown>
          </div>
        ) : (
          <div>
            <Menu.Item key="login" onClick={() => navigate("/login")}>
              Login
            </Menu.Item>
            <Menu.Item key="sign-up" onClick={() => navigate("/sign-up")}>
              Sign Up
            </Menu.Item>
          </div>
        )}
      </Menu>
    </Header>
  );
};

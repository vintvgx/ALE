import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Layout, Menu } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./NavBar.css";
import { userLogout } from "../../redux/user/AuthReducer";
import { Topic } from "../../models/blogPostModel";
import TopicFadeSlider from "../BlogList/TopicFadeSlider";
import { setSelectedTopic } from "../../redux/posts/BlogPostReducer";
import { useLocation } from "react-router-dom";
const { Header } = Layout;

interface NavBarProps {
  topics: Topic[];
  onPublish: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ topics, onPublish }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const { selectedTopic } = useAppSelector((state) => state.blogPost);

  const isFeedView = location.pathname === "/feed" || location.pathname === "/";
  const isCreatePostView = location.pathname === "/create-post";
  const [showTopic, setShowTopic] = useState(true);

  const handleTopicSelect = (topicId: number) => {
    dispatch(setSelectedTopic(topicId));
  };

  useEffect(() => {
    if (!isFeedView) {
      setShowTopic(false);
    } else {
      setShowTopic(true);
    }
  }, [isFeedView, user]);

  const getUserInitials = (firstName: string, lastName: string | null) => {
    return `${firstName?.charAt(0).toUpperCase()}${lastName
      ?.charAt(0)
      .toUpperCase()}`;
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate("/profile")}>
        Profile
      </Menu.Item>
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

  const PublishButton = () => (
    <Button type="primary" onClick={onPublish}>
      Publish
    </Button>
  );

  return (
    <Header className="flex fixed w-screen z-20 backdrop-filter backdrop-blur-md justify-between bg-transparent">
      <span
        onClick={() => navigate("/feed")}
        className="text-black text-xl self-center cursor-pointer">
        NOD/UM
      </span>
      <div className=" justify-center self-center   ">
        {showTopic && (
          <TopicFadeSlider
            topics={topics}
            selectedTopic={selectedTopic}
            onTopicSelect={handleTopicSelect}
          />
        )}
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        className="bg-transparent outline-none border-0 no-underline-menu ant-menu-item-selected custom-menu" // Updated class name
        defaultSelectedKeys={["2"]}>
        {user && isAuthenticated ? (
          isCreatePostView ? (
            <div>
              <PublishButton />
              <Dropdown
                className="ml-20"
                overlay={userMenu}
                trigger={["click"]}>
                <Menu.Item key="avatar">
                  {user?.avatar ? (
                    <Avatar src={user.avatar} />
                  ) : (
                    <Avatar>
                      <span className=" text-xl text-black z-1">
                        {getUserInitials(user.first_name, user?.last_name)}
                      </span>
                    </Avatar>
                  )}
                </Menu.Item>
              </Dropdown>
            </div>
          ) : (
            <div className="w-22">
              <Menu.Item
                key="feed"
                className="bg-transparent"
                onClick={() => navigate("/feed")}>
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
                  {user?.avatar ? (
                    <Avatar src={user.avatar} />
                  ) : (
                    <Avatar>
                      <span className=" text-md text-white ">
                        {getUserInitials(user.first_name, user?.last_name)}
                      </span>
                    </Avatar>
                  )}
                </Menu.Item>
              </Dropdown>
            </div>
          )
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

// ProfileView.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { fetchUserBlogPosts } from "../../redux/posts/BlogPostReducer";
import { Topic } from "../../models/blogPostModel";
import ProfileBlogList from "../../components/ProfileBlogList";
import TopicsSlider from "../../components/TopicsSlider";
import { Avatar } from "antd";
import { Navigate } from "react-router-dom";

const profileTopics: Topic[] = [
  { id: 1, name: "Home" },
  { id: 2, name: "List" },
  { id: 3, name: "About" },
];

const ProfileView = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const { userBlogPosts } = useAppSelector((state) => state.blogPost);

  const [selectedTopic, setSelectedTopic] = useState<number | undefined>(1);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUserBlogPosts(user?.id));
    };

    if (userBlogPosts.length === 0) {
      fetchData();
    }
  }, [dispatch, user?.id, selectedTopic, userBlogPosts]);

  useEffect(() => {
    console.log(user);
    console.log(userBlogPosts);
  });

  const handleTopicSelect = (topicId: number) => {
    setSelectedTopic(topicId);
  };

  if (!isAuthenticated) {
    return <Navigate to="../login" />;
  }

  return (
    <div className="container mx-auto p-4 h-screen flex">
      <div className="flex-1 mt-40">
        <h1 className="text-4xl font-bold mb-4">
          {user?.first_name} {user?.last_name}
        </h1>
        <ProfileBlogList topics={profileTopics} blogs={userBlogPosts} />
      </div>
      <div className="w-1/4 flex mt-40 flex-col items-center">
        <Avatar src={user?.avatar} size={150} />
        <div className="bio">{/* Bio information goes here */}</div>
      </div>
    </div>
  );
};

export default ProfileView;

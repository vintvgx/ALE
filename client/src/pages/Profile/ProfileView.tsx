// ProfileView.jsx
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { fetchUserBlogPosts } from "../../redux/posts/BlogPostReducer";
import { Topic } from "../../models/blogPostModel";
import ProfileBlogList from "../../components/ProfileBlogList";
import TopicsSlider from "../../components/TopicsSlider";

const profileTopics: Topic[] = [
  { id: 1, name: "Home" },
  { id: 2, name: "List" },
  { id: 3, name: "About" },
];

const ProfileView = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { userBlogPosts } = useAppSelector((state) => state.blogPost);

  const [selectedTopic, setSelectedTopic] = useState<number | undefined>(1);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUserBlogPosts(user?.pk));
    };

    if (userBlogPosts.length === 0) {
      fetchData();
    }
  }, [dispatch, user?.pk, selectedTopic, userBlogPosts]);

  const handleTopicSelect = (topicId: number) => {
    setSelectedTopic(topicId);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="">
        <ProfileBlogList topics={profileTopics} blogs={userBlogPosts} />
      </div>
    </div>
  );
};

export default ProfileView;

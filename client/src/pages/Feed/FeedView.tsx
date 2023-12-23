import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar";
import BlogList from "../../components/BlogList";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import PlusIcon from "../../components/AddPostBtn";
import { fetchBlogPosts, fetchTopics } from "../../redux/posts/BlogPostReducer";
import TopicFadeSlider from "../../components/TopicFadeSlider";
import BlogPostCard from "../../components/BlogPostCard";

const FeedView = () => {
  const dispatch: AppDispatch = useDispatch();
  const { topics, blogPosts } = useAppSelector((state) => state.blogPost);
  const [selectedTopic, setSelectedTopic] = useState(1);
  const { user } = useAppSelector((state) => state.user);

  const filteredBlogs = blogPosts.filter(
    (blog) => blog.topic.id === selectedTopic
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTopics());
      await dispatch(fetchBlogPosts());
    };

    if (topics.length === 0 && blogPosts.length === 0) {
      fetchData();
    }
  }, [blogPosts, dispatch, topics]);

  return (
    <div className="w-screen p-4">
      {/* <TopicFadeSlider
        topics={topics}
        selectedTopic={selectedTopic}
        onTopicSelect={setSelectedTopic}
      /> */}
      {/* <div className="w-full p-4">
        {filteredBlogs.map((blog) => (
          <BlogPostCard key={blog.title} blog={blog} />
        ))}
      </div> */}

      <BlogList blogs={blogPosts} topics={topics} />

      <div className="fixed bottom-8 right-8">
        <PlusIcon />
      </div>
    </div>
  );
};

export default FeedView;

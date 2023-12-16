import React, { useEffect } from "react";
import Navbar from "../../components/NavBar";
import BlogList from "../../components/BlogList";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import PlusIcon from "../../components/AddPostBtn";
import { getUser, verify } from "../../redux/user/AuthReducer";
import { fetchBlogPosts, fetchTopics } from "../../redux/posts/BlogPostReducer";

const FeedView = () => {
  const dispatch: AppDispatch = useDispatch();

  const { topics, blogPosts } = useAppSelector((state) => state.blogPost);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTopics());
      await dispatch(fetchBlogPosts());
    };

    if (topics.length === 0 && blogPosts.length === 0) {
      fetchData();
    }

    console.log(
      "🚀 ~ file: FeedView.tsx:13 ~ FeedView ~ blogPosts:",
      blogPosts,
      blogPosts.length
    );
    console.log(
      "🚀 ~ file: FeedView.tsx:13 ~ FeedView ~ topics:",
      topics,
      topics.length
    );
  }, []); // Empty dependency array

  // if (blogPosts.length !== 0) console.log(blogPosts);

  return (
    <div className="w-screen p-4">
      <Navbar
        title="Feed"
        searchPlaceholder="Search for blogs"
        searchBox={true}
        notifications={true}
        profile={true}
      />
      <BlogList topics={topics} blogs={blogPosts} />
      <PlusIcon />
    </div>
  );
};

export default FeedView;

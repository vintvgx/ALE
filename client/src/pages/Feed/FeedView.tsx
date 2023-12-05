import React, { useEffect } from "react";
import Navbar from "../../components/NavBar";
import BlogList from "../../components/BlogList";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import {
  fetchBlogPosts,
  fetchTopics,
  getBlogPosts,
} from "../../redux/posts/blogPostSlice";
import PlusIcon from "../../components/AddPostBtn";

const FeedView = () => {
  const dispatch: AppDispatch = useDispatch();

  const { topics, blogPosts, isLoading, isError } = useAppSelector(
    ({ blogList }) => blogList
  );

  useEffect(() => {
    dispatch(fetchTopics());
    dispatch(fetchBlogPosts());
  }, [dispatch]);

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

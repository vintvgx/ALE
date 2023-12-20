import React, { useEffect } from "react";
import Navbar from "../../components/NavBar";
import BlogList from "../../components/BlogList";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import PlusIcon from "../../components/AddPostBtn";
import { fetchBlogPosts, fetchTopics } from "../../redux/posts/BlogPostReducer";

const FeedView = () => {
  const dispatch: AppDispatch = useDispatch();
  const { topics, blogPosts } = useAppSelector((state) => state.blogPost);
  const { user } = useAppSelector((state) => state.user);

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
    <div className="container mx-auto p-4">
      <Navbar
        title="Feed"
        searchPlaceholder="Search for blogs"
        searchBox={true}
        notifications={user ? true : false}
        profile={user ? true : false}
      />
      <div className="">
        <BlogList topics={topics} blogs={blogPosts} />
      </div>
      <div className="fixed bottom-8 right-8">
        <PlusIcon />
      </div>
    </div>
  );
};

export default FeedView;

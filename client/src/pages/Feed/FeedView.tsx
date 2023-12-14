import React, { useEffect } from "react";
import Navbar from "../../components/NavBar";
import BlogList from "../../components/BlogList";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import PlusIcon from "../../components/AddPostBtn";
import { getUser, verify } from "../../redux/user/AuthReducer";

const FeedView = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, isAuthenticated, access, refresh, message } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    console.log("message:", message);
    console.log("refresh:", refresh);
    console.log("access:", access);
    console.log("isAuthenticated:", isAuthenticated);
    console.log("user:", user);
  });

  useEffect(() => {
    dispatch(verify());
    dispatch(getUser());
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
      {/* <BlogList topics={topics} blogs={blogPosts} /> */}
      <PlusIcon />
    </div>
  );
};

export default FeedView;

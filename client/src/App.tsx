import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import FeedView from "./pages/Feed/FeedView";
import LibraryView from "./pages/Library/LibraryView";
import SettingsView from "./pages/Settings/SettingsView";
import MessengerView from "./pages/Messenger/MessengerView";
import ProfileView from "./pages/Profile/ProfileView";
import CreatePostView from "./pages/CreatePost/CreatePostView";
import SidebarView from "./components/SidebarView";
import "react-loading-skeleton/dist/skeleton.css";
import EmailVerification from "./pages/Auth/EmailVerification";
import ResetPasswordConfirm from "./pages/Auth/ResetPasswordConfirm";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import ChangePassword from "./pages/Auth/ChangePassword";

import { getUser, verify } from "./redux/user/AuthReducer";
import { AppDispatch, useAppSelector } from "./redux/store";
import { useDispatch } from "react-redux";
import BlogPostDetail from "./components/BlogPostDetail";

const App: React.FC = () => {
  const hideSidebarOnCreatePost = window.location.pathname === "/create-post";
  const dispatch: AppDispatch = useDispatch();
  const { user, isAuthenticated, access, refresh, message } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(verify());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="flex">
          {!hideSidebarOnCreatePost && <SidebarView />}
          <Routes>
            <Route path="/" element={<FeedView />} />
            <Route path="/feed" element={<FeedView />} />
            <Route path="/library" element={<LibraryView />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="/messenger" element={<MessengerView />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/create-post" element={<CreatePostView />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route
              path="dj-rest-auth/registration/account-confirm-email/:key/"
              Component={EmailVerification}></Route>
            <Route
              path="reset/password/confirm/:uid/:token"
              Component={ResetPasswordConfirm}></Route>
            <Route path="/blog/:id" Component={BlogPostDetail} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

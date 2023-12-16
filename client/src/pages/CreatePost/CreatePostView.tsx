import React, { useState } from "react";
import Editor from "../../utils/Editor/Editor";
import EditorTextParser from "../../utils/Editor/EditorTextParser";
import { OutputData } from "@editorjs/editorjs";
import { exampleData, placeholder } from "../../utils/Editor/ExampleData";
import "./CreatePost.css";
import Editorv2 from "../../utils/Editor/Editorv2";
import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";
import { Navigate, useNavigate } from "react-router-dom";
import { Topic } from "../../models/blogPostModel";
import {
  fetchBlogPosts,
  fetchTopics,
  postBlogPost,
} from "../../redux/posts/BlogPostReducer";
import { UserModel } from "../../models/userModel";

const CreatePostView = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [data, setData] = useState<OutputData>(placeholder);

  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const { isLoading, isError } = useAppSelector((state) => state.blogPost);

  const handleSubmit = async () => {
    if (!title || !data) {
      // Check if title and data are set
      alert("Please enter a title and content before submitting.");
      return;
    }

    try {
      await dispatch(postBlogPost(title, data, user as UserModel));
      // If postBlogPostSuccess is returned
      setTitle("");
      setData(placeholder);
      await dispatch(fetchTopics());
      await dispatch(fetchBlogPosts());
      navigate("../feed");
    } catch (error) {
      // If there is an error
      alert("Error submitting post. Please try again.");
      console.error("Error submitting post:", error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="../login" />;
  }

  return (
    <div className="flex flex-col w-screen h-screen">
      <button onClick={handleSubmit} className=" self-end mr-4 mt-3">
        SUBMIT
      </button>
      <div className="flex flex-col justify-center m-auto bg-gray-100 mt-20">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="text-5xl font-semibold mb-4"
          style={{ outline: "none" }}
        />
        <Editor data={data} setData={setData} />
      </div>
    </div>
  );
};

export default CreatePostView;

import React, { useState, ChangeEvent } from "react";
import Editor from "../../utils/Editor/Editor";
import { OutputData } from "@editorjs/editorjs";
import { placeholder } from "../../utils/Editor/ExampleData";
import "./CreatePost.css";
import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";
import { Navigate, useNavigate } from "react-router-dom";
import {
  fetchBlogPosts,
  fetchTopics,
  postBlogPost,
} from "../../redux/posts/BlogPostReducer";
import { UserModel } from "../../models/userModel";
import { Image } from "antd";
import { Topic } from "../../models/blogPostModel";

const CreatePostView = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [data, setData] = useState<OutputData>(placeholder);
  const [coverImage, setCoverImage] = useState<File | undefined>(undefined);

  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const { isLoading, isError } = useAppSelector((state) => state.blogPost);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCoverImage(file);
  };

  const handleSubmit = async () => {
    if (!title || !data) {
      alert("Please enter a title and content before submitting.");
      return;
    }

    try {
      const topic: Topic = { id: 1, name: "Option" };

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", JSON.stringify(data));
      formData.append("cover", coverImage || ""); // Ensure it's not null
      formData.append("topic", topic.id.toString());

      console.log(
        "FormData content from CreateView:",
        Array.from(formData.entries())
      );

      await dispatch(postBlogPost(formData, user as UserModel));
      // setTitle("");
      // setData(placeholder);
      // setCoverImage(undefined);
      // await dispatch(fetchTopics());
      // await dispatch(fetchBlogPosts());
      // navigate("../feed");
    } catch (error) {
      alert("Error submitting post. Please try again.");
      console.error("Error submitting post:", error);
      console.log(isError);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="../login" />;
  }

  return (
    <div className="flex flex-col w-screen h-full bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="flex justify-end m-4">
        <button
          onClick={handleSubmit}
          className="bg-white text-purple-600 font-bold py-2 px-4 rounded-full">
          SUBMIT
        </button>
      </div>
      <div className="flex flex-col justify-center w-2/4 m-auto bg-white p-8 rounded-lg shadow-lg mb-10">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="text-4xl font-semibold mb-4 p-2 rounded focus:outline-none"
        />
        <label htmlFor="imageInput" className="mb-2 text-lg font-semibold">
          Choose a Cover Image:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="imageInput"
          className="mb-4"
        />
        {coverImage && (
          <Image
            src={URL.createObjectURL(coverImage)}
            alt="Cover"
            className=" max-w-full h-auto rounded"
          />
        )}
        <Editor data={data} setData={setData} />
      </div>
    </div>
  );
};

export default CreatePostView;

import React, { useState, ChangeEvent } from "react";
import { Modal, Row, Col, Input, Button } from "antd";
import Editor from "../../utils/Editor/Editor";
import { OutputData } from "@editorjs/editorjs";
import { placeholder } from "../../utils/Editor/ExampleData";
import "./CreatePost.css";
import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";
import { Navigate, useNavigate } from "react-router-dom";
import { Progress } from "antd";
import {
  fetchBlogPosts,
  fetchTopics,
  postBlogPost,
  updateProgress, // Import the updateProgress action
} from "../../redux/posts/BlogPostReducer";
import { UserModel } from "../../models/userModel";
import { Image } from "antd";
import { Topic } from "../../models/blogPostModel";
import CreateModal from "../../components/CreateModal";

const CreatePostView = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [data, setData] = useState<OutputData | undefined>(placeholder);
  const [selectedTopic, setSelectedTopic] = useState<Topic | undefined>(
    undefined
  );

  const [coverImage, setCoverImage] = useState<File | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const { isLoading, isError, progress, topics } = useAppSelector(
    (state) => state.blogPost
  );

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCoverImage(file);
    console.log(file);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    // existing validation and dispatch logic...

    showModal();
  };

  const handlePublish = async () => {
    if (!title || !data) {
      alert("Please enter a title and content before submitting.");
      return;
    }

    if (user && user.id) {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", JSON.stringify(data));
        formData.append("cover", coverImage || "");
        formData.append("topic", selectedTopic?.id?.toString() || "2");
        formData.append("user", user?.id?.toString());
        dispatch(updateProgress(0));

        await dispatch(postBlogPost(formData, user as UserModel));
        setTitle("");
        setData(placeholder);
        setCoverImage(undefined);
        await dispatch(fetchTopics());
        await dispatch(fetchBlogPosts());
        navigate("../feed");
      } catch (error) {
        alert("Error submitting post. Please try again.");
        console.error("Error submitting post:", error);
        console.log(isError);
      }
    } else {
      alert("Please login before submitting a post.");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="../login" />;
  }

  return (
    <div className="flex flex-col w-screen h-full bg-gradient-to-r from-blue-500 to-purple-600">
      {/* Progress bar container */}
      {/* <div className="fixed top-25 left-4 z-50">
        <Progress
          percent={progress}
          status={isLoading ? "active" : "normal"}
          width={300}
        />
      </div> */}

      <div className="flex justify-end m-4 mt-20">
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
        {/* <label htmlFor="imageInput" className="mb-2 text-lg font-semibold">
          Choose a Cover Image:
        </label> */}
        {/* <input
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
        )} */}
        <Editor data={data} setData={setData} />
      </div>
      <CreateModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handlePublish={handlePublish}
        handleImageChange={onImageChange}
        coverImage={coverImage}
        setCoverImage={setCoverImage}
        title={title}
        setTitle={setTitle}
        topics={topics}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        user={user}
      />
    </div>
  );
};

export default CreatePostView;

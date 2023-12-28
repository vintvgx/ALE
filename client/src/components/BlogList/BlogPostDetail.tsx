import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BlogPost } from "../../models/blogPostModel";
import {
  fetchBlogPostById,
  resetDetailPost,
  deleteBlogPostById,
  fetchBlogPosts,
  fetchTopics,
} from "../../redux/posts/BlogPostReducer";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import EditorTextParser from "../../utils/Editor/EditorTextParser";
import { OutputData } from "@editorjs/editorjs";
import { Spin, Modal } from "antd";
import { formatDateToMonthDay } from "../../utils/clock";
import EditProfileDetailView from "../../pages/Profile/EditProfileDetailView";

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const [editable, setEditable] = useState<boolean>(false);
  var formattedDateMonthDay = "";
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [blogContent, setBlogContent] = useState<OutputData | undefined>(
    undefined
  );

  const { user } = useAppSelector((state) => state.user);
  const { detailPost, isLoading } = useAppSelector((state) => state.blogPost);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedPost: BlogPost) => {
    // Handle saving the updated post, update state, etc.
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchPostDetail = async () => {
      const postId = Number(id);
      await dispatch(fetchBlogPostById(postId));
    };

    if (!detailPost) {
      fetchPostDetail();
    }
  }, [dispatch, id, detailPost]);

  useEffect(() => {
    return () => {
      console.log("Component is unmounted. Cleanup code here.");
      dispatch(resetDetailPost());
    };
  }, [dispatch]);

  useEffect(() => {
    if (detailPost?.content) {
      const data =
        typeof detailPost.content === "string"
          ? JSON.parse(detailPost.content)
          : detailPost.content;

      setBlogContent(data);
    }
  }, [detailPost]);

  useEffect(() => {
    if (
      detailPost?.user?.id === user?.id &&
      detailPost?.user?.id !== undefined &&
      user?.id !== undefined
    ) {
      setEditable(true);
    }
  }, [detailPost, editable, user]);

  const handleDelete = useCallback(async () => {
    const postId = Number(id);
    await dispatch(deleteBlogPostById(postId));
    await dispatch(fetchTopics());
    await dispatch(fetchBlogPosts());
    navigate("../feed");
  }, [dispatch, id, navigate]);

  const showDeleteConfirmation = useCallback(() => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this blog post?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: handleDelete,
    });
  }, [handleDelete]);

  if (detailPost?.created_at)
    formattedDateMonthDay = formatDateToMonthDay(detailPost?.created_at);

  if (isLoading) {
    return (
      <div className="container mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-center h-48">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (detailPost === undefined) {
    return (
      <div className="container mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">
        <div className="text-center">Blog post not found</div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <EditProfileDetailView
        date={formattedDateMonthDay}
        detailPost={detailPost}
        blogContent={blogContent}
        setBlogContent={setBlogContent}
        onSave={handleSave}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <div className="container mx-auto my-8 p-4 bg-white shadow-lg mt-40 rounded-lg">
      <div className="flex flex-row justify-center items-center mt-10 text-md">
        <span>{formattedDateMonthDay}</span>
        <span className="text-lg mx-4">•</span>
        <span>
          Written By {detailPost?.user?.first_name}{" "}
          {detailPost?.user?.last_name}
        </span>
      </div>
      <div className="flex flex-row justify-center items-center mt-10 text-6xl font-medium">
        <span>{detailPost?.title}</span>
      </div>
      <div className="flex flex-row justify-center items-center mt-20">
        <img
          src={detailPost.cover?.toString() || ""} // assuming detailPost has a cover property
          alt={detailPost.title}
          className=" w-6/12 h-auto object-cover rounded-lg mb-4"
        />
      </div>
      <div className="flex justify-center mt-20">
        <div className="self-center items-center w-6/12 min-h-screen">
          {blogContent ? (
            <EditorTextParser data={blogContent} />
          ) : (
            <div className="flex items-center justify-center h-48">
              <Spin size="large" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BlogPost } from "../models/blogPostModel";
import {
  fetchBlogPostById,
  resetDetailPost,
  deleteBlogPostById,
  fetchBlogPosts,
} from "../redux/posts/BlogPostReducer";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import EditorJS from "@editorjs/editorjs";
import EditorTextParser from "../utils/Editor/EditorTextParser";
import { OutputData } from "@editorjs/editorjs";
import { Avatar, Spin, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { formatDateToMonthDay } from "../utils/clock";

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const [editable, setEditable] = useState<boolean>(false);
  const [blogContent, setBlogContent] = useState<OutputData | undefined>(
    undefined
  );
  var formattedDateMonthDay = "";
  const navigate = useNavigate();

  const { detailPost, isError, isLoading } = useAppSelector(
    (state) => state.blogPost
  );

  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchPostDetail = async () => {
      const postId = Number(id);
      await dispatch(fetchBlogPostById(postId));
    };

    if (!detailPost) {
      fetchPostDetail();
    }
    console.log(
      "🚀 ~ file: BlogPostDetail.tsx:42 ~ useEffect ~ detailPost:",
      detailPost
    );
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
    console.log(user?.pk, " ***** ", detailPost?.user?.id);
    if (
      detailPost?.user?.id === user?.pk &&
      detailPost?.user?.id !== undefined &&
      user?.pk !== undefined
    ) {
      setEditable(true);
    }
  }, [detailPost, editable, user]);

  const handleDelete = useCallback(async () => {
    const postId = Number(id);
    await dispatch(deleteBlogPostById(postId));
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

  return (
    <div className="container mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">
      <div className="mb-4">
        <img
          src={detailPost.cover?.toString() || ""} // assuming detailPost has a cover property
          alt={detailPost.title}
          className="w-full h-80 object-cover rounded-lg mb-4"
        />

        <div className="mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">{detailPost.title}</h1>
            <p className="text-gray-500 mb-2">
              Published on {formattedDateMonthDay}
            </p>
            {editable && (
              <div className="flex mb-4">
                <Button
                  type="default"
                  shape="round"
                  icon={<EditOutlined />}
                  className="mr-2">
                  Edit
                </Button>
                <Button
                  type="default"
                  shape="round"
                  icon={<DeleteOutlined />}
                  onClick={showDeleteConfirmation}>
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <Avatar
              size={40}
              src={detailPost.user?.avatar} // assuming detailPost has a user property
              alt={detailPost.user?.username}
            />
            <span className="ml-2 text-sm">{detailPost.user?.username}</span>
          </div>
        </div>
      </div>
      <div className="prose max-w-full w-full min-h-screen">
        {blogContent ? (
          <EditorTextParser data={blogContent} />
        ) : (
          <div className="flex items-center justify-center h-48">
            <Spin size="large" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostDetail;

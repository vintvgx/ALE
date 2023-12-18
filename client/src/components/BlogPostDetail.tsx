import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogPost } from "../models/blogPostModel";
import {
  fetchBlogPostById,
  resetDetailPost,
} from "../redux/posts/BlogPostReducer";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import EditorJS from "@editorjs/editorjs";
import EditorTextParser from "../utils/Editor/EditorTextParser";
import { OutputData } from "@editorjs/editorjs";

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorCore = useRef<EditorJS | null>(null);

  const handleInitialize = useCallback((instance: EditorJS) => {
    // Set reference to editor
    editorCore.current = instance;
  }, []);

  const [contentObject, setContentObject] = useState<OutputData | undefined>(
    undefined
  );
  const { detailPost, isError, isLoading } = useAppSelector(
    (state) => state.blogPost
  );

  useEffect(() => {
    const fetchPostDetail = async () => {
      const postId = Number(id);
      await dispatch(fetchBlogPostById(postId));
    };

    if (!detailPost) {
      fetchPostDetail();
    }
    console.log("🚀 ~ file: BlogPostDetail.tsx:29 ~ detailPost:", detailPost);
    console.log(
      "🚀 ~ file: BlogPostDetail.tsx:29 ~ detailPost content:",
      detailPost?.content
    );
  }, [dispatch, id, detailPost]);

  useEffect(() => {
    return () => {
      // Code to run when the component is unmounted
      console.log("Component is unmounted. Cleanup code here.");
      dispatch(resetDetailPost());
    };
  }, []);

  useEffect(() => {
    const initializeEditor = async (initialData: any) => {
      if (!editorCore.current) {
        const data =
          typeof initialData === "string"
            ? JSON.parse(initialData)
            : initialData;

        const editor = new EditorJS({
          holder: "editorjs",
          readOnly: true,
          data,
        });

        handleInitialize(editor);
      }
    };

    initializeEditor(detailPost?.content);
  }, [handleInitialize]);

  if (isLoading) {
    // Optional: You can add a loading spinner or message while the data is being fetched
    return <div>Loading...</div>;
  }

  if (detailPost === undefined) {
    // Handle the case where the blog post is not found
    return <div>Blog post not found</div>;
  }

  return (
    <div className="flex flex-col items-center mt-10 h-screen auth-view bg-white">
      {/* Render the detailed view of the blog post */}
      <h1>{detailPost.title}</h1>
      {/* <div id="editorjs" className="max-w-full w-full min-h-screen" /> */}
    </div>
  );
};

export default BlogPostDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogPost } from "../models/blogPostModel";
import {
  fetchBlogPostById,
  resetDetailPost,
} from "../redux/posts/BlogPostReducer";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import EditorTextParser from "../utils/Editor/EditorTextParser";
import { OutputData } from "@editorjs/editorjs";

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();

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
      console.log("🚀 ~ file: BlogPostDetail.tsx:19 ~ detailPost:", detailPost);
    }
  }, [dispatch, id, detailPost]);

  useEffect(() => {
    return () => {
      // Code to run when the component is unmounted
      console.log("Component is unmounted. Cleanup code here.");
      dispatch(resetDetailPost());
    };
  }, []);

  // useEffect(() => {
  //   if (detailPost && detailPost.content) {
  //     // Parse the JSON string and set the OutputData
  //     setContentObject(JSON.parse(detailPost.content));
  //     console.log(
  //       "🚀 ~ file: BlogPostDetail.tsx:18 ~ contentObject:",
  //       contentObject
  //     );
  //   }
  // }, [contentObject, detailPost]);

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
      <div id="editor-container" style={{ width: "100%" }} />
      {/* Add other details you want to display */}

      {/* Initialize the EditorJS instance in read-only mode */}
      <script>
        {`
          const editor = new EditorJS({
            holder: "editor-container",
            readOnly: true,
            data: ${JSON.stringify(detailPost.content)}
          });
        `}
      </script>
    </div>
  );
};

export default BlogPostDetail;

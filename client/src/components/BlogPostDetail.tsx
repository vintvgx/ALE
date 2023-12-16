import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogPost } from "../models/blogPostModel";
import { fetchBlogPostById } from "../redux/posts/BlogPostReducer";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import EditorTextParser from "../utils/Editor/EditorTextParser";
import { OutputData } from "@editorjs/editorjs";

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [contentObject, setContentObject] = useState<OutputData | undefined>(
    undefined
  );
  const { detailPost, isError, isLoading } = useAppSelector(
    (state) => state.blogPost
  );

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const postId = Number(id);
        await dispatch(fetchBlogPostById(postId));
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();

    if (detailPost && detailPost.content) {
      // Parse the JSON string and set the OutputData
      setContentObject(JSON.parse(detailPost.content));
    }
  }, [id]);

  if (loading) {
    // Optional: You can add a loading spinner or message while the data is being fetched
    return <div>Loading...</div>;
  }

  if (!detailPost) {
    // Handle the case where the blog post is not found
    return <div>Blog post not found</div>;
  }

  return (
    <div className="flex flex-col items-center mt-10 h-screen  auth-view bg-white">
      {/* Render the detailed view of the blog post */}
      <h1>{detailPost.title}</h1>
      <EditorTextParser data={contentObject} />
      {/* Add other details you want to display */}
    </div>
  );
};

export default BlogPostDetail;

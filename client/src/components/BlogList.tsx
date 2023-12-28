// BlogList.jsx
import React, { useState } from "react";
import { BlogPost, Topic } from "../models/blogPostModel";
import BlogPostCard from "./BlogPostCard";
import TopicFadeSlider from "./TopicFadeSlider";
import { useAppSelector } from "../redux/store";

interface Posts {
  blogs: BlogPost[];
  topics: Topic[];
}

const BlogList: React.FC<Posts> = ({ topics, blogs }) => {
  const { selectedTopic } = useAppSelector((state) => state.blogPost);

  var filteredBlogs = blogs.filter((blog) => blog.topic.id === selectedTopic);

  // Sort blogs by the created_at date in descending order (latest first)
  filteredBlogs = filteredBlogs.sort((a, b) => {
    const dateA = new Date(a.created_at || "");
    const dateB = new Date(b.created_at || "");
    return dateB.getTime() - dateA.getTime(); // Latest first
  });

  return (
    <div className="w-full mt-20">
      <div className="">
        {/* Display Blogs for Selected Topic */}
        <div className="w-full grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <BlogPostCard key={blog.title} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;

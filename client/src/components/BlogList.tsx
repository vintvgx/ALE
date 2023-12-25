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

  const filteredBlogs = blogs.filter((blog) => blog.topic.id === selectedTopic);

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

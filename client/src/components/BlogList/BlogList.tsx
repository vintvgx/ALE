// BlogList.jsx
import React, { useState } from "react";
import { BlogPost, Topic } from "../../models/blogPostModel";
import BlogPostCard from "./BlogPostCard";
import Masonry from "react-masonry-css";
import TopicFadeSlider from "./TopicFadeSlider";
import { useAppSelector } from "../../redux/store";
import "./BlogList.css";

interface Posts {
  blogs: BlogPost[];
  topics: Topic[];
  isLoading: boolean;
}

/**
 * Displays the list of blogs by all users.
 *
 * Sorted by topic & latest date
 */
const BlogList: React.FC<Posts> = ({ topics, blogs, isLoading }) => {
  const { selectedTopic } = useAppSelector((state) => state.blogPost);

  var filteredBlogs = blogs.filter((blog) => blog.topic.id === selectedTopic);

  // Sort blogs by the created_at date in descending order (latest first)
  filteredBlogs = filteredBlogs.sort((a, b) => {
    const dateA = new Date(a.created_at || "");
    const dateB = new Date(b.created_at || "");
    return dateB.getTime() - dateA.getTime(); // Latest first
  });

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="w-full mt-20">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column">
        {filteredBlogs.map((blog) => (
          <BlogPostCard key={blog.title} blog={blog} isLoading={isLoading} />
        ))}
      </Masonry>
    </div>
  );
};

export default BlogList;

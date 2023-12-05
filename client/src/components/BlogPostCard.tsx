import React from "react";
import { BlogPost } from "../models/blogPostModel";
import { formatDateToMonthDay } from "../utils/clock";

interface BlogPostCardProps {
  blog: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ blog }) => {
  const formattedDateMonthDay = formatDateToMonthDay(blog.created_at);

  return (
    <div className="relative mb-6 p-6 text-left bg-white border-b-2 cursor-pointer">
      <div className="flex">
        {/* Blog Cover */}
        <div className="w-1/3 mr-6">
          {blog.cover && (
            <img
              src={
                typeof blog.cover === "string"
                  ? blog.cover
                  : URL.createObjectURL(blog.cover)
              }
              alt="Blog Cover"
              className="w-full h-40 object-cover rounded-md"
            />
          )}
        </div>

        {/* Blog Details */}
        <div className="flex flex-col justify-between w-2/3">
          {/* User Avatar */}
          {blog.author && (
            <div className="absolute top-2 right-2">
              {blog.author.avatar && (
                <img
                  src={blog.author.avatar}
                  alt="User Avatar"
                  className="w-8 h-8 object-cover rounded-full border-2 border-white"
                />
              )}
            </div>
          )}

          <div>
            <h1 className="text-2xl font-semibold mb-2">{blog.title}</h1>
            <p className="text-gray-800">
              {blog.content.length > 100
                ? `${blog.content.slice(0, 100)}...`
                : blog.content}
            </p>
          </div>

          <div className="mt-4">
            <p className="text-gray-600 text-sm">
              {/* {blog.author && (
                <span className="mr-2">Author: {blog.author.username}</span>
              )} */}
              {formattedDateMonthDay}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;

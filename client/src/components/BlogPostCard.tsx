import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "../models/blogPostModel";
import { formatDateToMonthDay } from "../utils/clock";

interface BlogPostCardProps {
  blog: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ blog }) => {
  var formattedDateMonthDay = "";

  if (blog.created_at)
    formattedDateMonthDay = formatDateToMonthDay(blog.created_at);

  // Parse the content string to a JavaScript object
  const [contentObject, setContentObject] = useState<{
    blocks: { data: { text: string } }[];
  }>();

  useEffect(() => {
    const isJsonString = (str: string) => {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    };

    if (isJsonString(blog.content)) {
      setContentObject(JSON.parse(blog.content));
    } else {
      setContentObject({ blocks: [{ data: { text: blog.content } }] });
    }
  }, [blog.content]);

  // ...

  <p className="w-2/3">
    {contentObject?.blocks?.[0]?.data?.text.slice(0, 20)}
  </p>;

  return (
    <Link to={`/blog/${blog.id}`}>
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
            {blog.user && (
              <div className="absolute top-2 right-2">
                {blog.user.avatar && (
                  <img
                    src={blog.user.avatar}
                    alt="User Avatar"
                    className="w-8 h-8 object-cover rounded-full border-2 border-white"
                  />
                )}
              </div>
            )}

            <div className="w-full">
              <h1 className="text-2xl font-semibold mb-2">{blog.title}</h1>
              <div className="text-gray-800 w-full">
                <p className="w-2/3">
                  {contentObject?.blocks?.[0]?.data?.text.slice(0, 20)}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-600 text-sm">
                {/* {blog.user && (
                  <span className="mr-2">Author: {blog.user.username}</span>
                )} */}
                {formattedDateMonthDay}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;

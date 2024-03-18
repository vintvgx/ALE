import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "../../models/blogPostModel";
import { formatDateToMMDDYY } from "../../utils/clock";
import Skeleton from "react-loading-skeleton";
import "./BlogList.css";

interface BlogPostCardProps {
  blog: BlogPost;
  isLoading?: boolean;
}

/**
 * Displays the blog post in card form
 */
const BlogPostCard: React.FC<BlogPostCardProps> = ({ blog, isLoading }) => {
  var formattedDateMonthDay = "";

  if (blog.created_at)
    formattedDateMonthDay = formatDateToMMDDYY(blog.created_at);

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

  return (
    <Link to={`/blog/${blog.id}`} className="block">
      <div className="relative mb-6 p-6 cursor-pointer text-center hover:shadow-lg transition-shadow duration-200 ease-in-out">
        <div className="flex flex-col items-center">
          {/* Blog Cover */}
          <div className="w-5/6">
            {isLoading ? (
              <Skeleton height={200} />
            ) : (
              blog.cover && (
                <img
                  src={
                    typeof blog.cover === "string"
                      ? blog.cover
                      : URL.createObjectURL(blog.cover)
                  }
                  alt="Blog Cover"
                  className="w-full h-auto object-cover"
                />
              )
            )}
          </div>
          <div className="mt-4">
            {isLoading ? (
              <Skeleton width={100} />
            ) : (
              <p className="text-gray-500 text-xs">{formattedDateMonthDay}</p>
            )}
          </div>

          {/* Blog Details */}
          <div className="mt-4 text-center w-full">
            {isLoading ? (
              <Skeleton height={30} width={300} />
            ) : (
              <h1 className="text-xl font-semibold mb-2">{blog.title}</h1>
            )}
            <div className="text-gray-800">
              {isLoading ? (
                <Skeleton count={3} />
              ) : (
                <p>{contentObject?.blocks?.[0]?.data?.text.slice(0, 100)}</p>
              )}
            </div>
            <div className="mt-6">
              <span className="text-gray-500 text-xs">Read More</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;

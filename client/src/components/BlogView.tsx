import React from "react";
import { BlogPost } from "../models/blogPostModel";
import Skeleton from "react-loading-skeleton";

const BlogView: React.FC<BlogPost> = ({
  title,
  content,
  cover,
  created_at,
  user,
}) => {
  //TODO create redux toolkit loading state and trigger displaying content
  //TODO once request has been filled
  const isLoading =
    !title || typeof cover !== "string" || !content || !created_at || !user;

  return (
    <div>
      <h2>Blog Post</h2>
      {isLoading ? (
        // Render skeleton loading animation for each property
        <div>
          <Skeleton height={20} width={200} />
          <Skeleton height={200} />
          <Skeleton height={100} width={200} />
          <Skeleton height={20} width={100} />
          <Skeleton height={20} width={150} />
        </div>
      ) : (
        // Render the actual blog content once data is available
        <>
          <h1>{title}</h1>
          {cover && typeof cover === "string" ? (
            <div>
              <p>Avatar:</p>
              <img
                src={cover}
                alt={"Not Found"}
                style={{ maxWidth: "200px", borderRadius: "420px" }}
              />
            </div>
          ) : null}
          <p>{content}</p>
          {/* Render other properties as needed */}
        </>
      )}
    </div>
  );
};

export default BlogView;

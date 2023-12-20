// BlogList.jsx
import React, { useState } from "react";
import { BlogPost, Topic } from "../models/blogPostModel";
import BlogPostCard from "./BlogPostCard";
import TopicsSlider from "./TopicsSlider";

interface Posts {
  blogs: BlogPost[];
  topics: Topic[];
}

const BlogList: React.FC<Posts> = ({ topics, blogs }) => {
  const [selectedTopic, setSelectedTopic] = useState(1);

  const filteredBlogs = blogs.filter((blog) => blog.topic.id === selectedTopic);

  return (
    <div className="flex justify-center items-center mx-52 z-0">
      <div className="flex flex-col items-start mt-44 w-9/12 ">
        {/* Topic Slider */}
        <TopicsSlider
          topics={topics}
          selectedTopic={selectedTopic}
          onTopicSelect={setSelectedTopic}
        />

        {/* Display Blogs for Selected Topic */}
        <div className="w-full p-4">
          {filteredBlogs.map((blog) => (
            <BlogPostCard key={blog.title} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;

// ProfileBlogList.jsx
import React, { useState } from "react";
import TopicsSlider from "./TopicsSlider";
import BlogPostCard from "../BlogList/BlogPostCard";
import { Topic } from "../../models/blogPostModel";
import { BlogPost } from "../../models/blogPostModel";

interface ProfileBlogListProps {
  topics: Topic[];
  selectedTopic: number | undefined;
  onTopicSelect: (topicId: number) => void;
  userBlogPosts: BlogPost[]; // Replace BlogPost with the actual type of your blog posts
}

interface Posts {
  blogs: BlogPost[];
  topics: Topic[];
}

const ProfileBlogList: React.FC<Posts> = ({ topics, blogs }) => {
  const [selectedTopic, setSelectedTopic] = useState(1);

  return (
    <div className="flex z-0">
      <div className="flex flex-col w-9/12 ">
        <TopicsSlider
          topics={topics}
          selectedTopic={selectedTopic}
          onTopicSelect={setSelectedTopic}
        />
        <div className="w-1/3 p-4">
          {selectedTopic === 1 && (
            <>
              {blogs.map((blogPost) => (
                <BlogPostCard key={blogPost.id} blog={blogPost} />
              ))}
            </>
          )}

          {selectedTopic === 3 && <p>Feature is not yet implemented</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileBlogList;

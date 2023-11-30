import React from "react";
import Navbar from "../../components/NavBar";
import BlogList from "../../components/BlogList";

const topics = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Science" },
  // Add more topics as needed
];

const blogs = [
  {
    id: 1,
    title: "Tech Blog 1",
    content: "Content for Tech Blog 1",
    topicId: 1,
  },
  {
    id: 2,
    title: "Science Blog 1",
    content: "Content for Science Blog 1",
    topicId: 2,
  },
  {
    id: 3,
    title: "Science Blog 2",
    content: "Content for Science Blog 1",
    topicId: 1,
  },
  // Add more blogs with corresponding topicId
];

const FeedView = () => {
  return (
    <div className="w-screen p-4">
      <Navbar
        title="Feed"
        searchPlaceholder="Search for blogs"
        searchBox={true}
        notifications={true}
        profile={true}
      />
      <BlogList topics={topics} blogs={blogs} />
    </div>
  );
};

export default FeedView;

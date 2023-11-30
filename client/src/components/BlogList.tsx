import React, { useState } from "react";

interface Topic {
  id: number;
  name: string;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  topicId: number;
}

interface BlogListProps {
  topics: Topic[];
  blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ topics, blogs }) => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]?.id);

  const filteredBlogs = blogs.filter((blog) => blog.topicId === selectedTopic);

  return (
    <div className="flex flex-col items-center mt-44 ">
      {/* Topic Slider */}
      <div className="flex space-x-4 p-4 overflow-x-scroll">
        {topics.map((topic) => (
          <button
            key={topic.id}
            className={`px-4 py-2 text-stone-300 ${
              selectedTopic === topic.id
                ? "text-zinc-950 border-b-2 border-b-black"
                : "bg-white"
            }`}
            onClick={() => setSelectedTopic(topic.id)}>
            {topic.name}
          </button>
        ))}
      </div>

      {/* Display Blogs for Selected Topic */}
      <div className="max-w-3xl w-full p-4">
        {filteredBlogs.map((blog) => (
          <div key={blog.id} className="mb-4 p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import BlogView from "./BlogView";
// import { BlogPost } from "../models/blogPostModel";

// const BlogList = () => {
//   const [blogs, setBlogs] = useState<BlogPost[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://127.0.0.1:8000/api/blogposts/"
//         );
//         setBlogs(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setError("An error occurred while fetching users.");
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Blog List</h1>
//       {error ? (
//         // Render error message if there is an error
//         <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
//       ) : (
//         // Render each blog post using the updated BlogView component
//         blogs.map((blog) => <BlogView key={blog.title} {...blog} />)
//       )}
//     </div>
//   );
// };

// export default BlogList;

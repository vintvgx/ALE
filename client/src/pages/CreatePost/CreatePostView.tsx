import React, { useState } from "react";
import AddPostContent from "../../components/AddPostContent";
import { BlogContent } from "../../models/blogPostModel";

const CreatePostView = () => {
  const [title, setTitle] = useState("");
  const [contentItems, setContentItems] = useState<BlogContent[]>([]);

  const handleAddPost = (newContentItem: BlogContent) => {
    setContentItems((prevContentItems: BlogContent[]) => [
      ...prevContentItems,
      newContentItem,
    ]);
  };

  const getTextSizeClass = (type: string) => {
    switch (type) {
      case "h1":
        return "text-3xl font-medium";
      case "h2":
        return "text-2xl font-medium";
      case "h3":
        return "text-xl font-medium";
      default:
        return "text-basic font-normal";
    }
  };

  return (
    <div className="m-14 mx-96">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="text-5xl font-semibold"
        style={{ outline: "none" }}
      />

      <div className="mt-10">
        <ul>
          {contentItems.map((item, index) => (
            <li key={index} className={getTextSizeClass(item.type)}>
              {item.value}
            </li>
          ))}
        </ul>
      </div>

      <AddPostContent onAddPost={handleAddPost} />
    </div>
  );
};

export default CreatePostView;

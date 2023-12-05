import React, { useState } from "react";
import { BlogContent } from "../models/blogPostModel";
import DropdownMenu from "./DropdownMenu";

interface AddPostProps {
  onAddPost: (post: BlogContent) => void;
}

const AddPostContent: React.FC<AddPostProps> = ({ onAddPost }) => {
  const [content, setContent] = useState("");
  const [contentType, setContentType] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [contentLevel, setContentLevel] = useState(1);
  const [contentAlt, setContentAlt] = useState("");
  const [contentCaption, setContentCaption] = useState("");
  const [previewContent, setPreviewContent] = useState("");

  const handleAddContent = () => {
    let newContentItem;

    switch (contentType) {
      case "text":
        newContentItem = { type: "text", value: content };
        break;
      case "header":
        newContentItem = {
          type: "header",
          level: contentLevel,
          value: contentValue,
        };
        break;
      case "h1":
        newContentItem = { type: "h1", value: content };
        break;
      case "h2":
        newContentItem = { type: "h2", value: content };
        break;
      case "h3":
        newContentItem = { type: "h3", value: content };
        break;
      case "image":
        newContentItem = { type: "image", url: content, alt: contentAlt };
        break;
      case "video":
        newContentItem = {
          type: "video",
          url: content,
          caption: contentCaption,
        };
        break;
      default:
        return;
    }

    onAddPost(newContentItem);
    // Clear input fields after adding content
    // setContentValue("");
    // setContentUrl("");
    // setContentAlt("");
    // setContentCaption("");
    setContent("");
    setPreviewContent(
      (prev) => prev + `\n<${contentType}>${content}</${contentType}>`
    );
  };

  const onSelectContent = (contentType: string, value: string) => {
    setContentType(contentType);
    setContent(value);
    setPreviewContent(
      (prev) => prev + `\n<${contentType}>${value}</${contentType}>`
    );
  };

  return (
    <div className="flex flex-col">
      <DropdownMenu
        onSelectContent={onSelectContent}
        handleAddContent={handleAddContent}
      />
      {/* {contentType === "text" ? null : <div>{content}</div>} */}
      {/* <button onClick={handleAddContent}>Add Content</button> */}
    </div>
  );
};

export default AddPostContent;

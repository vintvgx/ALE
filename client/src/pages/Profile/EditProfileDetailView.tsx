import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BlogPost } from "../../models/blogPostModel";
import BlogPostDetail from "../../components/BlogPostDetail";
import { Avatar, Button, Spin } from "antd";
import Editor from "../../utils/Editor/Editor";
import { OutputData } from "@editorjs/editorjs";
import { updateBlogPost } from "../../redux/posts/BlogPostReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

const EditProfileDetailView: React.FC<{
  date: string;
  detailPost: BlogPost;
  blogContent: OutputData | undefined;
  setBlogContent: React.Dispatch<React.SetStateAction<OutputData | undefined>>;
  onSave: (updatedPost: BlogPost) => void;
  onCancel: () => void;
}> = ({ detailPost, onSave, onCancel, date, blogContent, setBlogContent }) => {
  const [editablePost, setEditablePost] = useState<BlogPost>(detailPost);
  const dispatch: AppDispatch = useDispatch();

  const handleSave = () => {
    const isContentChanged =
      JSON.stringify(blogContent) !== JSON.stringify(detailPost.content);
    const isCoverChanged = editablePost.cover !== detailPost.cover;

    if (isContentChanged || isCoverChanged) {
      const updatedPost: BlogPost = {
        ...editablePost,
        content: JSON.stringify(blogContent),
      };

      // Dispatch the action only if there are changes
      dispatch(updateBlogPost(updatedPost));
    } else {
      console.log("else");
      // Invoke onCancel if there are no changes
      onCancel();
    }

    // Invoke onSave (whether there are changes or not)
    onSave(detailPost);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        <Button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          onClick={handleSave}>
          Save
        </Button>
      </div>
      <div className="mb-4">
        <img
          src={detailPost.cover?.toString() || ""} // assuming detailPost has a cover property
          alt={detailPost.title}
          className="w-full h-80 object-cover rounded-lg mb-4"
        />

        <div className="mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-4">{detailPost.title}</h1>
            <p className="text-gray-500 mb-2">Published on {date}</p>
          </div>
          <div className="flex flex-col items-center">
            <Avatar
              size={40}
              src={detailPost.user?.avatar} // assuming detailPost has a user property
              alt={detailPost.user?.username}
            />
            <span className="ml-2 text-sm">{detailPost.user?.username}</span>
          </div>
        </div>
      </div>
      <div className="prose max-w-full w-full min-h-screen">
        {detailPost ? (
          <Editor data={blogContent} setData={setBlogContent} />
        ) : (
          <div className="flex items-center justify-center h-48">
            <Spin size="large" />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfileDetailView;

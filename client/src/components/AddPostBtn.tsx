// PlusIcon.js
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/**
 * Icon that navigates the user to CreatePostView
 */
const PlusIcon = () => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    // Navigate to CreatePostView
    navigate("/create-post");
  };

  return (
    <div
      className="fixed bottom-4 right-4 bg-gray-800 rounded-full p-2 cursor-pointer"
      onClick={handleIconClick}>
      <FaPlus color="#fff" size={12} />
    </div>
  );
};

export default PlusIcon;

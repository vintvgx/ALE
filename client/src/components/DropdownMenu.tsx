import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Transition } from "@headlessui/react";

interface TextInputProps {
  onSelectContent: (value: string) => void;
  onEnterPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

// Separate component for h1 input
const H1Input: React.FC<TextInputProps> = ({
  onSelectContent,
  onEnterPress,
}) => (
  <input
    type="text"
    placeholder="Enter h1 content"
    className=" text-3xl font-medium"
    onChange={(e) => onSelectContent(e.target.value)}
    onKeyDown={onEnterPress}
  />
);

// Separate component for h2 input
const H2Input: React.FC<TextInputProps> = ({
  onSelectContent,
  onEnterPress,
}) => (
  <input
    type="text"
    placeholder="Enter h2 content"
    className=" text-2xl font-medium"
    onChange={(e) => onSelectContent(e.target.value)}
    onKeyDown={onEnterPress}
  />
);

// Separate component for h3 input
const H3Input: React.FC<TextInputProps> = ({
  onSelectContent,
  onEnterPress,
}) => (
  <input
    type="text"
    placeholder="Enter h3 content"
    className=" text-xl font-medium outline-none"
    onChange={(e) => onSelectContent(e.target.value)}
    onKeyDown={onEnterPress}
  />
);

// Separate component for texxt input
const TextInput: React.FC<TextInputProps> = ({
  onSelectContent,
  onEnterPress,
}) => (
  <input
    type="text"
    placeholder="Enter text content"
    className=" text-base  outline-none w-full"
    onChange={(e) => onSelectContent(e.target.value)}
    onKeyDown={onEnterPress}
  />
);

// Separate component for image input
const ImageInput: React.FC<{ onSelectContent: (value: string) => void }> = ({
  onSelectContent,
}) => (
  <input
    type="file"
    accept="image/*"
    onChange={(e) => onSelectContent(e.target.value)} // You may need to handle file upload differently
  />
);

// Separate component for video input
const VideoInput: React.FC<{ onSelectContent: (value: string) => void }> = ({
  onSelectContent,
}) => (
  <input
    type="text"
    placeholder="Enter video URL"
    onChange={(e) => onSelectContent(e.target.value)}
  />
);

interface DropdownMenuProps {
  onSelectContent: (item: string, value: string) => void;
  handleAddContent: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  onSelectContent,
  handleAddContent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const [isAddButtonVisible, setIsAddButtonVisible] = useState(true);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (item: string) => {
    console.log(`Selected item: ${item}`);
    setSelectedContent(item);
    setIsOpen(false);
    setIsAddButtonVisible(false); // Hide the "Add Content" button
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSelectContent(selectedContent, e.currentTarget.value);
      setIsAddButtonVisible(true);
      setSelectedContent("");
      handleAddContent();
    }
  };

  return (
    <div className="relative inline-block text-left mt-4">
      {isAddButtonVisible && (
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          onClick={toggleMenu}>
          <FaPlus className="w-5 h-5 mr-2" />
          Add Content
        </button>
      )}

      <Transition
        show={isOpen}
        enter="transition-opacity duration-75 transform origin-top-right"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition-opacity duration-150 transform origin-top-right"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95">
        <div className="absolute left-0 top-full mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="flex divide-x divide-gray-200"
            role="menu"
            aria-orientation="horizontal"
            aria-labelledby="options-menu">
            <button
              onClick={() => handleItemClick("h1")}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem">
              H1
            </button>
            <button
              onClick={() => handleItemClick("h2")}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem">
              H2
            </button>
            <button
              onClick={() => handleItemClick("h3")}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem">
              H3
            </button>
            <button
              onClick={() => handleItemClick("text")}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem">
              T
            </button>
            <button
              onClick={() => handleItemClick("image")}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem">
              Image
            </button>
            <button
              onClick={() => handleItemClick("video")}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem">
              Video
            </button>
          </div>
        </div>
      </Transition>

      {/* Conditionally render the selected content input */}
      {selectedContent === "h1" && (
        <H1Input
          onSelectContent={(value) => onSelectContent("h1", value)}
          onEnterPress={handleEnterPress}
        />
      )}
      {selectedContent === "h2" && (
        <H2Input
          onSelectContent={(value) => onSelectContent("h2", value)}
          onEnterPress={handleEnterPress}
        />
      )}
      {selectedContent === "h3" && (
        <H3Input
          onSelectContent={(value) => onSelectContent("h3", value)}
          onEnterPress={handleEnterPress}
        />
      )}
      {selectedContent === "text" && (
        <TextInput
          onSelectContent={(value) => onSelectContent("text", value)}
          onEnterPress={handleEnterPress}
        />
      )}
      {selectedContent === "image" && (
        <ImageInput
          onSelectContent={(value) => onSelectContent("image", value)}
        />
      )}
      {selectedContent === "video" && (
        <VideoInput
          onSelectContent={(value) => onSelectContent("video", value)}
        />
      )}
    </div>
  );
};

export default DropdownMenu;

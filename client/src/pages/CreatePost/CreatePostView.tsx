import React, { useState } from "react";
import Editor from "../../utils/Editor/Editor";
import EditorTextParser from "../../utils/Editor/EditorTextParser";
import { OutputData } from "@editorjs/editorjs";
import { exampleData, placeholder } from "../../utils/Editor/ExampleData";
import "./CreatePost.css";
import Editorv2 from "../../utils/Editor/Editorv2";

const CreatePostView = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState<OutputData>(placeholder);

  function toggleEditMode() {
    if (isEditMode) {
      setIsEditMode(false);
      console.log("Edit mode is now disabled");
    } else {
      setIsEditMode(true);
      console.log("Edit mode is now enabled");
    }
  }

  return (
    <div className="m-14 mx-96 w-full">
      <button id="toggle-edit-btn" onClick={toggleEditMode}>
        Toggle Edit Mode
      </button>

      <div className="">
        {isEditMode ? (
          <Editor data={data} setData={setData} />
        ) : (
          <EditorTextParser data={data} />
        )}
      </div>
      {/* <Editorv2 /> */}
    </div>
  );
};

export default CreatePostView;

import React, { FC } from "react";
import { OutputData } from "@editorjs/editorjs";

// Styles
import "./Editor.css";
import EditorDIV from "./EditorJSTextBox";

interface EditorProps {
  data: OutputData;
  setData: React.Dispatch<React.SetStateAction<OutputData>>;
}

const Editor: FC<EditorProps> = ({ data, setData }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}>
      <EditorDIV data={data} setData={setData} />
    </div>
  );
};

export default Editor;

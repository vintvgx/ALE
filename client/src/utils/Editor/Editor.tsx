import React, { useRef, useCallback, FC } from "react";
import EditorJS, { OutputData, ToolSettings } from "@editorjs/editorjs";

// Import tools for editor config
import { EDITOR_JS_TOOLS } from "./Tools";
import { createReactEditorJS } from "react-editor-js";

// Styles
import "./Editor.css";
import EditorDIV from "./Editorv2";

interface EditorProps {
  data: OutputData;
  setData: React.Dispatch<React.SetStateAction<OutputData>>;
}

const Editor: FC<EditorProps> = ({ data, setData }) => {
  const editorCore = useRef<EditorJS | null>(null);
  const ReactEditorJS = createReactEditorJS();

  const handleInitialize = useCallback((instance: any) => {
    instance._editorJS.isReady
      .then(() => {
        // Set reference to editor
        editorCore.current = instance;
      })
      .catch((err: any) => console.log("An error occurred", err));
  }, []);

  const handleSave = useCallback(async () => {
    // Retrieve data inserted
    const savedData = await editorCore.current?.save();
    // Save data
    if (savedData) {
      setData(savedData);
    }
  }, [setData]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Align content to the left
        alignItems: "flex-start",
      }}>
      {/* <ReactEditorJS
        onInitialize={handleInitialize}
        tools={EDITOR_JS_TOOLS}
        onChange={handleSave}
        defaultValue={data}
        placeholder={"Tell your story..."}
      /> */}
      <EditorDIV data={data} setData={setData} />
    </div>
  );
};

export default Editor;

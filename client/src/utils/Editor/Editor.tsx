import React, { useRef, useCallback, FC } from "react";
import EditorJS, { OutputData, ToolSettings } from "@editorjs/editorjs";

// Import tools for editor config
import { EDITOR_JS_TOOLS } from "./Tools";
import { createReactEditorJS } from "react-editor-js";

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

  const handleSubmit = () => {
    console.log(JSON.stringify(data));
    alert(data);
  };

  return (
    <div className="editor-container">
      <h4 className="edit-mode-alert">! Edit Mode Enabled</h4>
      <ReactEditorJS
        onInitialize={handleInitialize}
        tools={EDITOR_JS_TOOLS}
        onChange={handleSave}
        defaultValue={data}
      />
      <button onClick={handleSubmit}>SUBMIT</button>
    </div>
  );
};

export default Editor;

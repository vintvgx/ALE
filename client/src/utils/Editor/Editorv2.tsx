import React, { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import { useRef } from "react";
import { Alert } from "@chakra-ui/react";

const Editorv2 = () => {
  const ref = useRef<EditorJS>();

  const initializeEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Table = (await import("@editorjs/table")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Code = (await import("@editorjs/code")).default;
    const Quote = (await import("@editorjs/quote")).default;
    const EditorImage = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          table: Table,
          embed: Embed,
          code: Code,
          quote: Quote,
          image: EditorImage,
        },
      });
      ref.current = editor;
    }
  };

  useEffect(() => {
    const init = async () => {
      initializeEditor();
    };
    init();
  });

  const save = () => {
    if (ref.current) {
      ref.current.save().then((data) => {
        console.log("Editor data: ", JSON.stringify(data));
        alert(JSON.stringify(data));
      });
    }
  };

  return (
    <>
      <div id="editorjs" className="max-w-full min-h-screen prose" />
      <button onClick={save}>Save</button>
    </>
  );
};

export default Editorv2;

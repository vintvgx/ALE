// CreatePostView.tsx
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  BaseEditor,
  createEditor,
  Descendant,
  Editor,
  Transforms,
} from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import isHotkey from "is-hotkey";
import { toggleMark } from "../../utils/Slate/components/Toolbar";
import { Toolbar } from "../../utils/Slate/components/Toolbar";
import { Element } from "../../utils/Slate/components/Element";
import { Leaf } from "../../utils/Slate/components/Leaf";
import { HistoryEditor, withHistory } from "slate-history";
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { EditorProps } from "../../utils/Slate/model";

const HOTKEYS: { [hotkey: string]: string } = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

const CreatePostView = () => {
  const [title, setTitle] = useState("");
  const [focused, setFocused] = React.useState(false);
  // const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [editorContent, setEditorContent] = useState<Descendant[]>([]);
  const divRef = React.useRef<HTMLDivElement>(null);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const editorRef = useRef<CustomEditor | null>(null);

  if (!editorRef.current) {
    editorRef.current = withHistory(withReact(createEditor()));
  }

  const editor = editorRef.current;

  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "Testing" }],
    },
  ];

  const savedSelection = React.useRef(editor.selection);

  const onFocus = React.useCallback(() => {
    setFocused(true);
    if (!editor.selection && editorContent?.length) {
      Transforms.select(
        editor,
        savedSelection.current ?? Editor.end(editor, [])
      );
    }
  }, [editor]);

  const onBlur = React.useCallback(() => {
    setFocused(false);
    savedSelection.current = editor.selection;
  }, [editor]);

  const focusEditor = React.useCallback(
    (e: React.MouseEvent) => {
      if (e.target === divRef.current) {
        ReactEditor.focus(editor);
        e.preventDefault();
      }
    },
    [editor]
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // Create the data object in the expected format
      const postData = {
        author: {
          username: "johndoe0123",
          email: "doe123@aol.com",
          uid: "johnnydoe123",
          bio: "I dont know who i am.",
          avatar: null,
        },
        topic: {
          name: "Tech",
        },
        title: title,
        content: JSON.stringify(editorContent),
        cover: null,
      };

      // Append the data as JSON
      formData.append("data", JSON.stringify(postData));

      console.log(postData);

      console.log(JSON.stringify(postData));

      const response = await fetch("http://127.0.0.1:8000/api/blogposts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Failed to create blog post");
      }

      const createdPost = await response.json();
      console.log("Created Blog Post:", createdPost);

      // Optionally, you can navigate to the newly created post or perform other actions
    } catch (error) {
      console.error("Error creating blog post:", error);
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

      <div ref={divRef} onMouseDown={focusEditor} />
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          setEditorContent(value);
        }}>
        <Toolbar />
        <Box>
          <Editable
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some rich text…"
            spellCheck
            className="mt-6 outline-none w-full "
            // style={{ minHeight: "150px", resize: "vertical", overflow: "auto" }}
          />
        </Box>
        <button
          className="mt-10 bg-slate-500 text-rose-50 p-2 rounded-lg"
          onClick={handleSubmit}>
          PRESS
        </button>
      </Slate>
    </div>
  );
};

export default CreatePostView;

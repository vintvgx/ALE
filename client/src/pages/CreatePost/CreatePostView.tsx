// CreatePostView.tsx
import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Descendant, Editor, Transforms, Element } from "slate";
import {
  Slate,
  Editable,
  withReact,
  DefaultElement,
  ReactEditor,
} from "slate-react";
import isHotkey from "is-hotkey";
import {
  CodeElement,
  Leaf,
  toggleMark,
  Toolbar,
} from "../../utils/Slate/Elements";
// import {
//   CustomEditor,
//   CustomElement,
//   CustomText,
// } from "../../models/slateModel";
import { withHistory } from "slate-history";

const HOTKEYS: { [hotkey: string]: string } = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const CreatePostView = () => {
  const [title, setTitle] = useState("");
  const [focused, setFocused] = React.useState(false);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [editorContent, setEditorContent] = useState<Descendant[]>([]);
  const divRef = React.useRef<HTMLDivElement>(null);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    } as Element, // Explicitly cast to Element
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

  const handleSubmit = () => {
    console.log(editorContent);
    // console.log(editor);
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
        onChange={(value) => setEditorContent(value)}>
        <Toolbar />
        <Editable
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          className="mt-6"
          // style={{ minHeight: "150px", resize: "vertical", overflow: "auto" }}
        />
        <button onClick={handleSubmit}>PRESS</button>
        {/* <Editable
            className="mt-6 outline-none"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            // onKeyDown={(event) => {
            //   if (event.key === "&") {
            //     event.preventDefault();
            //     editor.insertText("and");
            //   }
            //   if (event.key === "b") {
            //     event.preventDefault();
            //     Editor.addMark(editor, "bold", true);
            //   }
            //   // TODO resolve custom elements
            //   // if (event.key === "`" && event.ctrlKey) {
            //   //   event.preventDefault();
            //   //   const [match] = Editor.nodes(editor, {
            //   //     match: (n) => n.type === "code",
            //   //   });
            //   //   // Toggle the block type depending on whether there's already a match.
            //   //   Transforms.setNodes(
            //   //     editor,
            //   //     { type: match ? "paragraph" : "code" },
            //   //     {
            //   //       match: (n) =>
            //   //         Element.isElement(n) && Editor.isBlock(editor, n),
            //   //     }
            //   //   );
            //   // }
            // }}
            onKeyDown={(event) => {
              if (!event.ctrlKey) {
                return;
              }

              switch (event.key) {
                case "&": {
                  event.preventDefault();
                  editor.insertText("and");
                  break;
                }

                case "`": {
                  event.preventDefault();
                  Editor.addMark(editor, "bold", true);
                  break;
                }
              }
            }}
          /> */}
      </Slate>
    </div>
  );
};

export default CreatePostView;

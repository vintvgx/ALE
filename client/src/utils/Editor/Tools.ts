// tools.js
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";

export const EDITOR_JS_TOOLS = {
  // NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
  // paragraph: Paragraph,
  header: {
    class: Header,
    shortcut: "CMD+SHIFT+H",
    inlineToolbar: ["link"],
    toolbox: {
      icon: "H", // Display an icon for the header tool
      levels: [1, 2, 3], // Specify the header levels to display in the inline toolbar
    },
    config: {
      placeholder: "Enter a header",
      levels: [1, 2, 3],
      defaultLevel: 1,
    },
  },
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
        byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
      },
    },
  },
  embed: Embed,
  table: Table,
  list: {
    class: List,
    inlineToolbar: true,
  },
  // warning: Warning,
  code: Code,
  linkTool: LinkTool,
  // image: EditorImage,
  // raw: Raw,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: {
    class: SimpleImage,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+I",
    config: {
      placeholder: "Paste image URL",
    },
  },
};

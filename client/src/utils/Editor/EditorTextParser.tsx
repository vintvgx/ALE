import React from "react";
import edjsHTML, { EdjsHTMLConfig } from "editorjs-html";
import parse from "html-react-parser";
import { OutputData } from "@editorjs/editorjs";
import "./Editor.css";

const edjsParser = edjsHTML();

interface EditorTextParserProps {
  data: OutputData; // Adjust the type of data accordingly
}

const EditorTextParser: React.FC<EditorTextParserProps> = ({ data }) => {
  console.log("🚀 ~ file: EditorTextParser.tsx:14 ~ data:", data);
  // array of html elements
  const html = edjsParser.parse(data);
  console.log("🚀 ~ file: EditorTextParser.tsx:16 ~ html:", html);

  return <div className="text-container">{parse(html.join(""))}</div>;
};

export default EditorTextParser;

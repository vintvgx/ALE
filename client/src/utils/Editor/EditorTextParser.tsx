import React from "react";
import edjsHTML, { EdjsHTMLConfig } from "editorjs-html";
import parse from "html-react-parser";
import { OutputData } from "@editorjs/editorjs";
import "./Editor.css";

const edjsParser = edjsHTML();

interface EditorTextParserProps {
  data: OutputData | undefined; // Adjust the type of data accordingly
}

const EditorTextParser: React.FC<EditorTextParserProps> = ({ data }) => {
  // array of html elements
  const html = edjsParser.parse(data);

  if (data === undefined) {
    // Handle the case where data is undefined
    return <div>No content to display</div>;
  }

  return <div className="text-container w-4/5">{parse(html.join(""))}</div>;
};

export default EditorTextParser;

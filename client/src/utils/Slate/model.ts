import { Editor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export type CustomElement = {
  type: string; // Add the type property
  // Other properties specific to your custom element
};

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  //   code?: boolean; // Add the code property
  // Other properties specific to your custom text
};

declare module "slate" {
  interface CustomTypes {
    Element: CustomElement;
    Text: CustomText;
  }
}

export type EditorProps = Editor | ReactEditor | HistoryEditor;

// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor, Editor, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

// export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

// export type ParagraphElement = {
//   type: "paragraph";
//   children: CustomText[];
// };

// export type HeadingElement = {
//   type: "heading";
//   level: number;
//   children: CustomText[];
// };

// export type CustomElement = ParagraphElement | HeadingElement;

// export type FormattedText = {
//   code?: any;
//   underline?: any;
//   italic?: any;
//   text?: string;
//   bold?: true;
// };

// export type CustomText = FormattedText;

// declare module "slate" {
//   interface CustomTypes {
//     Editor: CustomEditor;
//     Element: CustomElement;
//     Text: CustomText;
//   }
// }

// const CustomEditor = {
//     isBoldMarkActive(editor: any) {
//       const marks = Editor.marks(editor)
//       return marks ? marks.bold === true : false
//     },
//   ​
//     isCodeBlockActive(editor: CustomEditor) {
//       const [match] = Editor.nodes(editor, {
//         match: n => n.type === 'code',
//       })
//   ​
//       return !!match
//     },
//   ​
//     toggleBoldMark(editor: CustomEditor) {
//       const isActive = CustomEditor.isBoldMarkActive(editor)
//       if (isActive) {
//         Editor.removeMark(editor, 'bold')
//       } else {
//         Editor.addMark(editor, 'bold', true)
//       }
//     },
//   ​
//     toggleCodeBlock(editor: CustomEditor) {
//       const isActive = CustomEditor.isCodeBlockActive(editor)
//       Transforms.setNodes(
//         editor,
//         { type: isActive ? undefined : 'heading' },
//         { match: n => Editor.isBlock(editor, n) }
//       )
//     },
//   }

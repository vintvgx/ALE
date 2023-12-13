import { HStack, IconButton } from "@chakra-ui/react";
import { ReactElement } from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdCode,
  MdLooksOne,
  MdLooksTwo,
  MdFormatQuote,
  MdFormatListNumbered,
  MdFormatListBulleted,
} from "react-icons/md";
import { ReactEditor, useSlate } from "slate-react";
import {
  Editor,
  Transforms,
  Element as SlateElement,
  Text as SlateText,
} from "slate";
import { HistoryEditor } from "slate-history";
import { EditorProps } from "../model";

const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const Toolbar = () => {
  return (
    <HStack
      borderWidth={"0 0 1px 0"}
      padding={"10px 5px"}
      spacing={"5px"}
      wrap={"wrap"}>
      <MarkButton format="bold" icon={<MdFormatBold />} />
      <MarkButton format="italic" icon={<MdFormatItalic />} />
      <MarkButton format="underline" icon={<MdFormatUnderlined />} />
      <BlockButton format="code" icon={<MdCode />} />
      <BlockButton format="heading-one" icon={<MdLooksOne />} />
      <BlockButton format="heading-two" icon={<MdLooksTwo />} />
      <BlockButton format="block-quote" icon={<MdFormatQuote />} />
      <BlockButton format="numbered-list" icon={<MdFormatListNumbered />} />
      <BlockButton format="bulleted-list" icon={<MdFormatListBulleted />} />
    </HStack>
  );
};

export const MarkButton = ({
  format,
  icon,
}: {
  format: string;
  icon: ReactElement;
}) => {
  const editor = useSlate();
  return (
    <IconButton
      variant="outline"
      colorScheme="red"
      isActive={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      aria-label={format}
      icon={icon}
      borderWidth={0}
      fontSize={"20px"}
    />
  );
};

export const BlockButton = ({
  format,
  icon,
}: {
  format: string;
  icon: ReactElement;
}) => {
  const editor = useSlate();
  return (
    <IconButton
      variant="outline"
      colorScheme="blue"
      isActive={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      aria-label={format}
      icon={icon}
      borderWidth={0}
      fontSize={"20px"}
    />
  );
};

export const toggleBlock = (editor: EditorProps, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        (!Editor.isEditor(n) && SlateElement.isElement(n) && n.type) as string
      ),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isBlockActive = (editor: EditorProps, format: string) => {
  const nodeGen = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  let node = nodeGen.next();
  while (!node.done) {
    return true;
  }
  return false;
};

export const toggleMark = (editor: EditorProps, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor: EditorProps, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? (marks as Record<string, boolean>)[format] === true : false;
};

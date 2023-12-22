import {
  chakra,
  Heading,
  ListItem,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { RenderElementProps } from "slate-react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const Element = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  switch (element.type) {
    case "block-quote":
      return (
        <chakra.blockquote
          style={BlockquoteStyle}
          borderLeftWidth={"10px"}
          borderLeftColor={"gray.200"}
          {...attributes}>
          {children}
        </chakra.blockquote>
      );
    case "list-item":
      return <ListItem {...attributes}>{children}</ListItem>;
    case "numbered-list":
      return <OrderedList {...attributes}>{children}</OrderedList>;
    case "bulleted-list":
      return <UnorderedList {...attributes}>{children}</UnorderedList>;
    case "heading-one":
      return (
        <Heading as="h1" size="3xl" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-two":
      return (
        <Heading as="h2" size="2xl" {...attributes}>
          {children}
        </Heading>
      );
    case "code":
      if (children && children[0] && children[0].text) {
        return (
          <SyntaxHighlighter language="javascript" style={docco}>
            {children[0].text}
          </SyntaxHighlighter>
        );
      } else {
        // Handle the case where children or children.props.text is undefined
        return (
          <chakra.code
            padding={"3px"}
            backgroundColor={"gray.200"} //{colorMode === "dark" ? "gray.700" : "gray.200"}
            fontSize={"90%"}>
            {children}
          </chakra.code>
        );
      }
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const BlockquoteStyle: React.CSSProperties | undefined = {
  margin: "1.5em 10px",
  padding: "0.5em 10px",
};

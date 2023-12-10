import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

// ...

export const SyntaxHighlighterElement = (props: {
  //   attributes: JSX.IntrinsicAttributes &
  //     React.ClassAttributes<HTMLPreElement> &
  //     React.HTMLAttributes<HTMLPreElement>;
  children: any;
}) => {
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
      {props.children}
    </SyntaxHighlighter>
  );
};

// ...

// import ReactMarkdown from "react-markdown";

// export const CodeElement = (props: {
//   attributes: JSX.IntrinsicAttributes &
//     React.ClassAttributes<HTMLPreElement> &
//     React.HTMLAttributes<HTMLPreElement>;
//   children: any;
// }) => {
//   return (
//     <ReactMarkdown
//       components={{
//         code: ({ node, className, children, ...props }) => {
//           const match = /language-(\w+)/.exec(className || "");
//           return (
//             match && (
//               <code className={className} {...props}>
//                 {children}
//               </code>
//             )
//           );
//         },
//         pre: ({ children, ...props }) => <pre {...props}>{children}</pre>,
//       }}>
//       {props.children}
//     </ReactMarkdown>
//   );
// };

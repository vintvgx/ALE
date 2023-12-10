import React, { useCallback, useEffect, useState } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor, Descendant } from "slate";
import { Leaf } from "../utils/Slate/components/Leaf";
import { Element } from "../utils/Slate/components/Element";

const BlogPostView = () => {
  const [blogPost, setBlogPost] = useState<any>(null); // Replace 'any' with the actual type of your blog post
  const [editorContent, setEditorContent] = useState<Descendant[]>([]);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const editor = withReact(createEditor());

  useEffect(() => {
    // Fetch the blog post data from your API
    const fetchBlogPost = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/blogposts/1"); // Adjust the URL and method accordingly
        if (!response.ok) {
          throw new Error("Failed to fetch blog post");
        }

        const fetchedBlogPost = await response.json();
        setBlogPost(fetchedBlogPost);
        setEditorContent(JSON.parse(fetchedBlogPost.content)); // Parse the JSON string to get Descendant[]
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    fetchBlogPost();
  }, []); // Run the effect only once on mount

  return (
    <div className="m-14 mx-96">
      {blogPost && (
        <>
          <h1 className="text-5xl font-semibold">{blogPost.title}</h1>
          <Slate editor={editor} initialValue={editorContent}>
            <Editable
              readOnly
              renderElement={renderElement}
              renderLeaf={renderLeaf}
            />
          </Slate>
        </>
      )}
    </div>
  );
};

export default BlogPostView;

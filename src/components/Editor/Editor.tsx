"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { Controls } from "./Controls";

interface EditorProps {
  documentId?: string;
}

const Editor = ({ documentId = "default" }: EditorProps) => {
  const [content] = useState(`
    <h1>Welcome to the Collaborative Editor!</h1>
    <p>Start typing to test the editor...</p>
  `);

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Controls editor={editor} />
      <div className="border rounded-lg shadow-sm p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;

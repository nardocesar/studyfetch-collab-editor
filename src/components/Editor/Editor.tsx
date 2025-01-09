"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { Controls } from "./Controls";
import { useCollaboration } from "@/contexts/CollaborationContext";
import { useEffect, useState } from "react";
import "./Editor.css";

interface EditorProps {
  username: string;
}

const colors = [
  "#958DF1",
  "#F98181",
  "#FBBC88",
  "#FAF594",
  "#70CFF8",
  "#94FADB",
  "#B9F18D",
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

export default function Editor({ username }: EditorProps) {
  const { provider, ydoc } = useCollaboration();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (provider && ydoc) {
      provider.on("status", ({ status }: { status: string }) => {
        if (status === "connected") {
          setIsReady(true);
        }
      });
    }
  }, [provider, ydoc]);

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          history: false,
        }),
        Collaboration.configure({
          document: ydoc,
          field: "content",
        }),
        ...(isReady
          ? [
              CollaborationCursor.configure({
                provider: provider,
                user: {
                  name: username,
                  color: getRandomColor(),
                },
              }),
            ]
          : []),
      ],
      editorProps: {
        attributes: {
          class:
            "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
        },
      },
    },
    [provider, ydoc, isReady]
  );

  if (!editor || !provider || !isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Controls editor={editor} />
      <div className="border rounded-lg shadow-sm mt-2 overflow-hidden">
        <EditorContent editor={editor} className="prose-lg" />
      </div>
    </div>
  );
}

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { Controls } from "./Controls";
import { useCollaboration } from "@/contexts/CollaborationContext";
import { useEffect, useState } from "react";
import "./Editor.css";
import { SaveButton } from "./SaveButton";

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
  const { provider, ydoc, lastSaved } = useCollaboration();
  const [isReady, setIsReady] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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
          field: "prosemirror",
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
      immediatelyRender: false,
    },
    [provider, ydoc, isReady]
  );

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      setHasUnsavedChanges(true);
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  useEffect(() => {
    if (lastSaved) {
      setHasUnsavedChanges(false);
    }
  }, [lastSaved]);

  if (!editor || !provider || !isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <Controls editor={editor} />
        <SaveButton />
      </div>
      <div className="border rounded-lg shadow-sm mt-2 overflow-hidden">
        <EditorContent editor={editor} className="prose-lg" />
      </div>
    </div>
  );
}

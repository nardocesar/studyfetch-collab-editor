"use client";

import { HocuspocusProvider } from "@hocuspocus/provider";
import { createContext, useContext, useEffect, useState } from "react";
import * as Y from "yjs";
import { saveToS3, loadFromS3 } from "@/lib/s3-client";

interface CollaborationContextType {
  provider: HocuspocusProvider | null;
  ydoc: Y.Doc | null;
  isSaving: boolean;
  lastSaved: Date | null;
  saveDocument: () => Promise<void>;
}

const CollaborationContext = createContext<CollaborationContextType>({
  provider: null,
  ydoc: null,
  isSaving: false,
  lastSaved: null,
  saveDocument: async () => {},
});

export function CollaborationProvider({
  children,
  documentId,
  username,
}: {
  children: React.ReactNode;
  documentId: string;
  username: string;
}) {
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
  const [ydoc] = useState(() => new Y.Doc());
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const saveDocument = async () => {
    if (!ydoc) return;

    setIsSaving(true);
    try {
      const prosemirrorNode = ydoc.get("prosemirror", Y.XmlFragment);
      await saveToS3(documentId, prosemirrorNode.toJSON());
      setLastSaved(new Date());
    } catch (error) {
      console.error("Error saving content:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Load initial content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const savedContent = await loadFromS3(documentId);
        if (savedContent && ydoc) {
          const prosemirrorNode = ydoc.get("prosemirror", Y.XmlFragment);
          if (savedContent.content) {
            // Clear existing content
            prosemirrorNode.delete(0, prosemirrorNode.length);
            // Insert new content
            prosemirrorNode.insert(0, [savedContent.content]);
          }
        } else {
          // Initialize with empty content for new documents
          console.log("Creating new document...");
          const prosemirrorNode = ydoc.get("prosemirror", Y.XmlFragment);
          // You can set default content here if needed
          await saveToS3(documentId, prosemirrorNode.toJSON());
        }
      } catch (error) {
        console.error("Error loading content:", error);
      }
    };

    loadContent();
  }, [documentId, ydoc]);

  // Provider setup
  useEffect(() => {
    const newProvider = new HocuspocusProvider({
      url: process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://127.0.0.1:1234",
      name: documentId,
      document: ydoc,
      token: username,
    });

    setProvider(newProvider);

    return () => {
      newProvider.destroy();
    };
  }, [documentId, username, ydoc]);

  return (
    <CollaborationContext.Provider
      value={{ provider, ydoc, isSaving, lastSaved, saveDocument }}
    >
      {children}
    </CollaborationContext.Provider>
  );
}

export const useCollaboration = () => useContext(CollaborationContext);

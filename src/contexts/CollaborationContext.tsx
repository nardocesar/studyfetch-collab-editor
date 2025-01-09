"use client";

import { HocuspocusProvider } from "@hocuspocus/provider";
import { createContext, useContext, useEffect, useState } from "react";
import * as Y from "yjs";
import { saveToS3, loadFromS3 } from "@/lib/s3-client";
import { debounce } from "lodash";

interface CollaborationContextType {
  provider: HocuspocusProvider | null;
  ydoc: Y.Doc | null;
  isSaving: boolean;
  lastSaved: Date | null;
}

const CollaborationContext = createContext<CollaborationContextType>({
  provider: null,
  ydoc: null,
  isSaving: false,
  lastSaved: null,
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

  // Load initial content
  useEffect(() => {
    const loadContent = async () => {
      const savedContent = await loadFromS3(documentId);
      if (savedContent && ydoc) {
        const content = savedContent.content;
        const ytext = ydoc.getText("content");
        ytext.delete(0, ytext.length);
        ytext.insert(0, content);
      }
    };

    loadContent();
  }, [documentId, ydoc]);

  // Save changes
  useEffect(() => {
    if (!ydoc) return;

    const debouncedSave = debounce(async () => {
      setIsSaving(true);
      const content = ydoc.getText("content").toString();
      await saveToS3(documentId, content);
      setIsSaving(false);
      setLastSaved(new Date());
    }, 2000);

    const observer = () => {
      debouncedSave();
    };

    ydoc.getText("content").observe(observer);

    return () => {
      ydoc.getText("content").unobserve(observer);
      debouncedSave.cancel();
    };
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
      value={{ provider, ydoc, isSaving, lastSaved }}
    >
      {children}
    </CollaborationContext.Provider>
  );
}

export const useCollaboration = () => useContext(CollaborationContext);

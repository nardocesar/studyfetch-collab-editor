"use client";

import { HocuspocusProvider } from "@hocuspocus/provider";
import { createContext, useContext, useEffect, useState } from "react";
import * as Y from "yjs";

interface CollaborationContextType {
  provider: HocuspocusProvider | null;
  ydoc: Y.Doc | null;
}

const CollaborationContext = createContext<CollaborationContextType>({
  provider: null,
  ydoc: null,
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
    <CollaborationContext.Provider value={{ provider, ydoc }}>
      {children}
    </CollaborationContext.Provider>
  );
}

export const useCollaboration = () => useContext(CollaborationContext);

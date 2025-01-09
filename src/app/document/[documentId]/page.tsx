"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Editor from "@/components/Editor/Editor";
import Login from "@/components/Login/Login";
import { CollaborationProvider } from "@/contexts/CollaborationContext";

export default function DocumentPage() {
  const params = useParams();
  const [username, setUsername] = useState<string | null>(null);
  const documentId = params.documentId as string;

  if (!username) {
    return <Login onLogin={setUsername} />;
  }

  return (
    <CollaborationProvider documentId={documentId} username={username}>
      <div className="min-h-screen bg-background">
        <header className="border-b p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-lg font-semibold">Document: {documentId}</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Logged in as {username}
              </span>
            </div>
          </div>
        </header>
        <main className="container mx-auto py-8">
          <Editor username={username} />
        </main>
      </div>
    </CollaborationProvider>
  );
}

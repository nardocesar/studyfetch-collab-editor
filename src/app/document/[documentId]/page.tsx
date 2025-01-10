"use client";

import { useParams, useRouter } from "next/navigation";
import Editor from "@/components/Editor/Editor";
import Login from "@/components/Login/Login";
import { CollaborationProvider } from "@/contexts/CollaborationContext";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function DocumentPage() {
  const params = useParams();
  const router = useRouter();
  const { username, login, logout } = useUser();
  const documentId = params.documentId as string;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!username) {
    return <Login onLogin={login} />;
  }

  return (
    <CollaborationProvider documentId={documentId} username={username}>
      <div className="min-h-screen bg-background">
        <header className="border-b p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-lg font-semibold">Document: {documentId}</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Logged in as {username}
              </span>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
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

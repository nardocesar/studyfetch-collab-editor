"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import Login from "@/components/Login/Login";
import { LogOut, Plus } from "lucide-react";
import { DocumentList } from "@/components/DocumentList/DocumentList";

export default function Home() {
  const router = useRouter();
  const { username, login, logout } = useUser();

  const createNewDocument = () => {
    const documentId = crypto.randomUUID();
    router.push(`/document/${documentId}`);
  };

  if (!username) {
    return <Login onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4">
        <div className="container flex justify-between items-center">
          <h1 className="text-2xl font-bold">Collaborative Editor</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Logged in as {username}
            </span>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      <main className="container py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Documents</h2>
            <Button
              onClick={createNewDocument}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Document
            </Button>
          </div>
          <DocumentList />
        </div>
      </main>
    </div>
  );
}

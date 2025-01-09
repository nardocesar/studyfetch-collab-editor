"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const createNewDocument = () => {
    const documentId = crypto.randomUUID();
    router.push(`/document/${documentId}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Collaborative Editor</h1>
        <p className="text-muted-foreground">
          Create a new document to get started
        </p>
        <Button onClick={createNewDocument} size="lg">
          Create New Document
        </Button>
      </div>
    </div>
  );
}

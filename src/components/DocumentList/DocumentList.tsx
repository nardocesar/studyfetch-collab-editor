import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DocumentMetadata, listDocuments } from "@/lib/s3-client";
import { Button } from "@/components/ui/button";
import { FileText, Clock } from "lucide-react";

export function DocumentList() {
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadDocuments = async () => {
      setIsLoading(true);
      try {
        const docs = await listDocuments();
        setDocuments(docs);
      } catch (error) {
        console.error("Error loading documents:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDocuments();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading documents...</div>;
  }

  if (documents.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No documents yet. Create your first one!
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <Button
          key={doc.id}
          variant="outline"
          className="h-auto p-4 flex flex-col items-start gap-2"
          onClick={() => router.push(`/document/${doc.id}`)}
        >
          <div className="flex items-center gap-2 w-full">
            <FileText className="h-4 w-4" />
            <span className="font-medium truncate">Document: {doc.id}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground w-full">
            <Clock className="h-3 w-3" />
            <span>
              Last updated: {new Date(doc.updatedAt).toLocaleString()}
            </span>
          </div>
        </Button>
      ))}
    </div>
  );
}

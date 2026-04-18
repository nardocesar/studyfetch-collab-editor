import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useCollaboration } from "@/contexts/CollaborationContext";

export function SaveButton() {
  const { saveDocument, isSaving, lastSaved } = useCollaboration();

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={saveDocument}
        disabled={isSaving}
        className="flex items-center gap-2"
      >
        <Save className="h-4 w-4" />
        {isSaving ? "Saving..." : "Save"}
      </Button>
      {lastSaved && (
        <span className="text-sm text-muted-foreground">
          Last saved: {lastSaved.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}

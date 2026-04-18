interface StatusBarProps {
  isSaving: boolean;
  lastSaved: Date | null;
}

export function StatusBar({ isSaving, lastSaved }: StatusBarProps) {
  return (
    <div className="text-sm text-muted-foreground flex items-center gap-2">
      {isSaving ? (
        <span>Saving...</span>
      ) : lastSaved ? (
        <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
      ) : null}
    </div>
  );
}

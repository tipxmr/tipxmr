export function CredentialBox({
  text,
  label,
}: {
  text: string | undefined;
  label: string;
}) {
  if (!text) return null;
  return (
    <div className="flex h-full flex-col space-y-4 break-words rounded-md border border-border p-8 font-mono">
      <p className="text-right lowercase tracking-tight text-muted-foreground">
        {label}
      </p>
      <p>{text}</p>
    </div>
  );
}

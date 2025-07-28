import { format } from "date-fns";

export default function LegalRenderer({
  children,
  lastUpdated,
}: {
  children: React.ReactNode;
  lastUpdated: string;
}) {
  const date = format(new Date(lastUpdated), "MM/dd/yyyy");
  return (
    <div className="space-y-4">
      <p>Last updated: {date}</p>
      {children}
    </div>
  );
}

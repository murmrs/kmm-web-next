export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container flex-1">{children}</div>;
}

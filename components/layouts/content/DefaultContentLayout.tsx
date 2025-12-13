export default function DefaultContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mt-6">{children}</div>;
}

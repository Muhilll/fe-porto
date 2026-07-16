export const metadata = {
  title: "Starter Template",
  description: "A robust starter template with Role-Based Access Control (RBAC).",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}

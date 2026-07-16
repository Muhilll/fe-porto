import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminHeader } from "@/components/layout/admin-header";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function AdminLayout({ children }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-background transition-colors overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <AdminHeader />

          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}

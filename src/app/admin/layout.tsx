'use client';
import { AuthProvider } from '@/hooks/useAuth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </AuthProvider>
  );
}

"use client";

import AuthGuard from "@/components/admin/AuthGuard";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Newspaper, Image as ImageIcon, LogOut, Calendar } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  if (isLoginPage) {
    return <AuthGuard>{children}</AuthGuard>;
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <span className="text-lg font-bold text-primary">Admin Desa</span>
          </div>
          <nav className="flex-1 py-6 px-4 space-y-2">
            <Link 
              href="/admin" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/admin' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <LayoutDashboard size={20} />
              Dasbor
            </Link>
            <Link 
              href="/admin/berita" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname.startsWith('/admin/berita') ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Newspaper size={20} />
              Kelola Berita
            </Link>
            <Link 
              href="/admin/kegiatan" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname.startsWith('/admin/kegiatan') ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Calendar size={20} />
              Kelola Kegiatan
            </Link>
            {/* Add more menus later */}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              Keluar
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

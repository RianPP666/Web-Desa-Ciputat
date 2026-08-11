"use client";

import { useState } from "react";
import newsData from "@/data/news.json";
import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";
import { authFetch } from '@/lib/auth-fetch';

interface BeritaItem {
  id: string;
  title: string;
  date: string;
  thumbnail?: string;
  excerpt?: string;
}

export default function KelolaBerita() {
  const [berita, setBerita] = useState<BeritaItem[]>(newsData as BeritaItem[]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Berita yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        const response = await authFetch(`/api/berita?id=${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) throw new Error('Gagal menghapus berita');
        
        setBerita(berita.filter((item) => item.id !== id));
        Swal.fire('Terhapus!', 'Berita berhasil dihapus.', 'success');
      } catch (error) {
        console.error("Error deleting berita:", error);
        Swal.fire('Error!', 'Gagal menghapus berita.', 'error');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Kelola Berita</h1>
        <Link 
          href="/admin/berita/tambah" 
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Tambah Berita
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
              <th className="p-4 font-medium">Gambar</th>
              <th className="p-4 font-medium">Judul Berita</th>
              <th className="p-4 font-medium">Tanggal</th>
              <th className="p-4 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {berita.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  Belum ada berita. Silakan tambah berita baru.
                </td>
              </tr>
            ) : (
              berita.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-200">
                      {item.thumbnail && (
                        <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-900">{item.title}</td>
                  <td className="p-4 text-gray-500">{item.date}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link 
                        href={`/admin/berita/edit/${item.id}`}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

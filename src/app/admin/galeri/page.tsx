"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
// Kita import dari json untuk sementara menampilkan data mockup
import galleryData from "@/data/gallery.json";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  url: string;
}

export default function KelolaGaleri() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    // Memuat data dari JSON statis sebagai mockup awal
    setItems(galleryData);
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus foto ini? (Mockup: Data statis tidak akan terhapus permanen)")) {
      setItems(items.filter(item => item.id !== id));
      alert("Foto berhasil dihapus dari tampilan (Mockup).");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Kelola Galeri</h1>
        <Link 
          href="/admin/galeri/tambah" 
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Tambah Foto
        </Link>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl mb-6 text-sm">
        <strong>Peringatan Mode Statis:</strong> Halaman ini saat ini berjalan dalam mode Mockup (tanpa database Firebase). Anda bisa melihat dan berinteraksi dengan antarmuka ini, tetapi perubahan data tidak akan tersimpan secara permanen. Untuk sementara, tambahkan foto secara statis melalui folder <code>public/images/galeri</code> dan file <code>src/data/gallery.json</code>.
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
              <th className="p-4 font-medium">Foto</th>
              <th className="p-4 font-medium">Judul</th>
              <th className="p-4 font-medium">Kategori</th>
              <th className="p-4 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  Belum ada foto galeri. Silakan tambah foto baru.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      {item.url ? (
                        <Image src={item.url} alt={item.title} fill className="object-cover" />
                      ) : (
                        <ImageIcon className="text-gray-400" />
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-900">{item.title}</td>
                  <td className="p-4 text-gray-500">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
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

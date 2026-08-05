"use client";

import { useState } from "react";
import umkmData from "@/data/umkm.json";
import Link from "next/link";
import { Plus, Trash2, Pencil, MapPin, Phone } from "lucide-react";
import Swal from "sweetalert2";

interface UmkmItem {
  id: string;
  name: string;
  product: string;
  category: string;
  location: string;
  phone?: string;
  price?: string;
}

export default function KelolaUmkm() {
  const [umkm, setUmkm] = useState<UmkmItem[]>(umkmData as UmkmItem[]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data UMKM yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/umkm?id=${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) throw new Error('Gagal menghapus UMKM');
        
        setUmkm(umkm.filter((item) => item.id !== id));
        Swal.fire('Terhapus!', 'Data UMKM berhasil dihapus.', 'success');
      } catch (error) {
        console.error("Error deleting umkm:", error);
        Swal.fire('Error!', 'Gagal menghapus UMKM.', 'error');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Kelola UMKM</h1>
        <Link
          href="/admin/umkm/tambah"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Tambah UMKM
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {umkm.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-100">
            Belum ada data UMKM. Silakan tambah UMKM baru.
          </div>
        ) : (
          umkm.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-heading font-semibold text-lg text-gray-900 line-clamp-1 pr-16">{item.name}</h3>
                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/admin/umkm/edit/${item.id}`}
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-primary font-medium text-sm mb-2">{item.product}</p>
              <span className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {item.category}
              </span>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary shrink-0" />
                  <span>{item.location}</span>
                </div>
                {item.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-primary shrink-0" />
                    <span>{item.phone}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
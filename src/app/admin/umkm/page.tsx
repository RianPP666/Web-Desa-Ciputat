"use client";

import { useState, useEffect, useCallback } from "react";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Plus, Trash2, Loader2, MapPin, Phone } from "lucide-react";

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
  const [umkm, setUmkm] = useState<UmkmItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUmkm = useCallback(async (): Promise<UmkmItem[]> => {
    const q = query(collection(db, "umkm"), orderBy("name"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as UmkmItem[];
  }, []);

  useEffect(() => {
    let active = true;
    fetchUmkm()
      .then(data => {
        if (active) setUmkm(data);
      })
      .catch(error => console.error("Error fetching umkm:", error))
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [fetchUmkm]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus UMKM ini?")) {
      try {
        await deleteDoc(doc(db, "umkm", id));
        const data = await fetchUmkm();
        setUmkm(data);
      } catch (error) {
        console.error("Error deleting umkm:", error);
        alert("Gagal menghapus UMKM.");
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

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
                <h3 className="font-heading font-semibold text-lg text-gray-900 line-clamp-1 pr-8">{item.name}</h3>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Hapus"
                >
                  <Trash2 size={18} />
                </button>
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
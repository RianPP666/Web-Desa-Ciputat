"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Plus, Trash2, Loader2, Calendar, MapPin, Clock } from "lucide-react";

export default function KelolaKegiatan() {
  const [kegiatan, setKegiatan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKegiatan();
  }, []);

  const fetchKegiatan = async () => {
    try {
      const q = query(collection(db, "events"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setKegiatan(data);
    } catch (error) {
      console.error("Error fetching kegiatan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kegiatan ini?")) {
      try {
        await deleteDoc(doc(db, "events", id));
        fetchKegiatan(); // Refresh data
      } catch (error) {
        console.error("Error deleting kegiatan:", error);
        alert("Gagal menghapus kegiatan.");
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Kelola Kegiatan</h1>
        <Link 
          href="/admin/kegiatan/tambah" 
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Tambah Kegiatan
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {kegiatan.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-100">
            Belum ada jadwal kegiatan. Silakan tambah kegiatan baru.
          </div>
        ) : (
          kegiatan.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-2 pr-8">
                  {item.title}
                </h3>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Hapus"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <span className={`inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium ${
                item.status === "Upcoming" ? "bg-primary/10 text-primary" : "bg-gray-200 text-gray-600"
              }`}>
                {item.status === "Upcoming" ? "Akan Datang" : "Selesai"}
              </span>

              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar size={16} className={item.status === "Upcoming" ? "text-primary" : "text-gray-400"} />
                  <span>{new Date(item.date).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock size={16} className={item.status === "Upcoming" ? "text-primary" : "text-gray-400"} />
                  <span>{item.time}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin size={16} className={item.status === "Upcoming" ? "text-primary" : "text-gray-400"} />
                  <span className="line-clamp-1">{item.location}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

"use client";

import newsData from "@/data/news.json";
import umkmData from "@/data/umkm.json";
import galleryData from "@/data/gallery.json";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dasbor</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium mb-2">Total Berita</h3>
          <p className="text-4xl font-bold text-primary">{newsData.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium mb-2">Total UMKM</h3>
          <p className="text-4xl font-bold text-primary">{umkmData.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium mb-2">Total Galeri</h3>
          <p className="text-4xl font-bold text-primary">{galleryData.length}</p>
        </div>
      </div>
    </div>
  );
}

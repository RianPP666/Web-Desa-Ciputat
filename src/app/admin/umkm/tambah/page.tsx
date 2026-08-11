"use client";

import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";
import { authFetch } from '@/lib/auth-fetch';

const CATEGORIES = ["Kuliner", "Kerajinan", "Fashion", "Pertanian", "Peternakan", "Jasa", "Lainnya"];

export default function TambahUmkm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    product: "",
    category: "Kuliner",
    price: "",
    location: "",
    phone: "",
    description: "",
  });

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "desaciputat");
    
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "hm7i9lin";
    
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });
    
    const data = await response.json();
    
    if (data.secure_url) {
      return data.secure_url;
    }
    throw new Error(data.error?.message || "Gagal mengunggah gambar");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Mohon pilih gambar untuk UMKM ini.'
        });
        setLoading(false);
        return;
      }

      // Save to JSON via API route
      const response = await authFetch('/api/umkm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
          createdAt: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal menyimpan ke file JSON');
      }

      await Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Berhasil menyimpan data UMKM!',
        timer: 1500,
        showConfirmButton: false
      });
      router.push("/admin/umkm");
    } catch (error) {
      console.error("Error adding document: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Terjadi kesalahan saat menyimpan UMKM.'
      });
    } finally {
      setLoading(false);
    }
  };

  const update = (key: keyof typeof formData, value: string) =>
    setFormData(prev => ({ ...prev, [key]: value }));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/umkm" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Tambah UMKM</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Usaha</label>
            <input type="text" required value={formData.name} onChange={(e) => update("name", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="Contoh: Kopi Alam Ciputat" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Produk Utama</label>
              <input type="text" required value={formData.product} onChange={(e) => update("product", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="Contoh: Kopi, Kripik, Kerajinan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select value={formData.category} onChange={(e) => update("category", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white">
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Pilih Foto Produk</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl relative overflow-hidden group">
              {imagePreview ? (
                <div className="absolute inset-0 w-full h-full">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" sizes="100%" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium">Klik untuk mengubah foto</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <span className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none">
                      Pilih foto dari komputer
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </div>
              )}
              <input 
                id="image"
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required={!imagePreview}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Harga (opsional)</label>
              <input type="text" value={formData.price} onChange={(e) => update("price", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="Contoh: Rp 15.000 / pack" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">No. WhatsApp</label>
              <input type="tel" value={formData.phone} onChange={(e) => update("phone", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="Contoh: 08123456789" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi/Alamat</label>
            <input type="text" required value={formData.location} onChange={(e) => update("location", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="Contoh: Dusun Karangsari, Desa Ciputat" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi (opsional)</label>
            <textarea rows={3} value={formData.description} onChange={(e) => update("description", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="Cerita singkat tentang usaha dan produk Anda..." />
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" disabled={loading}
              className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-70">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan UMKM"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
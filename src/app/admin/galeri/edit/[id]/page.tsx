"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";
import galleryData from "@/data/gallery.json";

export default function EditGaleri() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [existingImage, setExistingImage] = useState<string>("");
  
  const [formData, setFormData] = useState({
    title: "",
    category: "Pemerintahan"
  });

  useEffect(() => {
    // Cari data Galeri
    const item = galleryData.find((g) => g.id === id);
    if (item) {
      setFormData({
        title: item.title || "",
        category: item.category || "Pemerintahan"
      });
      if (item.url) {
        setExistingImage(item.url);
        setImagePreview(item.url);
      }
    } else {
      Swal.fire('Error', 'Data foto tidak ditemukan', 'error');
      router.push('/admin/galeri');
    }
  }, [id, router]);

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
      let imageUrl = existingImage;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      
      // Save data to JSON via API route using PUT
      const response = await fetch('/api/galeri', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          title: formData.title,
          category: formData.category,
          imageUrl: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal menyimpan ke file JSON');
      }
      
      await Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data foto berhasil diperbarui!',
        timer: 1500,
        showConfirmButton: false
      });
      router.push("/admin/galeri");
    } catch (error) {
      console.error("Error updating gallery:", error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Terjadi kesalahan saat memperbarui foto.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/galeri" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Foto Galeri</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Pilih Foto</label>
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
            <p className="text-xs text-gray-500 mt-2">*Biarkan jika Anda tidak ingin mengubah gambar</p>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Judul Foto</label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="Masukkan judul atau deskripsi foto..."
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
            >
              <option value="Pemerintahan">Pemerintahan</option>
              <option value="Kegiatan Desa">Kegiatan Desa</option>
              <option value="Pembangunan">Pembangunan</option>
              <option value="Alam & Potensi">Alam & Potensi</option>
            </select>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

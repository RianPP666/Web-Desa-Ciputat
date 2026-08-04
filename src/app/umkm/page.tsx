import UmkmCard from "@/components/cards/UmkmCard";
import FadeIn from "@/components/ui/FadeIn";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const metadata = {
  title: "UMKM",
  description: "Daftar usaha mikro, kecil, dan menengah (UMKM) warga Desa, lengkap dengan produk dan kontak pemesanan.",
};

interface UmkmItem {
  id: string;
  name: string;
  product: string;
  category: string;
  image?: string;
  price?: string;
  location: string;
  phone?: string;
  description?: string;
}

async function getUmkm(): Promise<UmkmItem[]> {
  try {
    const q = query(collection(db, "umkm"), orderBy("name"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as UmkmItem[];
  } catch (error) {
    console.error("Error fetching umkm:", error);
    return [];
  }
}

export const revalidate = 60;

export default async function UmkmPage() {
  const umkmData = await getUmkm();

  return (
    <div className="pt-24 pb-20">
      <div className="bg-section-bg py-16 mb-16 border-b border-border">
        <div className="container-custom text-center">
          <FadeIn>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              UMKM Desa
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Dukung usaha mikro warga sekitar. Pesan langsung lewat kontak yang tersedia.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container-custom">
        {umkmData.length === 0 ? (
          <p className="text-muted text-center py-16">Belum ada data UMKM.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {umkmData.map((item, index) => (
              <FadeIn key={item.id} delay={index * 0.1}>
                <UmkmCard {...item} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
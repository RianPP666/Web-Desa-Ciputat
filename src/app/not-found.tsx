import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-24 pb-20">
      <div className="container-custom text-center">
        <FadeIn>
          <h1 className="font-heading text-9xl font-bold text-primary mb-4 opacity-20">404</h1>
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4 -mt-16 relative z-10">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-muted text-lg max-w-md mx-auto mb-8 relative z-10">
            Maaf, halaman yang Anda cari mungkin telah dihapus, namanya diubah, atau tidak tersedia untuk sementara waktu.
          </p>
          <Link 
            href="/"
            className="inline-flex px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-secondary transition-all shadow-md relative z-10"
          >
            Kembali ke Beranda
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}

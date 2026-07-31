import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Ambil URL saat ini (contoh: desaciputat.devzonee.my.id atau admin.desaciputat.devzonee.my.id)
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Mengecek apakah ada kata "admin" di depan nama domain (sebagai subdomain)
  // Misalnya: admin.desaciputat.devzonee.my.id
  if (hostname.startsWith('admin.')) {
    
    // Cegah redirect berulang (infinite loop) jika URL sudah di dalam folder /admin
    if (!url.pathname.startsWith('/admin')) {
      // "Sembunyikan" URL aslinya ke pengunjung, tapi internal Next.js mengarahkannya ke folder /admin
      url.pathname = `/admin${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

// Hanya jalankan proxy ini pada request halaman (bukan pada file statis atau API)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

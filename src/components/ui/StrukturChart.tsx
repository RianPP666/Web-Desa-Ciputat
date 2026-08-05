"use client";

/**
 * Struktur Organisasi Desa Ciputat - Persis Papan Asli
 * 
 * Layout:
 *                     [Kepala Desa]
 *                           |
 *                           +————————————[Sekretaris Desa]
 *                           |                    |
 *                           |               —————————————
 *                           |                |           |
 *                           |            [Kaur Keu] [Kaur Umum]
 *                           |                |
 *                           |        [Kaur Perencanaan]
 *                           |
 *             ——————————————+——————————
 *             |             |         |
 *         [Kasi Pem] [Kasi Eko]   [Kasi Kesra]
 *                           |
 *          —————————————————+————————————————
 *          |      |         |         |      |
 *        [K.I] [K.II]   [K.III]   [K.IV] [K.V]
 */

interface BaganNode {
  position: string;
  name?: string;
  verticalChildren?: boolean;
  children?: BaganNode[];
}

function Card({ position, name }: { position: string; name: string }) {
  return (
    <div className="bg-white border-2 border-primary rounded-lg px-3 py-2 text-center shadow-sm" style={{ minWidth: 110, maxWidth: 150 }}>
      <p className="font-semibold text-xs text-foreground leading-snug">{position}</p>
      {name && <p className="text-[11px] text-muted mt-0.5">{name}</p>}
    </div>
  );
}

export default function StrukturChart({ root }: { root: BaganNode }) {
  const level1 = root.children?.[0]?.children || [];
  const sekretaris = level1.find(c => c.position === "Sekretaris Desa");
  const kasiList = level1.filter(c => c.position !== "Sekretaris Desa");
  const kaurList = sekretaris?.children || [];
  const kadusList = root.children?.[1]?.children || [];

  const kaurKeuangan = kaurList.find(k => k.position === "Kaur Keuangan");
  const kaurUmum = kaurList.find(k => k.position.includes("Umum"));
  const kaurPerencanaan = kaurList.find(k => k.position === "Kaur Perencanaan");

  // Posisi X garis utama (spine) = 42%
  const SPINE = "42%";

  return (
    <div className="overflow-x-auto pb-4">
      <div style={{ width: 900, position: "relative", height: 700, margin: "0 auto" }}>

        {/* ========== GARIS VERTIKAL UTAMA (spine) ========== */}
        {/* Satu garis lurus terus menerus dari Kepala Desa sampai level Kadus */}
        <div style={{ position: "absolute", left: SPINE, top: 50, width: 2, height: 510, background: "#d1d5db" }} />

        {/* ========== GARIS HORIZONTAL: spine → Sekretaris (ke kanan) ========== */}
        <div style={{ position: "absolute", left: SPINE, top: 90, width: "23%", height: 2, background: "#d1d5db" }} />

        {/* ========== GARIS Sekretaris → Kaur ========== */}
        {/* Vertikal dari Sekretaris turun */}
        <div style={{ position: "absolute", left: "65%", top: 140, width: 2, height: 30, background: "#d1d5db" }} />
        {/* Horizontal cabang Kaur atas */}
        <div style={{ position: "absolute", left: "53%", top: 170, width: "24%", height: 2, background: "#d1d5db" }} />
        {/* Vertikal ke Kaur Keuangan */}
        <div style={{ position: "absolute", left: "53%", top: 170, width: 2, height: 16, background: "#d1d5db" }} />
        {/* Vertikal ke Kaur Umum */}
        <div style={{ position: "absolute", left: "77%", top: 170, width: 2, height: 16, background: "#d1d5db" }} />
        {/* Vertikal dari Kaur Keuangan turun ke Kaur Perencanaan (tepat di bawah Kaur Keuangan) */}
        <div style={{ position: "absolute", left: "53%", top: 230, width: 2, height: 30, background: "#d1d5db" }} />

        {/* ========== GARIS HORIZONTAL: Kasi (bercabang dari spine) ========== */}
        {/* Kasi Pemerintahan & Kasi Ekonomi di KIRI spine */}
        <div style={{ position: "absolute", left: "10%", top: 370, width: "32%", height: 2, background: "#d1d5db" }} />
        {/* Kasi Kesra di KANAN spine */}
        <div style={{ position: "absolute", left: SPINE, top: 370, width: "33%", height: 2, background: "#d1d5db" }} />
        {/* Vertikal ke Kasi Pemerintahan */}
        <div style={{ position: "absolute", left: "10%", top: 370, width: 2, height: 16, background: "#d1d5db" }} />
        {/* Vertikal ke Kasi Ekonomi & Pembangunan */}
        <div style={{ position: "absolute", left: "27%", top: 370, width: 2, height: 16, background: "#d1d5db" }} />
        {/* Vertikal ke Kasi Kesra */}
        <div style={{ position: "absolute", left: "75%", top: 370, width: 2, height: 16, background: "#d1d5db" }} />

        {/* ========== GARIS HORIZONTAL: Kadus (bercabang dari spine) ========== */}
        <div style={{ position: "absolute", left: "6%", top: 560, width: "72%", height: 2, background: "#d1d5db" }} />
        {/* Vertikal ke tiap Kadus */}
        <div style={{ position: "absolute", left: "6%", top: 560, width: 2, height: 16, background: "#d1d5db" }} />
        <div style={{ position: "absolute", left: "24%", top: 560, width: 2, height: 16, background: "#d1d5db" }} />
        <div style={{ position: "absolute", left: SPINE, top: 560, width: 2, height: 16, background: "#d1d5db" }} />
        <div style={{ position: "absolute", left: "60%", top: 560, width: 2, height: 16, background: "#d1d5db" }} />
        <div style={{ position: "absolute", left: "78%", top: 560, width: 2, height: 16, background: "#d1d5db" }} />

        {/* ==================== CARDS ==================== */}

        {/* Kepala Desa */}
        <div style={{ position: "absolute", left: SPINE, top: 0, transform: "translateX(-50%)" }}>
          <Card position={root.position} name={root.name || ""} />
        </div>

        {/* Sekretaris Desa */}
        <div style={{ position: "absolute", left: "65%", top: 92, transform: "translateX(-50%)" }}>
          <Card position={sekretaris?.position || ""} name={sekretaris?.name || ""} />
        </div>

        {/* Kaur Keuangan */}
        <div style={{ position: "absolute", left: "53%", top: 186, transform: "translateX(-50%)" }}>
          <Card position={kaurKeuangan?.position || ""} name={kaurKeuangan?.name || ""} />
        </div>

        {/* Kaur Umum & TU */}
        <div style={{ position: "absolute", left: "77%", top: 186, transform: "translateX(-50%)" }}>
          <Card position={kaurUmum?.position || ""} name={kaurUmum?.name || ""} />
        </div>

        {/* Kaur Perencanaan (tepat di bawah Kaur Keuangan) */}
        <div style={{ position: "absolute", left: "53%", top: 260, transform: "translateX(-50%)" }}>
          <Card position={kaurPerencanaan?.position || ""} name={kaurPerencanaan?.name || ""} />
        </div>

        {/* Kasi Pemerintahan (kiri spine) */}
        <div style={{ position: "absolute", left: "10%", top: 386, transform: "translateX(-50%)" }}>
          <Card position={kasiList[0]?.position || ""} name={kasiList[0]?.name || ""} />
        </div>

        {/* Kasi Ekonomi & Pembangunan (kiri spine, sebelah kanan Kasi Pem) */}
        <div style={{ position: "absolute", left: "27%", top: 386, transform: "translateX(-50%)" }}>
          <Card position={kasiList[1]?.position || ""} name={kasiList[1]?.name || ""} />
        </div>

        {/* Kasi Kesra (kanan spine) */}
        <div style={{ position: "absolute", left: "75%", top: 386, transform: "translateX(-50%)" }}>
          <Card position={kasiList[2]?.position || ""} name={kasiList[2]?.name || ""} />
        </div>

        {/* Kadus */}
        {kadusList.map((kadus, i) => {
          const positions = ["6%", "24%", "42%", "60%", "78%"];
          return (
            <div key={i} style={{ position: "absolute", left: positions[i], top: 576, transform: "translateX(-50%)" }}>
              <Card position={kadus.position} name={kadus.name || ""} />
            </div>
          );
        })}

      </div>
    </div>
  );
}
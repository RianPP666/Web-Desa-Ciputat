"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import settingsData from "@/data/settings.json";
import Image from "next/image";

interface NavLink {
  name: string;
  path: string;
  children?: { name: string; path: string }[];
}

const NAV_LINKS: NavLink[] = [
  { name: "Beranda", path: "/" },
  { name: "Profil Desa", path: "/profil" },
  { name: "Berita", path: "/berita" },
  { name: "Galeri", path: "/galeri" },
  {
    name: "Potensi & UMKM",
    path: "/potensi",
    children: [
      { name: "Potensi Desa", path: "/potensi" },
      { name: "UMKM", path: "/umkm" },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-white py-5"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 relative rounded-full overflow-hidden shrink-0">
              <Image src="/logo-kuningan.png" alt="Logo Desa Ciputat" fill className="object-cover" sizes="40px" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg text-foreground leading-tight">
                {settingsData.villageName}
              </span>
              <span className="text-xs text-muted">Kec. Ciawigebang</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path;
              if (link.children) {
                return (
                  <div key={link.name} className="relative group">
                    <Link
                      href={link.path}
                      className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                        isActive ? "text-primary font-semibold" : "text-foreground"
                      }`}
                    >
                      {link.name}
                      <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                    </Link>
                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-white shadow-lg border border-border rounded-xl py-2 min-w-[180px]">
                        {link.children.map((child) => {
                          const childActive = pathname === child.path;
                          return (
                            <Link
                              key={child.path}
                              href={child.path}
                              className={`block px-4 py-2 text-sm transition-colors ${
                                childActive
                                  ? "text-primary font-semibold"
                                  : "text-foreground hover:text-primary"
                              }`}
                            >
                              {child.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary font-semibold" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Menu navigasi mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg lg:hidden"
          >
            <div className="container-custom py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <div key={link.name} className="flex flex-col gap-1">
                  <Link
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 text-base font-medium transition-colors hover:text-primary ${
                      pathname === link.path ? "text-primary font-semibold" : "text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                  {link.children && (
                    <div className="flex flex-col gap-1 pl-4 border-l-2 border-border">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          onClick={() => setIsOpen(false)}
                          className={`block py-1.5 text-sm transition-colors hover:text-primary ${
                            pathname === child.path ? "text-primary font-semibold" : "text-muted"
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
"use client";

import Link from "next/link";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import { Menu, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/store";

const LANGS = ["RU", "TJ", "EN"] as const;
type Lang = typeof LANGS[number];

export default function Header() {
  const { isSignedIn } = useUser();
  const [lang, setLang] = useState<Lang>("RU");
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl md:text-3xl font-serif font-bold tracking-[0.2em] hover:opacity-70 transition-opacity">
          ZHIWJ
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-xs uppercase tracking-widest">
          <Link href="/?col=Tamaddoon" className="hover:text-gray-500 transition-colors">Tamaddoon</Link>
          <Link href="/?col=Metomorfoz" className="hover:text-gray-500 transition-colors">Metomorfoz</Link>
          <Link href="/?col=Bahor" className="hover:text-gray-500 transition-colors">Bahor</Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Language Switcher */}
          <div className="flex gap-3 text-xs font-bold tracking-wider cursor-pointer">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`${lang === l ? "text-black underline underline-offset-4" : "text-gray-400 hover:text-gray-600"} transition-all`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Cart */}
          <Link href="/cart" className="relative p-2 hover:bg-gray-50 rounded-full transition-colors">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Admin Menu (Hidden - 3 dots) */}
          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
            
            {/* Dropdown */}
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-2xl border border-gray-100 rounded-lg z-50 overflow-hidden">
                  {isSignedIn ? (
                    <>
                      <Link 
                        href="/studio" 
                        className="block px-4 py-3 text-sm hover:bg-gray-50 transition-colors border-b border-gray-50"
                        onClick={() => setMenuOpen(false)}
                      >
                        Админ-панель
                      </Link>
                      <SignOutButton>
                        <button className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-gray-50 transition-colors">
                          Выйти
                        </button>
                      </SignOutButton>
                    </>
                  ) : (
                    <SignInButton mode="modal">
                      <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors">
                        Вход для сотрудников
                      </button>
                    </SignInButton>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/dashboard' },
  { label: 'Subjects', href: '/subjects' },
  { label: 'Attendance Overview', href: '/attendance' },
  { label: 'Settings', href: '/settings' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      {/* Topbar for desktop/tablet */}
      <header className="hidden md:flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900 w-full z-40">
        <div className="text-2xl font-extrabold bg-gradient-to-r from-[#6366f1] via-[#38bdf8] to-[#22c55e] bg-clip-text text-transparent drop-shadow-lg select-none">Bunkify</div>
        <nav className="flex gap-4">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-full px-6 py-3 text-sm font-semibold bg-gradient-to-r from-[#6366f1] to-[#22c55e] text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 hover:from-[#6366f1] hover:to-[#38bdf8] hover:scale-105 ${pathname === href ? 'ring-2 ring-[#38bdf8]' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Mobile Hamburger & Overlay Menu */}
      <div className="md:hidden">
        <header className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900 w-full z-40">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-[#6366f1] via-[#38bdf8] to-[#22c55e] bg-clip-text text-transparent drop-shadow-lg select-none">Bunkify</div>
          <button
            className="p-3 rounded-full bg-slate-800 bg-opacity-80 shadow-lg focus:outline-none"
            onClick={() => setIsOpen(true)}
          >
            <span className="text-2xl">☰</span>
          </button>
        </header>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-64 glass shadow-2xl backdrop-blur-lg bg-opacity-80 z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6">
                <div className="text-2xl font-extrabold bg-gradient-to-r from-[#6366f1] via-[#38bdf8] to-[#22c55e] bg-clip-text text-transparent drop-shadow-lg select-none">Bunkify</div>
                <button
                  className="text-2xl p-2 rounded-full hover:bg-slate-700 focus:outline-none"
                  onClick={() => setIsOpen(false)}
                >
                  ×
                </button>
              </div>
              <nav className="flex-1 space-y-2 mt-4 px-4">
                {navItems.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-full px-6 py-3 text-base font-semibold bg-gradient-to-r from-[#6366f1] to-[#22c55e] text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 hover:from-[#6366f1] hover:to-[#38bdf8] hover:scale-105 mb-2 ${pathname === href ? 'ring-2 ring-[#38bdf8]' : ''}`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Overlay background when menu is open */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}

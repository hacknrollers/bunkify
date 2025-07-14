'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Subjects', href: '/subjects' },
  { label: 'Timetable', href: '/timetable' },
  { label: 'Overview', href: '/overview' },
  { label: 'Settings', href: '/settings' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: 0 }}
        animate={{ width: isOpen ? 200 : 60 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full bg-slate-800 shadow-lg z-40"
      >
        <div className="flex flex-col h-full">
          <button
            className="p-4 focus:outline-none hover:bg-slate-700 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-xl">{isOpen ? '←' : '☰'}</span>
          </button>
          <nav className="flex-1 space-y-2 mt-4">
            {navItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`block px-4 py-2 rounded-md text-sm hover:bg-slate-700 transition ${
                  pathname === href ? 'bg-slate-700 font-bold' : ''
                }`}
              >
                {isOpen ? label : label[0]}
              </Link>
            ))}
          </nav>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 pl-[60px] md:pl-[200px] flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900">
          <div className="text-xl font-semibold">Tuoi Dinh</div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition">
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

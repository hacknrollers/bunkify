"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const router = useRouter();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      const storedKey = localStorage.getItem("aiApiKey");
      if (storedKey) setApiKey(storedKey);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("aiApiKey", apiKey);
    alert("API Key saved!");
  };

  const handleReset = () => {
    if (confirm("Clear all local data?")) {
      localStorage.clear();
      alert("All data cleared.");
      router.push("/landing");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out!");
    router.push("/landing");
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-b from-[#0f172a] to-[#020617] overflow-x-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl sm:text-5xl font-extrabold mb-10 bg-gradient-to-r from-[#6366f1] via-[#38bdf8] to-[#22c55e] bg-clip-text text-transparent drop-shadow-lg text-center leading-tight"
      >
        Settings
      </motion.h1>

      <form onSubmit={handleSave} className="w-full max-w-md space-y-6 z-10">
        <div>
          <label className="block text-white text-sm mb-2">Your AI API Key</label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#1e293b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your OpenAI key"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full rounded-full px-6 py-3 text-white font-semibold bg-gradient-to-r from-[#6366f1] to-[#22c55e] shadow-lg hover:shadow-xl transition-all"
        >
          Save API Key
        </motion.button>
      </form>

      <div className="w-full max-w-md mt-10 space-y-4 z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="w-full rounded-full px-6 py-3 bg-red-600 text-white font-semibold shadow hover:bg-red-700"
        >
          Reset All Data
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full rounded-full px-6 py-3 bg-yellow-500 text-black font-semibold shadow hover:bg-yellow-600"
        >
          Logout
        </motion.button>
      </div>

      <footer className="mt-16 text-xs text-white opacity-60 text-center">
        Built with ❤️ by Open Source contributors.
      </footer>
    </div>
  );
}

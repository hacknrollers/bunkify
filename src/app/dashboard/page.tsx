"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  picture: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (!userData) {
        router.replace("/");
      } else {
        setUser(JSON.parse(userData));
      }
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#6366f1] via-[#38bdf8] to-[#22c55e] bg-clip-text text-transparent drop-shadow-lg">Hello, {user.name}!</h1>
      <p className="text-lg sm:text-xl text-body mb-8">Welcome to your dashboard.</p>
    </div>
  );
} 
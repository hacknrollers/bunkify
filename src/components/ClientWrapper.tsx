"use client";
import { usePathname } from "next/navigation";
import AppLayout from "@/components/AppLayout";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/landing") {
    return <>{children}</>;
  }
  return <AppLayout>{children}</AppLayout>;
} 
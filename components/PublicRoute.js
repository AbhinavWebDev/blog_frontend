// components/PublicRoute.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function PublicRoute({ children }) {
  const router = useRouter();
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (token) {
      router.push("/"); 
    }
  }, [token, router]);

  if (token) {
    return <p className="text-center mt-10">Redirecting...</p>;
  }

  return <>{children}</>;
}

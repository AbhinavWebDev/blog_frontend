// components/ProtectedRoute.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token, router]);

  if (!token) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  return <>{children}</>;
}

// components/ProtectedRoute.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function AdminProtectedRoute({ children }) {
  const router = useRouter();
  const token = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!token||user.role!=='ADMIN') {
      router.push("/auth/login");
    }
  }, [token, router]);

  if (!token||user.role!=='ADMIN') {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  return <>{children}</>;
}

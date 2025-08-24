// app/login/page.js
import PublicRoute from "@/components/PublicRoute";
import Login from "@/components/Login";

export default function LoginPage() {
  return (
    <PublicRoute>
      <Login />
    </PublicRoute>
  );
}

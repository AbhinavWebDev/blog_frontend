// app/login/page.js
import PublicRoute from "@/components/PublicRoute";
import Register from "@/components/Register";

export default function RegisterPage() {
  return (
    <PublicRoute>
      <Register />
    </PublicRoute>
  );
}

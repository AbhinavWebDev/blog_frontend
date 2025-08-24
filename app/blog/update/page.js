// app/login/page.js
import ProtectedRoute from "@/components/ProtectedRoute";
import BlogForm from "@/components/BlogForm";

export default function BlogUpdatePage() {
  return (
    <ProtectedRoute>
      <BlogForm />
    </ProtectedRoute>
  );
}

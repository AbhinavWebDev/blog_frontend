"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, message, notification } from "antd";
import useAuthStore from "@/store/authStore";

export default function Navbar() {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    console.log("called logout");
    try {
      await logout();
     
    } catch (err) {
      console.log(err);
      
    }

  };

  return (
    <div className="shadow-md mb-6">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Brand */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          MyBlog
        </Link>

        {/* Menu */}
        <Menu mode="horizontal" selectable={false} className="flex-1 justify-end border-0">
          <Menu.Item key="home">
            <Link href="/">Home</Link>
          </Menu.Item>

          {!user && (
            <>
              <Menu.Item key="login">
                <Link href="/auth/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="register">
                <Link href="/auth/register">Register</Link>
              </Menu.Item>
            </>
          )}

          {user && (
            <>
              <Menu.Item key="dashboard">
                <Link href="/blog/create">Create</Link>
              </Menu.Item>
              <Menu.Item key="profile">
                <Link href="/dashboard/profile">Profile</Link>
              </Menu.Item>
              <Menu.Item key="profile">
                <Link href="/dashboard/profile">My Blogs</Link>
              </Menu.Item>
              <Menu.Item key="logout" onClick={handleLogout}>
                Logout
              </Menu.Item>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
}

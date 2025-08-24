"use client";

import Link from "next/link";
import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import useAuthStore from "@/store/authStore";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  // Menu Items
  const menuItems = (
    <Menu mode="vertical" selectable={false} className="border-0">
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
      {user?.role === "ADMIN" && (
        <Menu.Item key="userlist">
          <Link href="/user/userlist">Users</Link>
        </Menu.Item>
      )}
      {user && (
        <>
          <Menu.Item key="dashboard">
            <Link href="/blog/create">Create</Link>
          </Menu.Item>
          <Menu.Item key="profile">
            <Link href="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="logout" onClick={handleLogout}>
            Logout
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <div className="shadow-md mb-6">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Brand */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          MyBlog
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:block flex-1">
          <Menu mode="horizontal" selectable={false} className="flex justify-end border-0">
            {menuItems.props.children}
          </Menu>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setOpen(true)}
          />
          <Drawer
            placement="right"
            closable
            onClose={() => setOpen(false)}
            open={open}
          >
            {menuItems}
          </Drawer>
        </div>
      </div>
    </div>
  );
}

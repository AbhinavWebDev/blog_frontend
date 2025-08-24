"use client";

import { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";
import userApi from "@/utils/userApi";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await userApi.getAllProfile();
        console.log(res);
        setUsers(res.data.data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, [trigger]);

  const onDelete = async (userId) => {
    setLoading(true);
    try {


      await userApi.deleteProfile(userId);
      setTrigger(Date.now)
      // notification.success({ message: "Post updated successfully" });

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminProtectedRoute>
    <div className="grid gap-4">
      {users.map((user) => (
        <UserCard key={user._id} user={user} onDelete={onDelete} />
      ))}
    </div>
    </AdminProtectedRoute>
  );
}

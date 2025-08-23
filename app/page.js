"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/post");
        setPosts(res.data.data);
      } catch (err) {
        console.error("Error fetching posts", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

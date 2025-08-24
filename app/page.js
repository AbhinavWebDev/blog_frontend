"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import PostCard from "@/components/PostCard";
import postApi from "@/utils/postApi";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await postApi.getposts();
        setPosts(res.data.data);
      } catch (err) {
        console.error("Error fetching posts", err);
      }
    };
    fetchPosts();
  }, [trigger]);

  const onDelete = async (postId) => {
    setLoading(true);
    try {
     
       
        await postApi.deletePost(postId);
        setTrigger(Date.now)
        // notification.success({ message: "Post updated successfully" });
      
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} onDelete={onDelete} />
      ))}
    </div>
  );
}

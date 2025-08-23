"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import { Card } from "antd";

export default function BlogDetailPage() {
  const params = useParams();
  const [post, setPost] = useState(null);
  console.log(post);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/post/${params.id}`);
        setPost(res.data.data);
      } catch (err) {
        console.error("Error fetching post", err);
      }
    };
    fetchPost();
  }, [params.id]);

  if (!post) return <p>Loading...</p>;

  return (
    <Card>
      <h1 className="text-2xl font-bold">{post?.title}</h1>
      <p className="text-gray-600">{post?.content}</p>
      <p className="text-sm text-gray-500 mt-2">By {post?.author?.name}</p>
    </Card>
  );
}

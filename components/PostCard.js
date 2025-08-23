"use client";

import Link from "next/link";
import { Card } from "antd";

export default function PostCard({ post }) {
  return (
    <Card
      title={
        <Link href={`/blog/${post._id}`} className="text-lg font-semibold hover:underline">
          {post.title}
        </Link>
      }
      className="shadow-md rounded-lg"
    >
      <p className="text-gray-700 line-clamp-3">{post.content}</p>
      <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
        <span>By {post.author?.name || "Unknown"}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </Card>
  );
}

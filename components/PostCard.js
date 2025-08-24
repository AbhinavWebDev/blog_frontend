"use client";

import Link from "next/link";
import { Card, Button, Popconfirm } from "antd";
import useAuthStore  from "@/store/authStore";

export default function PostCard({ post,onDelete }) {
  const user = useAuthStore((state) => state.user);

  const canEditOrDelete =
    user && (user.type === "ADMIN" || user.id === post.author?._id);
    
  return (
    <Card
      title={
        <Link
          href={`/blog/${post._id}`}
          className="text-lg font-semibold hover:underline"
        >
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

      <div className="flex justify-between items-center mt-4">
        {/* View More always visible */}
        <Link href={`/blog/${post._id}`}>
          <Button type="default" size="small">
            View More
          </Button>
        </Link>

       
        {canEditOrDelete && (
          <div className="space-x-2">
             <Link href={`/blog/update?id=${post._id}`}>

          
            <Button
              type="primary"
              size="small"
              
            >
              Edit
            </Button>
            </Link>
            <Popconfirm
              title="Are you sure delete this post?"
              onConfirm={() => onDelete(post._id)}
            >
              <Button danger size="small">
                Delete
              </Button>
            </Popconfirm>
          </div>
        )}
      </div>
    </Card>
  );
}

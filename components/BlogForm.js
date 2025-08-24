"use client";

import { useEffect, useState } from "react";
import { Card, Button, Form, Input, notification, Spin } from "antd";
import postApi from "@/utils/postApi";
import { useSearchParams } from "next/navigation";

export default function PostFormPage() {
  const [form] = Form.useForm();
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const postId = searchParams.get('id')
console.log(postId);
  // If you want to load a post for editing (example: /posts/edit/:id)
  // You could fetch it here
  useEffect(() => {
    
    if (postId) {
      fetchPost(postId);
    }
  }, [postId]);

  const fetchPost = async (id) => {
    setLoading(true);
    try {
      const res = await postApi.getSinglePost(id);
      console.log(res);
      setEditingPost(res.data.data);
      form.setFieldsValue({
        title: res.data.data.title,
        content: res.data.data.content,
      });
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Failed to load post",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (editingPost) {
       console.log("yess edit");
        await postApi.updatePost(editingPost._id, values);
        notification.success({ message: "Post updated successfully" });
      } else {
       
        await postApi.createPost( values);
        
        form.resetFields();
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin size="large" className="flex justify-center mt-20" />;

  return (
    <div className="p-6 flex justify-center">
      <Card title={editingPost ? "Edit Post" : "Create Post"} className="w-full max-w-2xl">
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please enter content" }]}
          >
            <Input.TextArea rows={6} placeholder="Write something..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {editingPost ? "Update Post" : "Create Post"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

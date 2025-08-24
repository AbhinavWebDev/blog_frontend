"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, Input, Button, Card, message } from "antd";
import userApi from "@/utils/userApi";


export default function UserEditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id')
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await userApi.getSingleProfile(userId);
        setUser(res.data);
        console.log(res.data);
        form.setFieldsValue(res.data);
      } catch (err) {
        message.error("Failed to load user");
      }
    }
    fetchUser();
  }, [ form]);

  // ✅ submit changes
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await userApi.updateProfile(userId,values);
    
      
      router.push("/user/userlist"); // redirect after update
    } catch (err) {
      message.error(err.message || "Error updating user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card title="Edit User" className="shadow-md rounded-xl">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={user || {}}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="Enter email" />
          </Form.Item>

          

          <div className="flex justify-end gap-2">
            <Button onClick={() => router.back()}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Changes
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

"use client";

import { Form, Input, Button, Card } from "antd";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const register = useAuthStore((s) => s.register);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);

  const onFinish = async (values) => {
    try {
      await register(values);

    } catch (err) {

      console.error(err);

    }
  };

  return (
    <div className="flex justify-center items-center max-h-screen">
      <Card title="Register" className="w-96">
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          {error && <p className="bg-red-500 my-4">{error}</p>}

          <Button type="primary" htmlType="submit" block loading={loading}>
                        {loading ? "loading..." : "Register"}
                    </Button>
                    <div className="flex justify-center items-center mt-4 gap-1">
                <p className="text-center text-sm">Already have an account?</p>
                    <Link href="/auth/login" className="hover:underline text-blue-600">
          Login
        </Link>

                </div>
        </Form>
      </Card>
    </div>
  );
}

"use client";

import { Form, Input, Button, Card, notification, message } from "antd";
import useAuthStore from "@/store/authStore";
import Link from "next/link";

export default function LoginPage() {
    const login = useAuthStore((s) => s.login);
    const loading = useAuthStore((s) => s.loading);
    const error = useAuthStore((s) => s.error);

    const onFinish = async (values) => {
        try {
            login(values);
        } catch (err) {

            console.error('Login Failed')

        }
    };


    return (
        <div className="flex justify-center items-center max-h-screen">
            <Card title="Login" className="w-96">
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Please enter your email" },
                            { type: "email", message: "Please enter a valid email" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: "Please enter your password" }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    {error && <p className="bg-red-500 my-4">{error}</p>}
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                <div className="flex justify-center items-center mt-4 gap-1">
                <p className="text-center text-sm">Don't have an account?</p>
                    <Link href="/auth/register" className="hover:underline text-blue-600">
          Register
        </Link>

                </div>
                   
                </Form>
            </Card>
        </div>
    );
}

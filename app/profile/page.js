"use client";

import { useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import useAuthStore from "@/store/authStore";

export default function ProfilePage() {
  
    const user = useAuthStore((s) => s.user);
    const updateProfile = useAuthStore((s) => s.updateProfile);
    const loading = useAuthStore((s) => s.loading);
    const error = useAuthStore((s) => s.error);
    const [form] = Form.useForm();



    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                name: user.name,
                email: user.email,
                password: "",
            });
        }
    }, [user, form]);

    const onFinish = async (values) => {
        try {

            await updateProfile(values);


        } catch (err) {
            console.error(err)
        }
    };



    return (
        <div className="flex justify-center mt-10">
            <Card title="My Profile" className="w-full max-w-lg shadow-md rounded-2xl">
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                        <Input placeholder="Enter your name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, type: "email" }]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { min: 6, message: "Password must be at least 6 characters" },
                        ]}
                    >
                        <Input.Password placeholder="Enter new password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            {loading ? "Saving...." : "Save Changes"}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

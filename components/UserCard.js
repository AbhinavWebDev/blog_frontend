"use client";

import { Card, Button, Popconfirm } from "antd";
import Link from "next/link";

export default function UserCard({ user, onEdit, onDelete, loading = false }) {
    return (
        <Card className="shadow-md rounded-lg">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold">{user?.name || "Unnamed User"}</h3>
                    <p className="text-gray-600">{user?.email || "no-email@example.com"}</p>
                </div>

                <div className="space-x-2">
                <Link href={`/user/update?id=${user._id}`}>
                        <Button
                            type="primary"
                            size="small"

                            disabled={loading}
                        >
                            Edit
                        </Button>
                    </Link>
                    <Popconfirm
                        title="Delete this user?"
                        description="This action cannot be undone."
                        onConfirm={() => onDelete?.(user?._id)}
                        okButtonProps={{ danger: true }}
                    >
                        <Button danger size="small" loading={loading}>
                            Delete
                        </Button>
                    </Popconfirm>
                </div>
            </div>
        </Card>
    );
}

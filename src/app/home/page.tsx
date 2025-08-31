"use client";
import { Form, Input, Button, Card } from "antd";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saveData, setSaveData] = useState<
    {
      name: string;
      email: string;
    }[]
  >([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    if (data) {
      setSaveData(JSON.parse(data));
    }
  }, []);

  const handleSubmit = (values: { name: string; email: string }) => {
    const currentData = Array.isArray(saveData) ? saveData : [];
    const updateData = [...currentData, values];

    localStorage.setItem("userInfo", JSON.stringify(updateData));
    setSaveData(updateData);
    form.resetFields();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex gap-2 justify-center items-center">
      <div className="bg-white flex-1/2 flex justify-center items-center flex-col gap-2 rounded-2xl shadow-md h-[400px]">
      <p className="font-bold text-2xl">Welcome to Rick & Morty</p>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Confirm
          </Button>
        </Form>
      </div>

      <div className="w-2/3">
        {saveData.length > 0 ? (
          <div className="flex flex-wrap gap-6">
            {saveData.map((item, index) => (
              <Card
                key={index}
                title={`User ${index + 1}`}
                className="w-64 shadow-md rounded-xl"
              >
                <p>
                  <strong>Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Email:</strong> {item.email}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <p>No users saved yet.</p>
        )}
      </div>
    </div>
  );
}

"use client";
import { Form, Input, Button, Card } from "antd";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex gap-2 justify-center items-center">
      <div className="bg-white dark:bg-amber-300 flex-1/2 flex justify-center items-center flex-col gap-2 rounded-2xl shadow-md h-[400px]">
        <p className="font-bold text-2xl">{t("title")}</p>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label={t("nameLabel")} name="name">
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item label={t("emailLabel")} name="email">
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {t("confirmButton")}
          </Button>
        </Form>
      </div>

      <div className="w-2/3">
        {saveData.length > 0 ? (
          <div className="flex flex-wrap gap-6">
            {saveData.map((item, index) => (
              <Card
                key={index}
                title={t("userCard", { index: index + 1 })}
                className="w-64 shadow-md rounded-xl"
              >
                <p>
                  <strong>{t("nameLabel")}:</strong> {item.name}
                </p>
                <p>
                  <strong>{t("emailLabel")}:</strong> {item.email}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <p>{t("noUsers")}</p>
        )}
      </div>
    </div>
  );
}

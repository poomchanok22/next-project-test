"use client";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useTheme } from "next-themes";
import NavBar from "@/components/NavBar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
      <NavBar />
      <main>{children}</main>
    </ConfigProvider>
  );
}

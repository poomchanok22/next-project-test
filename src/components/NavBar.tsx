"use client";
import { Menu, Dropdown, Button, Switch } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import type { MenuProps } from "antd";
import { useTheme } from "next-themes";

export default function NavBar() {
  const pathName = usePathname();
  const router = useRouter();
  const t = useTranslations("NavBar");
  const locale = useLocale();
  const { theme, setTheme } = useTheme();

  const changeLocale = (nextLocale: string) => {
    router.push(`/${nextLocale}${pathName.replace(/^\/(en|th)/, "")}`);
  };

  const navBarItems = [
    { key: "/home", label: <Link href="/home">{t("home")}</Link> },
    {
      key: "/character",
      label: <Link href="/character">{t("character")}</Link>,
    },
    { key: "/about", label: <Link href="/about">{t("about")}</Link> },
    { key: "/contact", label: <Link href="/contact">{t("contact")}</Link> },
  ];

  const languageMenu: MenuProps["items"] = [
    {
      key: "en",
      label: t("english"),
      onClick: () => changeLocale("en"),
    },
    {
      key: "th",
      label: t("thai"),
      onClick: () => changeLocale("th"),
    },
  ];

  return (
    <div className="bg-white shadow-md px-6 flex items-center h-16">
      <div className="text-lg font-bold mr-10">Rick and Morty</div>
      <Menu
        mode="horizontal"
        selectedKeys={[pathName]}
        items={navBarItems}
        className="flex-1 border-0"
      />
      <Dropdown menu={{ items: languageMenu }} placement="bottomRight">
        <Button>
          {t("language")} ({locale})
        </Button>
      </Dropdown>
      <Switch
        checked={theme === "dark"}
        onChange={(checked) => setTheme(checked ? "dark" : "light")}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
      />
    </div>
  );
}

"use client"
import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar(){
  const pathName = usePathname()
  

  const items = [
    {key: '/home', label:<Link href="/home">Home</Link>},
    {key: '/character', label:<Link href="/character">Character</Link>},
    {key: '/about', label: <Link href="/about">About</Link>},
    {key: '/contact', label: <Link href='contact'>Contact</Link>}
  ]
  return(
    <div className="bg-white shadow-md px-6 flex items-center h-16">
      <div className="text-lg font-bold mr-10">Rick and Morty</div>
      <Menu 
        mode="horizontal"
        selectedKeys={[pathName]}
        items={items}
        className="flex-1 border-0"
      />
    </div>
  )
}

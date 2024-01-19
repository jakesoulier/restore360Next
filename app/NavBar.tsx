'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import classNames from "classnames"


const NavBar = () => {

  const currentPath = usePathname()

  const links= [
    { href: '/', label: 'Dashboard' },
    { href: '/contacts', label: 'Contacts' },
  ]
  return (
    <nav className="flex items-stretch gap-x-8 bg-gray-200 mb-4">
      <Link href='/' className="p-4">
        <Image 
          src='/restoreLogo.png'
          alt='Restore Logo'
          width={50}
          height={50}
          priority
        />
      </Link>
      {links.map(link => (
        <Link
          key={link.href}
          className={classNames({
            'text-zinc-900 font-bold' : link.href === currentPath,
            'text-zinc-500' : link.href !== currentPath,
            'flex items-center hover:bg-gray-500 hover:text-white p-1' : true,
          })
          }
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export default NavBar
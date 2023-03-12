import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import LogoutBtn from '../common/LogoutBtn';
import NavbarSetup from './Links';

const NavbarMenu = () => {
  return (
    <div className="block bg-[#023059] h-screen py-3 w-64 flex flex-col justify-between text-neutral-500">
      <div className="flex flex-col self-center">
        <Image
                      src="/Logo.svg"
                      alt="ORS Logo"
                      width={80}
                      height={80}
                      priority
                      className="py-3 self-center"
                    />
        <Link href="./" className="pb-5 self-center text-xs hover:text-neutral-50">Visit Ottawa Rec Sports</Link>
        </div>

      <NavbarSetup/>

      <div className="mt-auto px-5">
        <LogoutBtn/>
      </div>
    
    </div>
  )
}

export default NavbarMenu

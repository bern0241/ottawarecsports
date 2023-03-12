import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import LogoutBtn from '../common/LogoutBtn';
import NavbarSetup from './Links';

const NavbarMenu = () => {
  return (
    <div class="block bg-[#023059] h-screen py-3 w-64 flex flex-col justify-between text-neutral-200">
      <div class="flex flex-col self-center">
        <Image
                      src="/Logo.svg"
                      alt="ORS Logo"
                      width={80}
                      height={80}
                      priority
                      class="py-3 self-center"
                    />
        <Link href="./" class="pb-5 self-center text-xs">Visit Ottawa Rec Sports</Link>
        </div>

      <NavbarSetup/>

      <div class="mt-auto px-5">
        <LogoutBtn/>
      </div>
    
    </div>
  )
}

export default NavbarMenu
